import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm /> tests', () => {

  test('that the form calls the event handler it received as props with the right details when a new blog is created', async () => {
    const createBlog = jest.fn()
    // sets up a session using setup() to mimic the UI of rendered component in browser to mock user interactions while testing
    let user = userEvent.setup()

    const { container } = render(<BlogForm createBlog={createBlog} />)

    const inputTitle = container.querySelector('#title')
    const inputAuthor = container.querySelector('#author')
    const inputUrl = container.querySelector('#url')
    const createButton = screen.getByText('create')

    await user.type(inputTitle, 'testing form title...')
    await user.type(inputAuthor, 'testing form Author...')
    await user.type(inputUrl, 'testing form url...')
    // createButton causes the following input to be sent [{"author": "testing form Author...", "title": "testing form title...", "url": "testing form url..."}]
    await user.click(createButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    // createBlog.mock.calls array has the following [{"author": "testing form Author...", "title": "testing form title...", "url": "testing form url..."}]
    expect(createBlog.mock.calls[0][0].title).toBe('testing form title...')
    expect(createBlog.mock.calls[0][0].author).toBe('testing form Author...')
    expect(createBlog.mock.calls[0][0].url).toBe('testing form url...')
  })
})
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('<Blog/> component tests', () => {
  let component

  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Hemanth',
    url: 'https://github.com/d-hemanth',
    likes: 0,
    user: [{
      username: 'Hemanth',
      name: 'Hemanth D',
    }],
  }

  const user = {
    username: 'Hemanth',
    name: 'Hemanth D',
  }

  beforeEach(() => {
    component = render(<Blog blog={blog} user={user} />)
  })

  test('blog renders the blog\'s title and author, but does not render its url or number of likes by default', () => {
    const ComponentRendered = component.container.querySelector('.blog')
    screen.debug(ComponentRendered)

    expect(ComponentRendered).toHaveTextContent('Component testing is done with react-testing-library')
    expect(ComponentRendered).toHaveTextContent('Hemanth')

    // tests whether url & likes are not displayed
    const fullComponentRendered = component.container.querySelector('.showFullBlog')
    expect(fullComponentRendered).toHaveStyle('display: none')
  })

  })


// Mocha recommends that arrow functions are not used, because they might cause some issues in certain situations
// so don't use function like -- describe('Note app', () => {})
describe('Blog app', function() {
  // beforeEach block empties the server's database(mongodb) before tests are run
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    // Currently it is not possible to add new users through the frontend's UI after resetting it, so we add a new user to the backend from the beforeEach block
    const user1 = {
      name: 'Hemanth D',
      username: 'Hemanth',
      password: 'toughPassword'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user1)

    const user2 = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user2)

    cy.visit('http://localhost:3000')
  })

  // The test cases have been defined with the it method. Cypress borrowed these parts from the Mocha testing library it uses under the hood
  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('Hemanth')
      cy.get('#password').type('toughPassword')
      cy.get('#login-button').click()

      cy.contains('Hemanth D logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('Hemanth')
      cy.get('#password').type('wrongPassword')
      cy.get('#login-button').click()

      // Because all tests are for the same component we accessed using cy.get, we can chain them using 'and'
      // should allows for more diverse tests than contains which works based on text content only
      cy.get('#notificationMessage')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      // We used cy.get('html') to access the whole visible content of the application
      cy.get('html').should('not.contain', 'Hemanth D logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      // Using Custom command cy.login for logging In from the backend which is declared in cypress/support/commands.js
      cy.login({ username: 'Hemanth', password: 'toughPassword' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('A blog created by cypress')
      cy.get('#author').type('Hemanth D')
      cy.get('#url').type('https://github.com/d-hemanth')
      cy.contains('create').click()

      cy.contains('A blog created by cypress - Hemanth D')
    })

    it('Check that users can like a blog', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('A blog created by cypress')
      cy.get('#author').type('Hemanth D')
      cy.get('#url').type('https://github.com/d-hemanth')
      cy.contains('create').click()

      cy.contains('A blog created by cypress - Hemanth D')
      cy.contains('view').click()
      cy.contains(0)
      cy.get('#likes-button').click()
      cy.contains(1)
    })

    describe('and several blogs exist', function() {
      beforeEach(function() {
        // Using Custom command cy.login for logging In from the backend which is declared in cypress/support/commands.js
        cy.login({ username: 'Hemanth', password: 'toughPassword' })
        // Using Custom command cy.createBlog for creating a new blog from the backend which is declared in cypress/support/commands.js
        cy.createBlog({
          title: 'A blog created by cypress',
          author: 'Hemanth D',
          url: 'https://github.com/d-hemanth'
        })

        cy.createBlog({
          title: 'First class tests',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html'
        })
      })

      it('the user who created a blog can delete it', function() {
        cy.contains('A blog created by cypress').contains('view').click()
        cy.contains('remove').get('#remove-button').click()

        //  use cy.on to invoke a JS Confirm popup, validate the text content, click OK, and validate that the confirm popup has been successfully closed
        cy.on('window:confirm', (str) => {
          expect(str).to.equal('Remove blog A blog created by cypress by Hemanth D')
        })
        cy.on('window:confirm', () => true)

        cy.get('html').should('not.contain', 'A blog created by cypress')
      })

      it('the user who didn\'t create the blog cannot delete it', function() {
        // logout from the user account who created the blogs
        cy.contains('logout').click()

        // login with another user account who didn't create the blog
        cy.login({ username: 'mluukkai', password: 'salainen' })

        cy.contains('First class tests').contains('view').click()
        cy.get('#remove-button').should('not.be.visible')
      })

      it('check that the blogs are ordered according to likes with blog with the most likes being first', function() {
        // First increase the likes of the two blogs already in db by giving aliases to each blog created so we can use it to refer to their likes count button
        // and add a wait of 0.5 sec otherwise the click is too fast to be recognised as double click & it'll only show one click
        cy.contains('A blog created by cypress').as('blog1')
        cy.get('@blog1').contains('view').click()
        cy.get('@blog1').contains('like').as('like1').click().wait(500).click()

        cy.contains('First class tests').as('blog2')
        cy.get('@blog2').contains('view').click()
        cy.get('@blog2').contains('like').as('like2').click().wait(500).click().wait(500).click().wait(500)

        // wrap - it yields the object passed into .wrap(). If the object is a promise, yield its resolved value.
        cy.get('.blog').then(blogs => {
          cy.wrap(blogs[0]).should('contain', 'First class tests')
          cy.wrap(blogs[1]).should('contain', 'A blog created by cypress')
        })
      })
    })
  })
})
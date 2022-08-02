// Mocha recommends that arrow functions are not used, because they might cause some issues in certain situations
// so don't use function like -- describe('Note app', () => {})
describe('Blog app', function() {
  // beforeEach block empties the server's database(mongodb) before tests are run
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    // Currently it is not possible to add new users through the frontend's UI after resetting it, so we add a new user to the backend from the beforeEach block
    const user = {
      name: 'Hemanth D',
      username: 'Hemanth',
      password: 'toughPassword'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
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
  })
})
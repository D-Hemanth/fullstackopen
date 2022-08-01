// Mocha recommends that arrow functions are not used, because they might cause some issues in certain situations
// so don't use function like -- describe('Note app', () => {})
describe('Blog app', function() {
  // beforeEach block empties the server's database(mongodb) before tests are run
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  // The test cases have been defined with the it method. Cypress borrowed these parts from the Mocha testing library it uses under the hood
  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })
})
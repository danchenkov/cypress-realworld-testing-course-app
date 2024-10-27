describe('Newsletter subscribe form', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('allows users to subscribe to the email list', () => {
    cy.getByData('email-input').type('ad@freedommag.org')
    cy.getByData('submit-button').click()
    cy.getByData('success-message').should("exist").contains('ad@freedommag.org')
  })

  it('does NOT allow an invalid email address', () => {
    cy.getByData('email-input').type('ad#freedommag.org')
    cy.getByData('submit-button').click()
    cy.getByData('success-message').should("not.exist")
  })

  it('does NOT allows users to subscribe to the email list twice', () => {
    cy.getByData('email-input').type('john@example.com')
    cy.getByData('submit-button').click()
    cy.getByData('server-error-message')
      .should("exist")
      .contains('Error:')
      .contains('john@example.com')
      .contains('already exists. Please use a different email address.')
  })

})
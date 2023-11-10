Cypress.Commands.add('initState', () => {
    cy.clearCookies()
        cy.clearAllLocalStorage()
        cy.clearAllSessionStorage()
        cy.visit('/')
})

Cypress.Commands.add('checkout', () => {
    cy.wait(2000)
    cy.get('[data-role="proceed-to-checkout"]').should('include.text', 'Proceed to Checkout').click()
    cy.url().should('include', '/checkout/#shipping')
})

export function verifyAddedProduct(quantity, size, color) {
    cy.get('[role="alert"]').should('be.visible').and('contains.text', 'You added Radiant Tee to your shopping cart.')
    cy.get('[class="counter qty"]').should('be.visible').and('include.text', quantity)

    cy.get('[class="action showcart"]').click()
    cy.get('.item-qty').should('have.value', quantity)
    cy.get('.toggle').click()
    cy.get('[class="product options active"]')
        .should('be.visible')
        .find('.content')
        .should('include.text', color)
        .and('include.text', size)
    cy.get('#top-cart-btn-checkout').click()
}
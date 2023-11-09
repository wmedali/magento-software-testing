export function verifyHomeElements() {
    cy.get('.logo').should('be.visible').click()
    cy.url().should('be.eq', Cypress.config('baseUrl'))

    cy.get('#ui-id-4')
        .trigger('mouseover') // @todo verify menu elements
    // Verify the footer

    cy.get('.page-footer')
        .should('contain.text', 'Write for us')
        .and('contain.text', 'Subscribe to our mailing list')
        .and('contain.text', 'Contact us')
        .and('contain.text', 'Hire a Sofware Testing/QA Company')
        .and('contain.text', 'Search Terms')
        .and('contain.text', 'Privacy and Cookie Policy')
        .and('contain.text', 'Advanced Search')
}


export function addSingleToCart(quantity, size, color) {
    cy.get('.product-item')
            .first()
            .find('.product-image-wrapper')
            .click()

        cy.url().should('include', '/radiant-tee.html')
        cy.get('#option-label-size-143-item-168').click()
        cy.get('[class="swatch-attribute size"]').find('.swatch-attribute-selected-option').should('be.visible').and('have.text', size)
        cy.get('#option-label-color-93-item-50').click()
        cy.get('[class="swatch-attribute color"]').find('.swatch-attribute-selected-option').should('be.visible').and('have.text', color)
        cy.get('#qty').clear().type(quantity)
        cy.get('#product-addtocart-button').click()
}
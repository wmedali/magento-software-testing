import { homePage } from "../locators/home"
import { producPage } from "./product"

export function verifyHomeElements() {
    cy.get('.logo').should('be.visible').click()
    cy.url().should('be.eq', Cypress.config('baseUrl'))

    cy.get('#ui-id-4')
        .trigger('mouseover') // @todo verify menu elements
    // Verify the footer

    cy.get(homePage.footer)
        .should('contain.text', 'Write for us')
        .and('contain.text', 'Subscribe to our mailing list')
        .and('contain.text', 'Contact us')
        .and('contain.text', 'Hire a Sofware Testing/QA Company')
        .and('contain.text', 'Search Terms')
        .and('contain.text', 'Privacy and Cookie Policy')
        .and('contain.text', 'Advanced Search')
}


export function addSingleToCart(quantity, size, color) {
    cy.get(homePage.productItem)
            .first()
            .find(homePage.productImage)
            .click()

        cy.url().should('include', '/radiant-tee.html')
        cy.pause()
        cy.get(producPage.sizeMOption).click()
        cy.get(producPage.sizeSection).find('.swatch-attribute-selected-option').should('be.visible').and('have.text', size)
        cy.get('#option-label-color-93-item-50').click()
        cy.get(producPage.colorSection).find('.swatch-attribute-selected-option').should('be.visible').and('have.text', color)
        cy.get(producPage.productQuantityField).clear().type(quantity)
        cy.get(producPage.addToCartButton).click()
}
import { producPage } from "../locators/product"

export function addProductCart(product) {
    // Choisir la taille du produit
    cy.get(`[option-label="${product.size}"]`).click()
    cy.get(producPage.sizeSection)
        .find('.swatch-attribute-selected-option')
        .should('be.visible')
        .and('have.text', product.size)

    // Choisir la couleur de produit
    cy.get(`[option-label="${product.color}"]`).click()
    cy.get(producPage.colorSection)
        .find('.swatch-attribute-selected-option')
        .should('be.visible')
        .and('have.text', product.color)

    // Choisir la quantité du produit
    cy.get(producPage.productQuantityField)
        .clear()
        .type(product.quantity)
    // Ajouter au panier
    cy.get(producPage.addToCartButton).click()
}
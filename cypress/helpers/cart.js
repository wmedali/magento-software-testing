import {cartPage} from '../locators/cart'
import { shippingPage } from '../locators/shipping'
export function checkProductAdded(product) {
    cy.get('[role="alert"]').should('be.visible').and('contains.text', `You added ${product.name} to your shopping cart.`)
    cy.get('[class="counter-number"]').should('be.visible').and('include.text', product.quantity)
}

export function checkProductInCart(product) {
    // Verifier les détails de produit dans le panier
    cy.get('[id="shopping-cart-table"]').within(() => {
        cy.get(cartPage.productName)
            .should('contain.text', product.name)
        cy.get(cartPage.productOptions)
            .should('contain.text', product.color)
                .and('contain.text', product.size)
        cy.get(cartPage.productQuantity).should('contain.value', product.quantity)
        cy.get(cartPage.productUnitPrice)
            .should('contain.text', product.price)
        cy.get(cartPage.productTotalPrice).should('include.text', product.price * product.quantity)
    })  
}

export function checkTotalPrice(products) {
    let total = 0;
    products.forEach(product => {
        total += product * quantity
    })
    cy.get('#id="cart-totals"').within(() => {
        cy.get(cartPage.cartSubtotal).should('include.text', total)
    })

}
export function fillShippingForm(user) {
    cy.get(shippingPage.firstName).should('have.value', user.firstName)
    cy.get(shippingPage.lastName).should('have.value', user.lastName)
    cy.get(shippingPage.company).type(user.company)

    cy.get(shippingPage.country).select(user.country)
    cy.get(shippingPage.address).type(user.address)
    cy.get(shippingPage.city).type(user.city)
    cy.get(shippingPage.postalCode).type(user.postalCode)
    cy.get(shippingPage.phoneNumber).type(user.phoneNumber)
    cy.get(shippingPage.shippingMethod).click()
}

export function goToNextStep() {
    cy.get('#checkout-step-shipping_method')
            .find('.continue')
            .should('be.visible')
            .and('contain.text', 'Next')
            .click()
}

export function placeOrder() {
    cy.contains('Place Order').click()
    cy.url().should('include', '/checkout/onepage/success')
    cy.contains('Thank you for your purchase!').should('be.visible')
}


export function checkCartModal(product) {
    // Vérifier la petite modale de panier
    cy.get('[class="counter-number"]').click()
    cy.get('[class="toggle"]').click()
    cy.get('[class="product options active"]')
        .should('be.visible')
        .find('.content')
        .should('include.text', product.color)
        .and('include.text', product.size)
    cy.get('#top-cart-btn-checkout').click()
}


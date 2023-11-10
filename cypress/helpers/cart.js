
export function checkProductAdded(product) {
    cy.get('[role="alert"]').should('be.visible').and('contains.text', `You added ${product.name} to your shopping cart.`)
    cy.get('[class="counter-number"]').should('be.visible').and('include.text', product.quantity)
}

export function checkProductInCart(product) {
    // Verifier les détails de produit dans le panier
    cy.get('[id="shopping-cart-table"]').within(() => {
        cy.get('[class="product-item-name"]')
            .should('contain.text', product.name)
        cy.get('[class="item-options"]')
            .should('contain.text', product.color)
                .and('contain.text', product.size)
        cy.get('[title="Qty"]').should('contain.value', product.quantity)
        cy.get('[data-th="Price"]').should('contain.text', product.price)
        cy.get('[data-th="Subtotal"]').should('include.text', product.price * product.quantity)

    })
        
}

export function fillChippingForm(user) {
   //  cy.get('#customer-email').type(user.email)
    cy.get('[name="firstname"]').should('have.value', user.firstName)
    cy.get('[name="lastname"]').should('have.value', user.lastName)
    cy.get('[name="company"]').type(user.company)

    cy.get('[name="country_id"]').select(user.country)
    cy.get('[name="street[0]"]').type(user.address)
    cy.get('[name="city"]').type(user.city)
    cy.get('[name="postcode"]').type(user.postalCode)
    cy.get('[name="telephone"]').type(user.phoneNumber)
    cy.get('[name="ko_unique_2"]').click()
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


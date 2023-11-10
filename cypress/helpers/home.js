import { homePage } from "../locators/home"

export function checkFooter() {
    cy.get(homePage.footer)
        .should('contain.text', 'Write for us')
        .and('contain.text', 'Subscribe to our mailing list')
        .and('contain.text', 'Contact us')
        .and('contain.text', 'Hire a Sofware Testing/QA Company')
        .and('contain.text', 'Search Terms')
        .and('contain.text', 'Privacy and Cookie Policy')
        .and('contain.text', 'Advanced Search')
}

export function goToProduct(product) {
    cy.get(homePage.productItem)
        .contains(product.name)
        .click()
    cy.url().should('include', product.url)
}



export function checkProductsPresence(products) {
    products.forEach((product, index) => {
        cy.get(homePage.productItem)
            .eq(index).should('include.text', product.name)
    })
}
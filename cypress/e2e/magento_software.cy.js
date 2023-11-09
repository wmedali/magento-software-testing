const faker = require('@faker-js/faker')

const randomEmail = `user_${faker.faker.internet.email()}`
const firstName = faker.faker.person.firstName()
const lastName = faker.faker.person.lastName()

describe('should purchase a product in magento software', () => {
    before(() => {
        cy.clearCookies()
        cy.clearAllLocalStorage()
        cy.clearAllSessionStorage()
        cy.visit('/')
    })
    it('should create an account successfully', () => {
        cy.contains('Create an Account').click()
        cy.url().should('contain', 'customer/account/create/')
        cy.get('#firstname').type(firstName)
        cy.get('#lastname').type(lastName)
        cy.get('#email_address').type(`${firstName}.${lastName}@yopmail.com`)
        // Weak Password
        cy.get('#password').type('Azer')
        cy.get('#password-strength-meter-container').should('have.class', 'password-weak').find('#password-strength-meter-label').should('have.text', 'Weak')
        // Medium password
        cy.get('#password').type('ty12')
        cy.get('#password-strength-meter-container').should('have.class', 'password-medium').find('#password-strength-meter-label').should('have.text', 'Medium')
        // Strong password
        cy.get('#password').type('3*')
        cy.get('#password-strength-meter-container').should('have.class', 'password-strong').find('#password-strength-meter-label').should('have.text', 'Strong')

        cy.get('#password-confirmation').type('Azerty123*')
        cy.get('#form-validate').contains('Create an Account').click()
        cy.contains(`Welcome, ${firstName} ${lastName}`).should('be.visible')
        cy.contains('Thank you for registering with Main Website Store.').should('be.visible')
    })

    it.only('should have products in home page', () => {
        //cy.get('.logo').should('be.visible').click()
        //cy.url().should('be.eq', Cypress.config('baseUrl'))

        cy.get('#ui-id-4')
            .trigger('mouseover') // @todo verify menu elements
        // Verify the footer

        cy.get('.page-footer')
            .should('contain.text', 'Write for us')
            .and('contain.text','Subscribe to our mailing list')
            .and('contain.text','Contact us')
            .and('contain.text','Hire a Sofware Testing/QA Company')
            .and('contain.text','Search Terms')
            .and('contain.text','Privacy and Cookie Policy')
            .and('contain.text','Advanced Search')

        cy.get('.product-item')
            .first()
            .find('.product-image-wrapper')
            .click()

        cy.url().should('include', '/radiant-tee.html')
        cy.get('#option-label-size-143-item-168').click()
        cy.get('[class="swatch-attribute size"]').find('.swatch-attribute-selected-option').should('be.visible').and('have.text', 'M')
        cy.get('#option-label-color-93-item-50').click()
        cy.get('[class="swatch-attribute color"]').find('.swatch-attribute-selected-option').should('be.visible').and('have.text', 'Blue')
        cy.get('#qty').clear().type('4')

        cy.get('#product-addtocart-button').click()
        cy.get('[role="alert"]').should('be.visible').and('contains.text','You added Radiant Tee to your shopping cart.')
        cy.get('[class="counter qty"]').should('be.visible').and('include.text', (4))

        cy.get('[class="action showcart"]').click()
        cy.get('.item-qty').should('have.value', '4')
        cy.get('.toggle').click()
        cy.get('[class="product options active"]')
            .should('be.visible')
            .find('.content')
            .should('include.text', 'Blue')
            .and('include.text', 'M')
        cy.get('#top-cart-btn-checkout').click()


    })
})
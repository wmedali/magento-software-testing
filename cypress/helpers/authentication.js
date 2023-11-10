
const faker = require('@faker-js/faker')

export function goToSignup() {
    cy.contains('Create an Account').click()
    cy.url().should('contain', 'customer/account/create/')
}

export function checkStrongMechanism() {
    // Weak Password
    cy.get('#password').type('Azer', { delay: 500 })
    cy.get('#password-strength-meter-container')
        .should('have.class', 'password-weak')
        .find('#password-strength-meter-label')
        .should('have.text', 'Weak')

    // Medium password
    cy.get('#password').clear().type('Azerty12')
    cy.get('#password-strength-meter-container')
        .should('have.class', 'password-medium')
        .find('#password-strength-meter-label')
        .should('have.text', 'Medium')

    // Strong password
    cy.get('#password').clear().type('Azerty123*')
    cy.get('#password-strength-meter-container')
        .should('have.class', 'password-strong')
        .find('#password-strength-meter-label')
        .should('have.text', 'Strong')
}

export function signup(user) {
    cy.get('#firstname').type(user.firstName)
    cy.get('#lastname').type(user.lastName)
    cy.get('#email_address').type(`${user.firstName}.${user.lastName}@yopmail.com`)
    cy.get('#password').focus().clear().type(user.password)
    cy.get('#password-confirmation').type(user.password)

    cy.get('#form-validate').contains('Create an Account').click()
}

export function verifyUserLoggedUp(firstName, lastName) {
    cy.contains(`Welcome, ${firstName} ${lastName}`).should('be.visible')
    cy.contains('Thank you for registering with Main Website Store.').should('be.visible')
}

export function logout() {
    cy.wait(2000)
    cy.get('[class="page-header"]').find('[data-action="customer-menu-toggle"]').click()
    cy.contains('My Account').should('be.visible')
    cy.contains('My Wish List').should('be.visible')
    cy.contains('Sign Out')
        .should('be.visible')
        .click()
    cy.contains('You are signed out').should('be.visible')
}
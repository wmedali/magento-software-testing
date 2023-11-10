import { signupForm } from '../locators/authentication'

const faker = require('@faker-js/faker')

export function goToSignup() {
    cy.contains('Create an Account').click()
    cy.url().should('contain', 'customer/account/create/')
}

export function checkStrongMechanism() {
    // Weak Password
    cy.get(signupForm.password).type('Azer', { delay: 500 })
    cy.get(signupForm.strengthContainer)
        .should('have.class', 'password-weak')
        .find('#password-strength-meter-label')
        .should('have.text', 'Weak')

    // Medium password
    cy.get('#password').clear().type('Azerty12')
    cy.get(signupForm.strengthContainer)
        .should('have.class', 'password-medium')
        .find(signupForm.strengthMeterLabel)
        .should('have.text', 'Medium')

    // Strong password
    cy.get('#password').clear().type('Azerty123*')
    cy.get(signupForm.strengthContainer)
        .should('have.class', 'password-strong')
        .find(signupForm.strengthMeterLabel)
        .should('have.text', 'Strong')
}

export function signup(user) {
    cy.get(signupForm.firstName).type(user.firstName)
    cy.get(signupForm.lastName).type(user.lastName)
    cy.get(signupForm.firstName).type(`${user.firstName}.${user.lastName}@yopmail.com`)
    cy.get(signupForm.password).focus().clear().type(user.password)
    cy.get(signupForm.passwordConfirmation).type(user.password)

    cy.get(signupForm.validation).contains('Create an Account').click()
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
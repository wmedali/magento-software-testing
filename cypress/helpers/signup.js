
export function signup(firstName, lastName) {
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
}
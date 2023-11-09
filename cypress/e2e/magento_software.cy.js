
const faker = require('@faker-js/faker')
const { signup } = require('../helpers/signup')
const { verifyHomeElements, addSingleToCart } = require('../helpers/home')
const { verifyAddedProduct } = require('../helpers/cart')

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
        signup(firstName, lastName)
    })

    it('should have products in home page', () => {
        verifyHomeElements()
        addSingleToCart('4', 'M', 'Blue')
        verifyAddedProduct('4', 'M', 'Blue')

    })
})
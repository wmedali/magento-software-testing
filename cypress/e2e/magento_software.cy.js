
const { goToSignup, signup, verifyUserLoggedUp, checkStrongMechanism, logout } = require('../helpers/authentication')
const { checkFooter, goToProduct, checkProductsPresence } = require('../helpers/home')
const { checkProductAdded, checkProductInCart, fillChippingForm, placeOrder, goToNextStep } = require('../helpers/cart')

const products = require('../fixtures/data.json')
const { newUser } = require('../fixtures/user')
const { addProductCart } = require('../helpers/product')
const user = newUser()

describe('should signup and purchase a product', () => {
    before(() => {
        // Nettoyer l'état de la session et visiter l'url de base
        cy.initState()
    })
    it('should create an account successfully', () => {
        // Aller dans la page de creation de compte
        goToSignup()

        // Vérifier le fonctionnement du mecanisme de force de mot de passe
        checkStrongMechanism()

        // Créer un compte
        signup(user)
        
        // Vérifier que l'utilisateur est connecté directement après création du compte
        verifyUserLoggedUp(user.firstName, user.lastName)
    })

    it('should check for home page elements', () => {
        cy.get('.logo').should('be.visible').click()
        cy.get('#ui-id-4')
            .trigger('mouseover') // @todo verify menu elements
        // Vérifier qu'une liste de produit est présente dans la page pricnipale
        checkProductsPresence(products)
        // Vérifier les éléments du pied de page
        checkFooter()
    })

    it('should purchase product', () => {
        // Sélectionner le produit à utiliser
        const product = products[0]

        // Aller dans la page produit
        goToProduct(product)

        // Ajouter le produit au panier
        addProductCart(product)

        //Vérifier que le produit a été ajouté au panuier
        checkProductAdded(product)

        // Aller à la page de panier directement
        cy.visit('/checkout/cart/')

        // Vérifier que le produit est dans le panier
        checkProductInCart(product)
        cy.checkout()

        // Remplir l'adresse de livraison
        fillChippingForm(user)
        goToNextStep()

        // Confirmer la commande
        // @todo verify shipping information and oder summary details
        placeOrder()

        // Se déconnecter
        logout()

    })

})
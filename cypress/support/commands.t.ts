declare namespace Cypress {
    interface Chainable {
      /**
       * Custom command to iniaite tests
       * @example cy.initState('greeting')
       */
      initState(): Chainable<Element>;
    }
  }
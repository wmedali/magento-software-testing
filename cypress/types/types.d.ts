declare namespace Cypress {
    interface Chainable<Subject> {
        /**
         * @description Custom command initializing tests state
         */
        initState(): Chainable<any>;

        /**
         * @description Custom command to proceed to checkout
         */
        checkout(): Chainable<any>;
    }
}
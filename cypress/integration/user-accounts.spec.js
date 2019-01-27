describe('User accounts test suite', function() {
    beforeEach(function () {
        cy.visit('/');
        cy.resetDatabase();
    });

    it('should allow the user to login', function () {
        // The user visits bots dashboard page
        cy.get('body').contains('Sign in or create an account to get started').should('be.visible');

        cy.seedTestUsers();

        let email = 'john@mailinator.com',
            password = 'password';

        cy.get('#login-sign-in-link').click();
        cy.get('#email').type(email, {force: true});
        cy.get('#password').type(password, {force: true});
        cy.get('.btn-primary').click();
        cy.get('.navbar').contains(email).should('be.visible');

        cy.get('.navbar').contains(email).click();
        cy.contains('Logout').click();
        cy.get('#login-sign-in-link').should('be.visible');
    });

    it('should allow the user to create an account', () => {
        let newUser = {
            email: 'lee@mailinator.com',
            password: 'password'
        };

        cy.get('#login-sign-in-link').click();
        cy.contains('Create an account').click();
        cy.get('#email').type(newUser.email);
        cy.get('#password').type(newUser.password);
        cy.get('#password-confirm').type(newUser.password);
        cy.get('.btn-primary').click()
        cy.get('.navbar').contains(newUser.email).should('be.visible');
    });
});

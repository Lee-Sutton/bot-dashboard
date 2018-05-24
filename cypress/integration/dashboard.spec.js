describe('Application dashboard test suite', function() {
    beforeEach(function () {
        cy.visit('/');
    });
    it('Should greet the user with a dashboard', function() {
        // The user visits bots dashboard page
        cy.get('body').contains('Sign in to view bots').should('be.visible');

        // They haven't signed in but they notice a link
        cy.login();

        cy.get('#bot-name').type('New Bot');
        cy.get('#bot-description').type('New Bot Description');
        cy.get('button').click();

        // After clicking submit they see that the new bot is in the bot list
        cy.get('[data-cy=bot-list]').contains('New Bot').should('be.visible');

        // The form is then cleared if the user wanted to enter new data
        cy.get('#bot-name').should('have.value', '');
        cy.get('#bot-description').should('have.value', '');

    });
});


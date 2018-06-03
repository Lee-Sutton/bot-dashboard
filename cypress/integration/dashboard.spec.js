describe('Application dashboard test suite', function() {
    beforeEach(function () {
        cy.visit('/');
    });
    it('Should greet the user with a dashboard', function() {
        // The user visits bots dashboard page
        cy.get('body').contains('Sign in to view bots').should('be.visible');

        // They haven't signed in but they notice a link
        cy.login();


        // They want to add a new bot
        cy.get('[data-cy=add-bot]').click();
        cy.get('[data-cy=add-bot-modal]').should('be.visible');

        // They fill in the modal with the bot information
        cy.get('#bot-name').type('New Bot');
        cy.get('#bot-description').type('New Bot Description');
        cy.get('button').click();

        // After clicking submit they see that the new bot is in the bot list
        cy.get('[data-cy=bot-list]').contains('New Bot').should('be.visible');

        // The form is then cleared if the user wanted to enter new data
        cy.get('#bot-name').should('have.value', '');
        cy.get('#bot-description').should('have.value', '');

    });

    it('Should display bots only for the user that created them', function() {
        cy.login('lee@mailinator.com', 'password');
        cy.get('#bot-name').type('Lee\'s Bot');
        cy.get('#bot-description').type('Lee\'s bot description');
        cy.get('button').click();
        cy.get('body').should('not.contain', 'New Bot');
    });

});


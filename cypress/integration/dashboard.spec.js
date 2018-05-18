describe('Application dashboard test suite', function() {
    beforeEach(function () {
        cy.visit('/');
    });
    it('Should greet the user with a dashboard', function() {
        cy.get('body').contains('Bots').should('be.visible');
        cy.get('#bot-name').type('New Bot');
        cy.get('#bot-description').type('New Bot Description');

    });
});


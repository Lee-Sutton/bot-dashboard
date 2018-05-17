describe('Application dashboard test suite', function() {
    beforeEach(function () {
        cy.visit('/');
    });
    it('Should greet the user with a dashboard', function() {
        cy.get('body').contains('Reddit Bots').should('be.visible');
    });

});


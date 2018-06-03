/**
 * Checks the add bot modal contains the correct information/structure
 *
 * @returns {cy.chain}
 */
const checkAddBotModal = () => {
    cy.get('[data-cy=add-bot-modal]').should('be.visible');
    return cy.get('.modal-title').contains('Add a bot').should('be.visible');
};

const fillAddBotModal = (name, description) => {
    // They fill in the modal with the bot information
    cy.get('#bot-name').type(name);
    cy.get('#bot-description').type(description);
    cy.get('[data-cy=add-bot-btn]').click();
};

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
        cy.contains('Add Bot').click();
        checkAddBotModal();
        fillAddBotModal('New Bot', 'New Bot Description');

        // After clicking submit they see that the new bot is in the bot list
        cy.get('[data-cy=bot-list]').contains('New Bot').should('be.visible');

    });

    it('Should display bots only for the user that created them', function() {
        cy.login('lee@mailinator.com', 'password');
        cy.get('body').should('not.contain', 'New Bot');
    });

});


/**
 * Checks the add bot modal contains the correct information/structure
 * @returns {cy.chain}
 */
const checkAddBotModal = () => {
    cy.get('[data-cy=add-bot-modal]').should('be.visible');
    return cy.get('.modal-title').contains('Add a bot').should('be.visible');
};

/**
 * Fills in the addBotModal with the input information
 */
const fillAddBotModal = (name, description) => {
    cy.get('#bot-name').type(name);
    cy.get('#bot-subreddit').type('hiphopheads');
    cy.get('#bot-keyword').type('FRESH');
    cy.get('#bot-score').type('100');
    cy.get('#bot-description').type(description);
    cy.get('[data-cy=add-bot-btn]').click();
};

describe('Application dashboard test suite', function() {
    beforeEach(function () {
        cy.resetDatabase();
        cy.visit('/');
        cy.seedTestUsers();
    });
    it('Should greet the user with a dashboard', function() {
        // The user visits bots dashboard page
        cy.get('body').contains('Sign in or create an account to get started').should('be.visible');

        // They haven't signed in but they notice a link
        cy.login();

        // They want to add a new bot
        cy.get('[data-cy=add-bot]').click({force: true});

        // The user is directed to an add bot url
        cy.url().should('contain', 'add');
        fillAddBotModal('New Bot', 'New Bot Description');

        // After clicking submit they see that the new bot is in the bot list
        cy.get('[data-cy=bot-list]').contains('New Bot').should('be.visible');
        cy.get('[data-cy=bot-list]').contains('hiphopheads').should('be.visible');
        cy.get('[data-cy=bot-list]').contains('100').should('be.visible');
        cy.get('[data-cy=bot-list]').contains('FRESH').should('be.visible');

        // The user clicks the listed bot
        cy.get('.table').contains('New Bot').click();

        // This opens a new page where the user can run the bot
        cy.url().should('contain', 'results');
        cy.contains('Date').should('be.visible');
        cy.contains('Title').should('be.visible');
        cy.contains('No data available').should('be.visible');

        // Mock out meteor method here and make sure it's called
        cy.window().then((win) => {
            cy.spy(win.Meteor, 'call');
        });

        cy.get('#run-bot').click();

        cy.window().then((win) => {
            expect(win.Meteor.call).to.have.been.calledWith('runBot');
        });
    });
});


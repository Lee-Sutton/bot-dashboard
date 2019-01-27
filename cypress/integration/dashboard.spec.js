/**
 * Fills in the addBotModal with the input information
 */
const fillAddBotModal = (name, description, subreddit='hiphopheads') => {
    cy.get('#name').clear().type(name);
    cy.get('.vs__selected-options > .form-control').clear().type(`${subreddit}{enter}`);
    cy.get('#keyword').clear().type('FRESH');
    cy.get('#minimumScore').clear().type('100');
    cy.get('#bot-description').clear().type(description);
    cy.get('[data-cy=add-bot-btn]').click();
};


describe('Application dashboard test suite', function() {
    beforeEach(function () {
        cy.visit('/');
        cy.resetDatabase();
        cy.seedTestUsers();
        cy.login();
    });

    it('Should allow the user to create bots', function() {
        // They want to add a new bot
        cy.get('[data-cy=add-bot]').click({force: true, timeout: 10000});

        // The user is directed to an add bot url
        cy.url().should('contain', 'add');

        // They make an error submitting the form and the relavent errors are displayed
        cy.get('[data-cy=add-bot-btn]').click();
        cy.contains('field is required');

        // They correct their errors and fill out the form
        fillAddBotModal('New Bot', 'New Bot Description');

        // After clicking submit they see that the new bot is in the bot list
        cy.get('[data-cy=bot-list]').contains('New Bot').should('be.visible');
        cy.get('[data-cy=bot-list]').contains('hiphopheads').should('be.visible');
        cy.get('[data-cy=bot-list]').contains('100').should('be.visible');
        cy.get('[data-cy=bot-list]').contains('FRESH').should('be.visible');

        // The user decides to edit the bot
        cy.contains('Edit').click();
        cy.get('[data-cy=add-bot]').should('be.visible');
        fillAddBotModal('New Bot', 'Edited description', 'editedsubreddit');

        // The user sees the updated results
        cy.get('.table').contains('editedsubreddit').should('be.visible');

        // The user clicks the listed bot
        cy.get('.table').contains('New Bot').click();

        // This opens a new page where the user can run the bot
        cy.url().should('contain', 'results');
        cy.contains('No data available').should('be.visible');

        // Mock out meteor method here and make sure it's called
        cy.window().then((win) => {
            cy.spy(win.Meteor, 'call');
        });

        cy.get('#run-bot').click();

        cy.window().then((win) => {
            expect(win.Meteor.call).to.have.been.calledWith('runBot');
        });

        // The user wants to setup email notifications for the bot
        cy.get('[data-cy=notifications]').click();
        cy.get('[type=checkbox]').click({force: true});
        cy.contains('Save').click();
    });

    it.only('should allow the user to delete bots', function () {
        const bot = {
            name: 'New Bot',
            description: 'Dummy Description'
        };

        // They want to add a new bot
        cy.get('[data-cy=add-bot]').click({force: true, timeout: 10000});

        // The user is directed to an add bot url
        cy.url().should('contain', 'add');
        fillAddBotModal(bot.name, bot.description);

        // The user sees their bot listed in the table
        cy.get('[data-cy=bot-list]').contains(bot.name).should('be.visible');

        // The user decides they want to delete the bot
        cy.get('[data-cy=delete-bot0]').click();

        // The bot is no longer listed and the welcome message is shown
        cy.get('[data-cy=welcome-message]').should('be.visible');
    });
});


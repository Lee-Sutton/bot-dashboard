// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (email = 'john@mailinator.com', password = 'password') => {
    cy.get('#login-sign-in-link').click();
    cy.get('#login-username-or-email').type(email, {force: true});
    cy.get('#login-password').type(password, {force: true});
    cy.get('#login-buttons-password').click({force: true});
});

Cypress.Commands.add('resetDatabase', () => {
    cy.exec('node ./node_modules/.bin/meteor-cypress drop')
});

Cypress.Commands.add('seedTestUsers', () => {
    cy.window().then((win) => {
        win.Meteor.call('seedTestUsers');
    })
});

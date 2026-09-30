// Database helpers run as Cypress tasks (see cypress.config.js) against the test database
Cypress.Commands.add('resetDb', () => {
    cy.task('db:reset');
});

Cypress.Commands.add('createUser', (user) => {
    return cy.task('db:createUser', user);
});

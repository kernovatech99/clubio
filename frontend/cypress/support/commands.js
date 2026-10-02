// Database helpers run as Cypress tasks (see cypress.config.js) against the test database
Cypress.Commands.add('resetDb', () => {
    cy.task('db:reset');
});

Cypress.Commands.add('createUser', (user) => {
    return cy.task('db:createUser', user);
});

Cypress.Commands.add('login', (user = {name: 'Max Mustermann', email: 'max@verein.de', password: 'geheim123'}) => {
    cy.createUser(user);
    cy.visit('/login');
    cy.get('#email').type(user.email);
    cy.get('#password').type(user.password);
    cy.contains('button', 'Anmelden').click();
    cy.location('pathname').should('eq', '/');
});

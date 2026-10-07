Cypress.Commands.add('resetDb', () => cy.task('db:reset'));
Cypress.Commands.add('createUser', (user) => cy.task('db:createUser', user));
Cypress.Commands.add('createBook', (book) => cy.task('db:createBook', book));

Cypress.Commands.add('login', (user = {name: 'Max Mustermann', email: 'max@verein.de', password: 'geheim123'}) => {
    cy.createUser(user);
    cy.visit('/login');
    cy.get('#email').type(user.email);
    cy.get('#password').type(user.password);
    cy.contains('button', 'Anmelden').click();
    cy.location('pathname').should('eq', '/');
});

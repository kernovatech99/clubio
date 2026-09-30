const user = {name: 'Max Mustermann', email: 'max@verein.de', password: 'geheim123'};

function fillLogin(email, password) {
    cy.get('#email').type(email);
    cy.get('#password').type(password);
    cy.contains('button', 'Anmelden').click();
}

describe('Authentication', () => {
    beforeEach(() => {
        cy.createUser(user);
    });

    it('redirects guests to the login page', () => {
        cy.visit('/');
        cy.location('pathname').should('eq', '/login');
    });

    it('logs in with valid credentials', () => {
        cy.visit('/login');
        fillLogin(user.email, user.password);

        cy.location('pathname').should('eq', '/');
        cy.contains(user.name).should('be.visible');
    });

    it('shows an error for a wrong password', () => {
        cy.visit('/login');
        fillLogin(user.email, 'falsches-passwort');

        cy.contains('E-Mail-Adresse oder Passwort ist falsch.').should('be.visible');
        cy.location('pathname').should('eq', '/login');
    });

    it('shows an error for an unknown user', () => {
        cy.visit('/login');
        fillLogin('niemand@verein.de', user.password);

        cy.contains('E-Mail-Adresse oder Passwort ist falsch.').should('be.visible');
    });

    it('logs out again', () => {
        cy.visit('/login');
        fillLogin(user.email, user.password);
        cy.contains(user.name).should('be.visible');

        cy.contains('button', 'Abmelden').click();
        cy.location('pathname').should('eq', '/login');
        cy.visit('/');
        cy.location('pathname').should('eq', '/login');
    });
});

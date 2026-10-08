function rows() {
    return cy.get('tbody tr');
}

function typeForm(name, color) {
    cy.get('#name').clear();
    if (name) cy.get('#name').type(name);
    if (color) {
        cy.get('#color').click();
        cy.get(`[data-cy="${color}"]`).click();
    } else {
        cy.get('#color').clear();
        cy.get('#color').blur();
    }
}

function sendForm(name, color) {
    typeForm(name, color);
    cy.contains('Speichern').click();
}

function assertEditingSucceeded() {
    cy.contains('Speichern').should('not.exist');
}

describe('Units', () => {
    beforeEach(() => {
        cy.login();
        cy.createUnit({name: 'Sommerlager', color: 'green-600'});
        cy.createUnit({name: 'Gruppenstunde', color: 'red-600'});
        cy.createUnit({name: 'Verwaltung', color: 'blue-600'});
        cy.visit('/unit');
    });

    it('sees the units page', () => {
        cy.contains('Kostenstellen').should('be.visible');
        cy.contains('Sommerlager').should('be.visible');
        cy.contains('Gruppenstunde').should('be.visible');
        cy.contains('Verwaltung').should('be.visible');
        cy.get('.bg-green-600').should('be.visible');
        cy.get('.bg-red-600').should('be.visible');
        cy.get('.bg-blue-600').should('be.visible');
    });

    it('adds a new unit', () => {
        cy.contains('Neu').click();
        cy.contains('Speichern').click();
        cy.contains('Name muss vorhanden sein').should('be.visible');
        cy.contains('Farbe muss vorhanden sein').should('be.visible');

        sendForm('Sommerlager', 'green-600');
        cy.contains('Name ist schon vorhanden').should('be.visible');
        cy.contains('Farbe ist schon vorhanden').should('be.visible');

        sendForm('Pfingstlager', 'green-800');

        cy.contains('Pfingstlager').should('be.visible');
        cy.get('.bg-green-800').should('be.visible');
        assertEditingSucceeded();
    });

    it('clears errors', () => {
        cy.contains('Neu').click();
        sendForm('', '');
        cy.get('[aria-label="Close"]').click();

        cy.contains('Neu').click();
        cy.contains('Name muss vorhanden sein').should('not.exist');
        cy.contains('Farbe muss vorhanden sein').should('not.exist');
    });

    it('edits a unit to new values', () => {
        cy.contains('Gruppenstunde').closest('tr').find('[title="Bearbeiten"]').click();
        sendForm('Winterlager', 'emerald-700');
        cy.contains('Winterlager').should('be.visible');
        cy.get('.bg-emerald-700').should('be.visible');
        cy.contains('Gruppenstunde').should('not.exist');
        cy.get('.bg-red-600').should('not.exist');
        assertEditingSucceeded();
    });

    it('cannot edit a unit to existing values', () => {
        cy.contains('Gruppenstunde').closest('tr').find('[title="Bearbeiten"]').click();
        sendForm('Sommerlager', 'green-600');
        cy.contains('Name ist schon vorhanden').should('be.visible');
        cy.contains('Farbe ist schon vorhanden').should('be.visible');
    });

    it('edits a unit when nothing changes', () => {
        cy.contains('Gruppenstunde').closest('tr').find('[title="Bearbeiten"]').click();
        cy.contains('Speichern').click();
        cy.contains('Gruppenstunde').should('be.visible');
        assertEditingSucceeded();
    });

    it('validates editing of a unit', () => {
        cy.contains('Gruppenstunde').closest('tr').find('[title="Bearbeiten"]').click();
        sendForm('', '');
        cy.contains('Name muss vorhanden sein').should('be.visible');
        cy.contains('Farbe muss vorhanden sein').should('be.visible');
    });

    it('removes a unit', () => {
        cy.contains('Gruppenstunde').closest('tr').find('[title="Löschen"]').click();
        cy.contains('button', 'Ja').click();
        cy.contains('Gruppenstunde').should('not.exist');
    });
});

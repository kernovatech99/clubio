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

describe('Categories', () => {
    beforeEach(() => {
        cy.login();
        cy.createCategory({name: 'Mitgliedsbeitrag', color: 'green-600'});
        cy.createCategory({name: 'Spenden', color: 'red-600'});
        cy.createCategory({name: 'Material', color: 'blue-600'});
        cy.visit('/category');
    });

    it('sees the categories page', () => {
        cy.contains('Konten').should('be.visible');
        cy.contains('Mitgliedsbeitrag').should('be.visible');
        cy.contains('Spenden').should('be.visible');
        cy.contains('Material').should('be.visible');
        cy.get('.bg-green-600').should('be.visible');
        cy.get('.bg-red-600').should('be.visible');
        cy.get('.bg-blue-600').should('be.visible');
    });

    it('adds a new category', () => {
        cy.contains('Neu').click();
        cy.contains('Speichern').click();
        cy.contains('Name muss vorhanden sein').should('be.visible');
        cy.contains('Farbe muss vorhanden sein').should('be.visible');

        sendForm('Mitgliedsbeitrag', 'green-600');
        cy.contains('Name ist schon vorhanden').should('be.visible');
        cy.contains('Farbe ist schon vorhanden').should('be.visible');

        sendForm('Zuschüsse', 'green-800');

        cy.contains('Zuschüsse').should('be.visible');
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

    it('edits a category to new values', () => {
        cy.contains('Spenden').closest('tr').find('[title="Bearbeiten"]').click();
        sendForm('Fahrtkosten', 'emerald-700');
        cy.contains('Fahrtkosten').should('be.visible');
        cy.get('.bg-emerald-700').should('be.visible');
        cy.contains('Spenden').should('not.exist');
        cy.get('.bg-red-600').should('not.exist');
        assertEditingSucceeded();
    });

    it('cannot edit a category to existing values', () => {
        cy.contains('Spenden').closest('tr').find('[title="Bearbeiten"]').click();
        sendForm('Mitgliedsbeitrag', 'green-600');
        cy.contains('Name ist schon vorhanden').should('be.visible');
        cy.contains('Farbe ist schon vorhanden').should('be.visible');
    });

    it('edits a category when nothing changes', () => {
        cy.contains('Spenden').closest('tr').find('[title="Bearbeiten"]').click();
        cy.contains('Speichern').click();
        cy.contains('Spenden').should('be.visible');
        assertEditingSucceeded();
    });

    it('validates editing of a category', () => {
        cy.contains('Spenden').closest('tr').find('[title="Bearbeiten"]').click();
        sendForm('', '');
        cy.contains('Name muss vorhanden sein').should('be.visible');
        cy.contains('Farbe muss vorhanden sein').should('be.visible');
    });

    it('removes a category', () => {
        cy.contains('Spenden').closest('tr').find('[title="Löschen"]').click();
        cy.contains('button', 'Ja').click();
        cy.contains('Spenden').should('not.exist');
    });
});

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

describe('Books', () => {
    beforeEach(() => {
        cy.login();
        cy.createBook({name: 'Girokonto', color: 'green-600'});
        cy.createBook({name: 'Aktionskonto', color: 'red-600'});
        cy.createBook({name: 'Pendlerkonto', color: 'blue-600'});
        cy.visit('/book');
    });

    it('sees the books page', () => {
        cy.contains('Kassen').should('be.visible');
        cy.contains('Girokonto').should('be.visible');
        cy.contains('Aktionskonto').should('be.visible');
        cy.contains('Pendlerkonto').should('be.visible');
        cy.get('.bg-green-600').should('be.visible');
        cy.get('.bg-red-600').should('be.visible');
        cy.get('.bg-blue-600').should('be.visible');
    });

    it('adds a new book', () => {
        cy.contains('Neu').click();
        cy.contains('Speichern').click();
        cy.contains('Name muss vorhanden sein').should('be.visible');
        cy.contains('Farbe muss vorhanden sein').should('be.visible');

        sendForm('Girokonto', 'green-600');
        cy.contains('Name ist schon vorhanden').should('be.visible');
        cy.contains('Farbe ist schon vorhanden').should('be.visible');

        sendForm('Pfadi-Kasse', 'green-800');

        cy.contains('Pfadi-Kasse').should('be.visible');
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

    it('edits a book to new values', () => {
        cy.contains('Aktionskonto').closest('tr').find('[title="Bearbeiten"]').click();
        sendForm('Rover-Kasse', 'emerald-700');
        cy.contains('Rover-Kasse').should('be.visible');
        cy.get('.bg-emerald-700').should('be.visible');
        cy.contains('Aktionskonto').should('not.exist');
        cy.get('.bg-red-600').should('not.exist');
        assertEditingSucceeded();
    });

    it('cannot edit a book to existing values', () => {
        cy.contains('Aktionskonto').closest('tr').find('[title="Bearbeiten"]').click();
        sendForm('Girokonto', 'green-600');
        cy.contains('Name ist schon vorhanden').should('be.visible');
        cy.contains('Farbe ist schon vorhanden').should('be.visible');
    });

    it('edits a book when nothing changes', () => {
        cy.contains('Aktionskonto').closest('tr').find('[title="Bearbeiten"]').click();
        cy.contains('Speichern').click();
        cy.contains('Aktionskonto').should('be.visible');
        assertEditingSucceeded();
    });

    it('validates editing of a book', () => {
        cy.contains('Aktionskonto').closest('tr').find('[title="Bearbeiten"]').click();
        sendForm('', '');
        cy.contains('Name muss vorhanden sein').should('be.visible');
        cy.contains('Farbe muss vorhanden sein').should('be.visible');
    });

    it('removes a book', () => {
        cy.contains('Aktionskonto').closest('tr').find('[title="Löschen"]').click();
        cy.contains('Aktionskonto').should('not.exist');
    });
});

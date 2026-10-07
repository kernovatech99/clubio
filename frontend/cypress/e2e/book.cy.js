function rows() {
    return cy.get('tbody tr');
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
        cy.get('#color').type('green-800');
        cy.get('#name').type('Pfadi-Kasse');
        cy.contains('Speichern').click();
        cy.contains('Pfadi-Kasse').should('be.visible');
        cy.get('.bg-green-800').should('be.visible');
    });

    it('edits a book', () => {
        cy.contains('Aktionskonto').closest('tr').find('[title="Bearbeiten"]').click();
        cy.get('#color').click();
        cy.get('[data-cy="emerald-700"]').click();
        cy.get('#name').clear().type('Rover-Kasse');
        cy.contains('Speichern').click();
        cy.contains('Rover-Kasse').should('be.visible');
        cy.get('.bg-emerald-700').should('be.visible');
        cy.contains('Aktionskonto').should('not.exist');
        cy.get('.bg-red-600').should('not.exist');
    });

    it('removes a book', () => {
        cy.contains('Aktionskonto').closest('tr').find('[title="Löschen"]').click();
        cy.contains('Aktionskonto').should('not.exist');
    });
});

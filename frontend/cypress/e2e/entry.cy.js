function openBook(name) {
    cy.contains('[role=tab]', name).click();
}

// Every book renders its own panel, only the one of the active tab is visible
function panel() {
    return cy.get('[role=tabpanel]:visible');
}

function rows() {
    return panel().find('tbody tr');
}

function filterEntries(text) {
    panel().find('input[type=search]').clear();
    panel().find('input[type=search]').type(text);
}

describe('Entries', () => {
    beforeEach(() => {
        cy.login();
        cy.createBook({name: 'Girokonto', color: 'green-600'});
        cy.createBook({name: 'Barkasse', color: 'red-600'});
        cy.createBook({name: 'Aktions-Kasse', color: 'blue-600'});
        cy.visit('/entry');
    });

    it('sees the booking page', () => {
        cy.contains('Buchungen').should('be.visible');
        cy.get('[role=tab]').should('have.length', 3);
        cy.contains('[role=tab]', 'Girokonto').should('have.attr', 'aria-selected', 'true');
    });

    it('loads the tabs from the available kassen', () => {
        cy.visit('/entry');

        cy.get('[role=tab]').should('have.length', 3);
        ['Aktions-Kasse', 'Barkasse', 'Girokonto'].forEach((name, index) => {
            cy.get('[role=tab]').eq(index).should('have.text', name);
        });
        cy.get('[role=tab]').first().should('have.attr', 'aria-selected', 'true');

        openBook('Pfadi-Kasse');
        rows().should('have.length', 1);
        rows().first().should('have.text', 'Keine Buchungen gefunden.');
    });

    it('can click the tabs and navigate through kassen', () => {
        openBook('Girokonto');
        cy.contains('Miete Vereinsheim Oktober').should('be.visible');
        cy.contains('Einkauf Lebensmittel').should('not.be.visible');
        cy.contains('Briefmarken').should('not.be.visible');

        openBook('Aktions-Kasse');
        cy.contains('Miete Vereinsheim Oktober').should('not.be.visible');
        cy.contains('Einkauf Lebensmittel').should('be.visible');
        cy.contains('Briefmarken').should('not.be.visible');

        openBook('Barkasse');
        cy.contains('Miete Vereinsheim Oktober').should('not.be.visible');
        cy.contains('Einkauf Lebensmittel').should('not.be.visible');
        cy.contains('Briefmarken').should('be.visible');
    });

    it('lists the entries of a kasse with the newest first', () => {
        panel().find('thead th').should('have.length', 6);
        ['Geprüft', 'Datum', 'Beschreibung', 'Kostenstelle', 'Konto', 'Betrag'].forEach((heading, index) => {
            panel().find('thead th').eq(index).should('have.text', heading);
        });

        rows()
            .first()
            .within(() => {
                cy.get('[aria-label="Nicht geprüft"]').should('be.visible');
                cy.contains('01.10.2026').should('be.visible');
                cy.contains('Miete Vereinsheim Oktober').should('be.visible');
                cy.contains('Vereinsheim').should('be.visible');
                cy.contains('td', /^Miete$/).should('be.visible');
                cy.contains(/^-450,00\s€$/)
                    .should('be.visible')
                    .and('have.class', 'text-red-400');
            });

        rows()
            .eq(1)
            .within(() => {
                cy.get('[aria-label="Nicht geprüft"]').should('be.visible');
                cy.contains('18.09.2026').should('be.visible');
                cy.contains('Spende Familie Becker').should('be.visible');
                cy.contains(/^100,00\s€$/)
                    .should('be.visible')
                    .and('have.class', 'text-green-400');
            });

        rows()
            .eq(2)
            .within(() => {
                cy.get('[aria-label="Geprüft"]').should('be.visible');
                cy.contains('01.09.2026').should('be.visible');
                cy.contains('Miete Vereinsheim September').should('be.visible');
            });
    });

    it('shows the balance of each kasse', () => {
        panel()
            .contains(/Kassenstand:\s2\.612,40\s€/)
            .should('be.visible');

        openBook('Barkasse');
        panel()
            .contains(/Kassenstand:\s65,72\s€/)
            .should('be.visible');

        openBook('Aktions-Kasse');
        panel()
            .contains(/Kassenstand:\s159,70\s€/)
            .should('be.visible');
    });

    it('paginates the entries', () => {
        rows().should('have.length', 10);
        cy.contains('Haftpflichtversicherung').should('not.exist');

        panel().contains('button', 'Weiter').click();
        rows().should('have.length', 1);
        cy.contains('Haftpflichtversicherung').should('be.visible');
        cy.contains('Miete Vereinsheim Oktober').should('not.exist');

        panel().contains('button', 'Zurück').click();
        rows().should('have.length', 10);
        cy.contains('Miete Vereinsheim Oktober').should('be.visible');

        // Fits on one page, so there is nothing to paginate
        openBook('Barkasse');
        rows().should('have.length', 9);
        panel().contains('button', 'Weiter').should('not.exist');
    });

    it('filters the entries', () => {
        filterEntries('sommerlager');
        rows().should('have.length', 4);
        ['Restzahlung Zeltplatz', 'Teilnehmerbeiträge Sommerlager', 'Zuschuss Stadtjugendring', 'Anzahlung Zeltplatz'].forEach((description, index) => {
            rows().eq(index).should('contain', description);
        });
        cy.contains('Miete Vereinsheim Oktober').should('not.exist');
        // The balance always covers the whole kasse
        panel()
            .contains(/Kassenstand:\s2\.612,40\s€/)
            .should('be.visible');

        filterEntries('14,70');
        rows().should('have.length', 1);
        rows().first().should('contain', 'Kontoführungsgebühren');

        filterEntries('16.02.2026');
        rows().should('have.length', 1);
        rows().first().should('contain', 'Mitgliedsbeiträge 2026');

        filterEntries('gibt es nicht');
        rows().should('have.length', 1);
        rows().first().should('have.text', 'Keine Buchungen gefunden.');

        panel().find('input[type=search]').clear();
        rows().should('have.length', 10);
    });

    it('returns to the first page when filtering', () => {
        panel().contains('button', 'Weiter').click();
        cy.contains('Haftpflichtversicherung').should('be.visible');

        filterEntries('miete');
        rows().should('have.length', 2);
        rows().eq(0).should('contain', 'Miete Vereinsheim Oktober');
        rows().eq(1).should('contain', 'Miete Vereinsheim September');
    });

    it('shows the entries of a kostenstelle across all kassen', () => {
        cy.contains('button', 'Kostenstellen-Übersicht').click();

        cy.get('[role=dialog]').within(() => {
            cy.contains('Kostenstellen-Übersicht').should('be.visible');
            cy.get('thead th').should('have.length', 5);
            cy.contains('th', 'Kostenstelle').should('not.exist');

            cy.get('#overview-unit').should('have.value', 'Allgemein');
            cy.contains(/^1\.861,11\s€$/)
                .should('be.visible')
                .and('have.class', 'text-green-400');
            cy.get('tbody tr').should('have.length', 9);
            cy.get('tbody tr').first().should('contain', 'Briefmarken');

            cy.get('#overview-unit').select('Sommerlager');
            cy.contains(/^1\.778,15\s€$/).should('be.visible');
            cy.get('tbody tr').should('have.length', 10);
            cy.get('tbody tr').first().should('contain', 'Restzahlung Zeltplatz');
            cy.contains('Eis für alle').should('be.visible');
            cy.get('tbody tr').last().should('contain', 'Anzahlung Zeltplatz');

            cy.get('#overview-unit').select('Stammesfest');
            cy.contains(/^271,55\s€$/).should('be.visible');
            cy.get('tbody tr').should('have.length', 4);

            cy.get('button[aria-label="Close"]').click();
        });

        cy.get('[role=dialog]').should('not.exist');
    });
});

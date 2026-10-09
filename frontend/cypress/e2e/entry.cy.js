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

function dialog() {
    return cy.get('[role=dialog]');
}

function typeForm({date, description, unit, category, amount, receiptNumber}) {
    cy.get('#date').clear();
    if (date) cy.get('#date').type(date);
    cy.get('#description').clear();
    if (description) cy.get('#description').type(description);
    cy.get('#unitId').select(unit ?? 'Keine Kostenstelle');
    cy.get('#categoryId').select(category ?? 'Bitte wählen');
    cy.get('#amount').clear();
    if (amount) cy.get('#amount').type(amount);
    cy.get('#receiptNumber').clear();
    if (receiptNumber) cy.get('#receiptNumber').type(receiptNumber);
}

function sendForm(values) {
    typeForm(values);
    cy.contains('Speichern').click();
}

function assertEditingSucceeded() {
    cy.contains('Speichern').should('not.exist');
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
        cy.fixture('entries').then((entries) => cy.seedEntries(entries));
        cy.visit('/entry');
        // Kassen sind alphabetisch sortiert, die meisten Tests arbeiten mit dem Girokonto
        openBook('Girokonto');
    });

    it('sees the booking page', () => {
        cy.contains('Buchungen').should('be.visible');
        cy.get('[role=tab]').should('have.length', 3);
        cy.contains('[role=tab]', 'Girokonto').should('have.attr', 'aria-selected', 'true');
    });

    it('loads the tabs from the available kassen', () => {
        cy.createBook({name: 'Pfadi-Kasse', color: 'yellow-600'});
        cy.visit('/entry');

        cy.get('[role=tab]').should('have.length', 4);
        ['Aktions-Kasse', 'Barkasse', 'Girokonto', 'Pfadi-Kasse'].forEach((name, index) => {
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
        panel().find('thead th').should('have.length', 7);
        ['Geprüft', 'Datum', 'Beschreibung', 'Kostenstelle', 'Konto', 'Betrag', 'Aktionen'].forEach((heading, index) => {
            panel().find('thead th').eq(index).should('have.text', heading);
        });

        rows()
            .first()
            .within(() => {
                cy.get('[aria-label="Als geprüft markieren"]').should('be.visible');
                cy.contains('01.10.2026').should('be.visible');
                cy.contains('Miete Vereinsheim Oktober').should('be.visible');
                cy.contains('td', /^Vereinsheim$/)
                    .should('be.visible')
                    .find('.bg-teal-600')
                    .should('be.visible');
                cy.contains('td', /^Miete$/).should('be.visible');
                cy.contains(/^-450,00\s€$/)
                    .should('be.visible')
                    .and('have.class', 'text-red-400');
            });

        rows()
            .eq(1)
            .within(() => {
                cy.get('[aria-label="Als geprüft markieren"]').should('be.visible');
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
            cy.contains('th', 'Aktionen').should('not.exist');

            cy.get('#overview-unit option:selected').should('have.text', 'Allgemein');
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

    it('adds a new entry', () => {
        openBook('Barkasse');
        panel().contains('button', 'Neu').click();
        dialog().contains('Neue Buchung').should('be.visible');

        sendForm({});
        cy.contains('Datum muss vorhanden sein').should('be.visible');
        cy.contains('Beschreibung muss vorhanden sein').should('be.visible');
        cy.contains('Konto muss vorhanden sein').should('be.visible');
        cy.contains('Betrag muss vorhanden sein').should('be.visible');

        sendForm({date: '2026-10-05', description: 'Laternen basteln', unit: 'Gruppenstunden', category: 'Material', amount: '-12,50', receiptNumber: 'Q-2026-017'});
        assertEditingSucceeded();

        rows().should('have.length', 10);
        rows()
            .first()
            .within(() => {
                cy.get('[aria-label="Als geprüft markieren"]').should('be.visible');
                cy.contains('05.10.2026').should('be.visible');
                cy.contains('Laternen basteln').should('be.visible');
                cy.contains('td', /^Gruppenstunden$/).should('be.visible');
                cy.contains('td', /^Material$/).should('be.visible');
                cy.contains(/^-12,50\s€$/)
                    .should('be.visible')
                    .and('have.class', 'text-red-400');
            });
        panel()
            .contains(/Kassenstand:\s53,22\s€/)
            .should('be.visible');

        // Die Buchung landet nur in der geöffneten Kasse und ist gespeichert
        cy.visit('/entry');
        cy.contains('Laternen basteln').should('not.be.visible');
        openBook('Barkasse');
        cy.contains('Laternen basteln').should('be.visible');
    });

    it('prefills the date of a new entry with today', () => {
        cy.clock(new Date(2026, 9, 8, 12), ['Date']);
        cy.visit('/entry');
        panel().contains('button', 'Neu').click();
        cy.get('#date').should('have.value', '2026-10-08');
    });

    it('adds an entry without kostenstelle and quittung', () => {
        panel().contains('button', 'Neu').click();
        sendForm({date: '2026-10-06', description: 'Erstattung Versicherung', category: 'Versicherungen', amount: '1.250,00'});
        assertEditingSucceeded();

        rows()
            .first()
            .within(() => {
                cy.contains('Erstattung Versicherung').should('be.visible');
                cy.get('td').eq(3).should('have.text', '');
                cy.contains(/^1\.250,00\s€$/)
                    .should('be.visible')
                    .and('have.class', 'text-green-400');
            });
    });

    it('clears errors and the form', () => {
        panel().contains('button', 'Neu').click();
        sendForm({description: 'Halbfertig'});
        cy.contains('Konto muss vorhanden sein').should('be.visible');
        cy.get('[aria-label="Close"]').click();

        panel().contains('button', 'Neu').click();
        cy.contains('Konto muss vorhanden sein').should('not.exist');
        cy.get('#description').should('have.value', '');
    });

    it('edits an entry', () => {
        cy.contains('Spende Familie Becker').closest('tr').find('[title="Bearbeiten"]').click();
        dialog().contains('Buchung bearbeiten').should('be.visible');
        cy.get('#date').should('have.value', '2026-09-18');
        cy.get('#description').should('have.value', 'Spende Familie Becker');
        cy.get('#unitId option:selected').should('have.text', 'Allgemein');
        cy.get('#categoryId option:selected').should('have.text', 'Spenden');
        cy.get('#amount').should('have.value', '100,00');
        cy.get('#receiptNumber').should('have.value', '');

        sendForm({date: '2026-09-19', description: 'Spende Familie Schmidt', unit: 'Sommerlager', category: 'Zuschüsse', amount: '150,00', receiptNumber: 'Q-42'});
        assertEditingSucceeded();

        cy.contains('Spende Familie Becker').should('not.exist');
        cy.contains('Spende Familie Schmidt')
            .closest('tr')
            .within(() => {
                cy.contains('19.09.2026').should('be.visible');
                cy.contains('td', /^Sommerlager$/).should('be.visible');
                cy.contains('td', /^Zuschüsse$/).should('be.visible');
                cy.contains(/^150,00\s€$/).should('be.visible');
            });
        panel()
            .contains(/Kassenstand:\s2\.662,40\s€/)
            .should('be.visible');

        cy.contains('Spende Familie Schmidt').closest('tr').find('[title="Bearbeiten"]').click();
        cy.get('#receiptNumber').should('have.value', 'Q-42');
    });

    it('edits an entry when nothing changes', () => {
        cy.contains('Spende Familie Becker').closest('tr').find('[title="Bearbeiten"]').click();
        cy.contains('Speichern').click();
        assertEditingSucceeded();
        cy.contains('Spende Familie Becker').should('be.visible');
        rows().eq(2).find('[aria-label="Geprüft"]').should('be.visible');
    });

    it('validates editing of an entry', () => {
        cy.contains('Spende Familie Becker').closest('tr').find('[title="Bearbeiten"]').click();
        sendForm({date: '2026-09-18', description: 'Spende Familie Becker', category: 'Spenden', amount: 'viel'});
        cy.contains('Betrag muss vorhanden sein').should('be.visible');

        sendForm({date: '2026-09-18', description: 'Spende Familie Becker', category: 'Spenden', amount: '0'});
        cy.contains('Betrag darf nicht 0 sein').should('be.visible');
    });

    it('marks an entry as reviewed', () => {
        cy.contains('Spende Familie Becker').closest('tr').find('[aria-label="Als geprüft markieren"]').click();

        cy.contains('Spende Familie Becker')
            .closest('tr')
            .within(() => {
                cy.get('[aria-label="Geprüft"]').should('be.visible').and('have.class', 'bg-green-500').find('svg').should('be.visible');
                cy.get('[aria-label="Als geprüft markieren"]').should('not.exist');
                cy.get('button[aria-label="Geprüft"]').should('not.exist');
                cy.get('[title="Bearbeiten"]').should('not.exist');
                cy.get('[title="Löschen"]').should('not.exist');
            });
        // Die anderen Buchungen bleiben unberührt
        rows().first().find('[aria-label="Als geprüft markieren"]').should('be.visible');

        cy.visit('/entry');
        openBook('Girokonto');
        cy.contains('Spende Familie Becker').closest('tr').find('[aria-label="Geprüft"]').should('be.visible');
    });

    it('cannot change the reviewed state in the kostenstellen overview', () => {
        cy.contains('button', 'Kostenstellen-Übersicht').click();

        dialog().within(() => {
            cy.get('[aria-label="Nicht geprüft"]').should('exist');
            cy.get('[aria-label="Als geprüft markieren"]').should('not.exist');
        });
    });

    it('removes an entry', () => {
        cy.contains('Spende Familie Becker').closest('tr').find('[title="Löschen"]').click();
        cy.contains('button', 'Ja').click();
        cy.contains('Spende Familie Becker').should('not.exist');
        panel()
            .contains(/Kassenstand:\s2\.512,40\s€/)
            .should('be.visible');
    });
});

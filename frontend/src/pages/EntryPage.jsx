import {Badge, Button, Label, Modal, ModalBody, ModalHeader, Pagination, Select, TabItem, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Tabs, TextInput} from 'flowbite-react';
import {useEffect, useState} from 'react';
import {MdAdd, MdCheck, MdSearch} from 'react-icons/md';
import {apiFetch} from '../lib/api.js';

// Dummy-Daten, bis das Backend Buchungen liefert. Beträge in Cent.
// Die Kassen selbst kommen aus dem Backend, die Buchungen werden über den Namen der Kasse zugeordnet.
const dummyBooks = [
    {
        id: 'giro',
        name: 'Girokonto',
        entries: [
            {id: 1, date: '2026-02-16', checked: true, description: 'Mitgliedsbeiträge 2026', unit: 'Allgemein', category: 'Mitgliedsbeiträge', amount: 184000},
            {id: 2, date: '2026-10-01', checked: false, description: 'Miete Vereinsheim Oktober', unit: 'Vereinsheim', category: 'Miete', amount: -45000},
            {id: 3, date: '2026-01-05', checked: true, description: 'Haftpflichtversicherung', unit: 'Allgemein', category: 'Versicherungen', amount: -21890},
            {id: 4, date: '2026-06-12', checked: true, description: 'Zuschuss Stadtjugendring', unit: 'Sommerlager', category: 'Zuschüsse', amount: 60000},
            {id: 5, date: '2026-04-20', checked: true, description: 'Anzahlung Zeltplatz', unit: 'Sommerlager', category: 'Unterkunft', amount: -35000},
            {id: 6, date: '2026-09-18', checked: false, description: 'Spende Familie Becker', unit: 'Allgemein', category: 'Spenden', amount: 10000},
            {id: 16, date: '2026-09-01', checked: true, description: 'Miete Vereinsheim September', unit: 'Vereinsheim', category: 'Miete', amount: -45000},
            {id: 17, date: '2026-08-14', checked: true, description: 'Restzahlung Zeltplatz', unit: 'Sommerlager', category: 'Unterkunft', amount: -52000},
            {id: 18, date: '2026-07-06', checked: true, description: 'Teilnehmerbeiträge Sommerlager', unit: 'Sommerlager', category: 'Teilnehmerbeiträge', amount: 216000},
            {id: 19, date: '2026-03-09', checked: true, description: 'Stromabschlag Vereinsheim', unit: 'Vereinsheim', category: 'Nebenkosten', amount: -8400},
            {id: 20, date: '2026-05-22', checked: true, description: 'Kontoführungsgebühren', unit: 'Allgemein', category: 'Bankgebühren', amount: -1470},
        ],
    },
    {
        id: 'cash',
        name: 'Barkasse',
        entries: [
            {id: 7, date: '2026-09-23', checked: false, description: 'Bastelmaterial Gruppenstunde', unit: 'Gruppenstunden', category: 'Material', amount: -2349},
            {id: 8, date: '2026-09-10', checked: false, description: 'Getränke Elternabend', unit: 'Allgemein', category: 'Verpflegung', amount: -1880},
            {id: 9, date: '2026-09-01', checked: true, description: 'Einzahlung vom Girokonto', unit: 'Allgemein', category: 'Umbuchung', amount: 15000},
            {id: 10, date: '2026-09-29', checked: false, description: 'Briefmarken', unit: 'Allgemein', category: 'Bürobedarf', amount: -850},
            {id: 21, date: '2026-09-30', checked: false, description: 'Kekse und Saft Gruppenstunde', unit: 'Gruppenstunden', category: 'Verpflegung', amount: -1265},
            {id: 22, date: '2026-09-16', checked: false, description: 'Schnitzmesser', unit: 'Gruppenstunden', category: 'Material', amount: -3490},
            {id: 23, date: '2026-08-28', checked: true, description: 'Putzmittel', unit: 'Vereinsheim', category: 'Instandhaltung', amount: -1795},
            {id: 24, date: '2026-08-21', checked: true, description: 'Spende Elternabend', unit: 'Allgemein', category: 'Spenden', amount: 4500},
            {id: 25, date: '2026-06-03', checked: true, description: 'Druckerpapier', unit: 'Allgemein', category: 'Bürobedarf', amount: -1299},
        ],
    },
    {
        id: 'event',
        name: 'Aktions-Kasse',
        entries: [
            {id: 11, date: '2026-07-25', checked: true, description: 'Teilnehmerbeiträge bar', unit: 'Sommerlager', category: 'Teilnehmerbeiträge', amount: 42000},
            {id: 12, date: '2026-07-27', checked: true, description: 'Einkauf Lebensmittel', unit: 'Sommerlager', category: 'Verpflegung', amount: -31275},
            {id: 13, date: '2026-07-27', checked: true, description: 'Gaskartuschen', unit: 'Sommerlager', category: 'Material', amount: -3960},
            {id: 14, date: '2026-09-12', checked: false, description: 'Kuchenverkauf Stammesfest', unit: 'Stammesfest', category: 'Verkaufserlöse', amount: 18650},
            {id: 15, date: '2026-07-30', checked: true, description: 'Eintritt Freibad', unit: 'Sommerlager', category: 'Ausflüge', amount: -9600},
            {id: 26, date: '2026-09-12', checked: false, description: 'Getränkeverkauf Stammesfest', unit: 'Stammesfest', category: 'Verkaufserlöse', amount: 27400},
            {id: 27, date: '2026-09-11', checked: false, description: 'Einkauf Getränke', unit: 'Stammesfest', category: 'Verpflegung', amount: -14280},
            {id: 28, date: '2026-09-10', checked: false, description: 'Dekoration und Lichterketten', unit: 'Stammesfest', category: 'Material', amount: -4615},
            {id: 29, date: '2026-08-02', checked: true, description: 'Eis für alle', unit: 'Sommerlager', category: 'Verpflegung', amount: -5850},
            {id: 30, date: '2026-07-31', checked: true, description: 'Brennholz', unit: 'Sommerlager', category: 'Material', amount: -2500},
        ],
    },
];

// Ohne Rot/Grün, die sind für die Beträge reserviert.
const unitColors = ['blue', 'purple', 'yellow', 'pink', 'teal', 'indigo', 'lime', 'cyan'];

// Jede Kostenstelle bekommt über alle Kassen hinweg dieselbe Farbe.
const units = [...new Set(dummyBooks.flatMap((book) => book.entries.map((entry) => entry.unit)))];
const unitColor = Object.fromEntries(units.map((unit, index) => [unit, unitColors[index % unitColors.length]]));

const currency = new Intl.NumberFormat('de-DE', {style: 'currency', currency: 'EUR'});

function formatAmount(amount) {
    return currency.format(amount / 100);
}

// Buchungsdaten sind reine Kalendertage (YYYY-MM-DD), daher ohne Zeitzonenverschiebung formatieren.
const dateFormat = new Intl.DateTimeFormat('de-DE', {dateStyle: 'medium', timeZone: 'UTC'});

function formatDate(date) {
    return dateFormat.format(new Date(date));
}

function matches(entry, filter) {
    const needle = filter.trim().toLowerCase();
    return [formatDate(entry.date), entry.description, entry.unit, entry.category, formatAmount(entry.amount)].some((value) => value.toLowerCase().includes(needle));
}

const pageSize = 10;

function amountColor(amount) {
    return amount < 0 ? 'text-red-400' : 'text-green-400';
}

function CheckedMark({checked}) {
    if (!checked) {
        return <span role="img" aria-label="Nicht geprüft" title="Nicht geprüft" className="block size-6 rounded-full border-2 border-gray-500" />;
    }

    return (
        <span role="img" aria-label="Geprüft" title="Geprüft" className="flex size-6 items-center justify-center rounded-full bg-green-500 text-white">
            <MdCheck className="size-4" />
        </span>
    );
}

// Beim Wechsel der angezeigten Buchungen per key neu mounten, damit die Seite wieder auf 1 steht.
function EntryTable({entries, showUnit = true, alwaysPaginate = false}) {
    const [page, setPage] = useState(1);
    const sorted = entries.toSorted((a, b) => b.date.localeCompare(a.date) || b.id - a.id);
    const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
    const visible = sorted.slice((page - 1) * pageSize, page * pageSize);

    return (
        <>
            <div className="overflow-x-auto">
                <Table striped>
                    <TableHead>
                        <TableRow>
                            <TableHeadCell>Geprüft</TableHeadCell>
                            <TableHeadCell>Datum</TableHeadCell>
                            <TableHeadCell>Beschreibung</TableHeadCell>
                            {showUnit && <TableHeadCell>Kostenstelle</TableHeadCell>}
                            <TableHeadCell>Konto</TableHeadCell>
                            <TableHeadCell className="text-right">Betrag</TableHeadCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {visible.map((entry) => (
                            <TableRow key={entry.id}>
                                <TableCell>
                                    <CheckedMark checked={entry.checked} />
                                </TableCell>
                                <TableCell className="whitespace-nowrap tabular-nums">{formatDate(entry.date)}</TableCell>
                                <TableCell className="font-medium text-white">{entry.description}</TableCell>
                                {showUnit && (
                                    <TableCell>
                                        <Badge color={unitColor[entry.unit]} className="w-fit whitespace-nowrap">
                                            {entry.unit}
                                        </Badge>
                                    </TableCell>
                                )}
                                <TableCell>{entry.category}</TableCell>
                                <TableCell className={`text-right whitespace-nowrap tabular-nums ${amountColor(entry.amount)}`}>{formatAmount(entry.amount)}</TableCell>
                            </TableRow>
                        ))}
                        {sorted.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={showUnit ? 6 : 5} className="text-center">
                                    Keine Buchungen gefunden.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            {(alwaysPaginate || totalPages > 1) && (
                <div className="flex justify-end">
                    <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} previousLabel="Zurück" nextLabel="Weiter" showIcons />
                </div>
            )}
        </>
    );
}

function BookEntries({entries}) {
    const [filter, setFilter] = useState('');
    const total = entries.reduce((sum, entry) => sum + entry.amount, 0);

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
                <TextInput className="grow" type="search" icon={MdSearch} placeholder="Buchungen filtern …" aria-label="Buchungen filtern" value={filter} onChange={(e) => setFilter(e.target.value)} />
                <div className="shrink-0 text-sm whitespace-nowrap">
                    Kassenstand: <span className={`font-semibold tabular-nums ${amountColor(total)}`}>{formatAmount(total)}</span>
                </div>
                <Button className="shrink-0">
                    <MdAdd className="mr-2 h-5 w-5" />
                    Neu
                </Button>
            </div>
            <EntryTable key={filter} entries={entries.filter((entry) => matches(entry, filter))} />
        </div>
    );
}

function entriesOf(book) {
    return dummyBooks.find((dummy) => dummy.name === book.name)?.entries ?? [];
}

function UnitOverview({show, onClose}) {
    const [unit, setUnit] = useState(units[0]);
    const entries = dummyBooks.flatMap((book) => book.entries).filter((entry) => entry.unit === unit);
    const total = entries.reduce((sum, entry) => sum + entry.amount, 0);

    return (
        <Modal show={show} onClose={onClose} size="4xl" dismissible>
            <ModalHeader>Kostenstellen-Übersicht</ModalHeader>
            <ModalBody>
                <div className="flex flex-col gap-4">
                    <div className="flex items-end justify-between gap-4">
                        <div>
                            <Label htmlFor="overview-unit" className="mb-2 block">
                                Kostenstelle
                            </Label>
                            <Select id="overview-unit" value={unit} onChange={(e) => setUnit(e.target.value)}>
                                {units.map((name) => (
                                    <option key={name}>{name}</option>
                                ))}
                            </Select>
                        </div>
                        <div className="text-right">
                            <div className="text-sm text-gray-400">Summe</div>
                            <div className={`text-2xl font-semibold whitespace-nowrap tabular-nums ${amountColor(total)}`}>{formatAmount(total)}</div>
                        </div>
                    </div>
                    <EntryTable key={unit} entries={entries} showUnit={false} alwaysPaginate />
                </div>
            </ModalBody>
        </Modal>
    );
}

export default function EntryPage() {
    const [books, setBooks] = useState(null);
    const [overviewOpen, setOverviewOpen] = useState(false);

    useEffect(() => {
        apiFetch('/book')
            .then((response) => (response.ok ? response.json() : Promise.reject(response)))
            .then((data) => setBooks(data.data));
    }, []);

    return (
        <div className="relative">
            {books?.length > 0 && (
                <Tabs aria-label="Kassen" variant="underline">
                    {books.map((book) => (
                        <TabItem key={book.id} title={book.name}>
                            <BookEntries entries={entriesOf(book)} />
                        </TabItem>
                    ))}
                </Tabs>
            )}
            {books?.length === 0 && <p className="py-3 pr-48 text-sm">Keine Kassen gefunden.</p>}
            <Button size="sm" color="alternative" className="absolute top-2 right-0" onClick={() => setOverviewOpen(true)}>
                Kostenstellen-Übersicht
            </Button>
            <UnitOverview show={overviewOpen} onClose={() => setOverviewOpen(false)} />
        </div>
    );
}

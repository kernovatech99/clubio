import {
    Alert,
    Button,
    ButtonGroup,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Pagination,
    Select,
    TabItem,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeadCell,
    TableRow,
    Tabs,
    TextInput as FlowbiteTextInput,
} from 'flowbite-react';
import {useEffect, useState} from 'react';
import {MdAdd, MdCheck, MdDelete, MdEdit, MdSearch} from 'react-icons/md';
import {apiFetch} from '../lib/api.js';
import {SelectInput} from '../components/SelectInput.jsx';
import {TextInput} from '../components/TextInput.jsx';
import {useDialog} from '../components/DialogContext.tsx';

const currency = new Intl.NumberFormat('de-DE', {style: 'currency', currency: 'EUR'});

function formatAmount(amount) {
    return currency.format(amount / 100);
}

// Buchungsdaten sind reine Kalendertage (YYYY-MM-DD), daher ohne Zeitzonenverschiebung formatieren.
const dateFormat = new Intl.DateTimeFormat('de-DE', {dateStyle: 'medium', timeZone: 'UTC'});

function formatDate(date) {
    return dateFormat.format(new Date(date));
}

function today() {
    const now = new Date();
    return [now.getFullYear(), String(now.getMonth() + 1).padStart(2, '0'), String(now.getDate()).padStart(2, '0')].join('-');
}

// Wandelt die Eingabe ("-1.234,50" oder "-1234.50") in Cent um. Liefert null, wenn die Eingabe keine Zahl ist.
function parseAmount(input) {
    const normalized = input.includes(',') ? input.replaceAll('.', '').replace(',', '.') : input;
    const amount = Math.round(parseFloat(normalized.replace(/\s/g, '')) * 100);
    return Number.isNaN(amount) ? null : amount;
}

function matches(entry, filter) {
    const needle = filter.trim().toLowerCase();
    return [formatDate(entry.date), entry.description, entry.unit?.name ?? '', entry.category?.name ?? '', formatAmount(entry.amount)].some((value) => value.toLowerCase().includes(needle));
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
function EntryTable({entries, showUnit = true, alwaysPaginate = false, onEdit, onDelete}) {
    const showActions = !!onEdit;
    const columns = 4 + (showUnit ? 1 : 0) + (showActions ? 1 : 0);
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
                            {showActions && <TableHeadCell className="text-right">Aktionen</TableHeadCell>}
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
                                        {entry.unit && (
                                            <span className="flex items-center gap-2 whitespace-nowrap">
                                                <span className={'block size-3 shrink-0 rounded-full bg-' + entry.unit.color} />
                                                {entry.unit.name}
                                            </span>
                                        )}
                                    </TableCell>
                                )}
                                <TableCell>{entry.category?.name}</TableCell>
                                <TableCell className={`text-right whitespace-nowrap tabular-nums ${amountColor(entry.amount)}`}>{formatAmount(entry.amount)}</TableCell>
                                {showActions && (
                                    <TableCell className="text-right">
                                        <ButtonGroup>
                                            <Button onClick={() => onEdit(entry)} size="xs" color="alternative" title="Bearbeiten">
                                                <MdEdit className="size-4" />
                                            </Button>
                                            <Button onClick={() => onDelete(entry.id)} size="xs" color="red" title="Löschen">
                                                <MdDelete className="size-4" />
                                            </Button>
                                        </ButtonGroup>
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                        {sorted.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={columns} className="text-center">
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

function BookEntries({entries, onNew, onEdit, onDelete}) {
    const [filter, setFilter] = useState('');
    const total = entries.reduce((sum, entry) => sum + entry.amount, 0);

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
                <FlowbiteTextInput
                    className="grow"
                    type="search"
                    icon={MdSearch}
                    placeholder="Buchungen filtern …"
                    aria-label="Buchungen filtern"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
                <div className="shrink-0 text-sm whitespace-nowrap">
                    Kassenstand: <span className={`font-semibold tabular-nums ${amountColor(total)}`}>{formatAmount(total)}</span>
                </div>
                <Button className="shrink-0" onClick={onNew}>
                    <MdAdd className="mr-2 h-5 w-5" />
                    Neu
                </Button>
            </div>
            <EntryTable key={filter} entries={entries.filter((entry) => matches(entry, filter))} onEdit={onEdit} onDelete={onDelete} />
        </div>
    );
}

function UnitOverview({show, onClose, units, entries}) {
    const [selected, setSelected] = useState(null);
    const unitId = selected ?? units[0]?.id;
    const unitEntries = entries.filter((entry) => entry.unitId === unitId);
    const total = unitEntries.reduce((sum, entry) => sum + entry.amount, 0);

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
                            <Select id="overview-unit" value={unitId ?? ''} onChange={(e) => setSelected(Number(e.target.value))}>
                                {units.map((unit) => (
                                    <option key={unit.id} value={unit.id}>
                                        {unit.name}
                                    </option>
                                ))}
                            </Select>
                        </div>
                        <div className="text-right">
                            <div className="text-sm text-gray-400">Summe</div>
                            <div className={`text-2xl font-semibold whitespace-nowrap tabular-nums ${amountColor(total)}`}>{formatAmount(total)}</div>
                        </div>
                    </div>
                    <EntryTable key={unitId} entries={unitEntries} showUnit={false} alwaysPaginate />
                </div>
            </ModalBody>
        </Modal>
    );
}

const emptyForm = {date: '', description: '', bookId: null, unitId: '', categoryId: '', amount: '', receiptNumber: ''};

function fetchData(path) {
    return apiFetch(path)
        .then((response) => (response.ok ? response.json() : Promise.reject(response)))
        .then((data) => data.data);
}

export default function EntryPage() {
    const [books, setBooks] = useState(null);
    const [units, setUnits] = useState([]);
    const [categories, setCategories] = useState([]);
    const [rawEntries, setRawEntries] = useState([]);
    const [overviewOpen, setOverviewOpen] = useState(false);
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [errors, setErrors] = useState({});
    const {confirm} = useDialog();

    useEffect(() => {
        Promise.all([fetchData('/book'), fetchData('/unit'), fetchData('/category'), fetchData('/entry')]).then(([books, units, categories, entries]) => {
            setUnits(units);
            setCategories(categories);
            setRawEntries(entries);
            setBooks(books);
        });
    }, []);

    const entries = rawEntries.map((entry) => ({
        ...entry,
        unit: units.find((unit) => unit.id === entry.unitId) ?? null,
        category: categories.find((category) => category.id === entry.categoryId) ?? null,
    }));

    function newEntry(book) {
        setForm({...emptyForm, bookId: book.id, date: today()});
        setModal(true);
    }

    function editEntry(entry) {
        setForm({
            id: entry.id,
            date: entry.date,
            description: entry.description,
            bookId: entry.bookId,
            unitId: entry.unitId ?? '',
            categoryId: entry.categoryId,
            amount: (entry.amount / 100).toFixed(2).replace('.', ','),
            receiptNumber: entry.receiptNumber ?? '',
        });
        setModal(true);
    }

    function closeModal() {
        setModal(false);
        setForm(emptyForm);
        setErrors({});
    }

    async function save() {
        const body = JSON.stringify({
            date: form.date,
            description: form.description,
            bookId: form.bookId,
            unitId: form.unitId === '' ? null : Number(form.unitId),
            categoryId: form.categoryId === '' ? null : Number(form.categoryId),
            amount: parseAmount(form.amount),
            receiptNumber: form.receiptNumber,
        });
        const res = form.id
            ? await apiFetch(`/entry/${form.id}`, {method: 'PUT', body, headers: {'Content-Type': 'application/json'}})
            : await apiFetch('/entry', {method: 'POST', body, headers: {'Content-Type': 'application/json'}});

        if (!res.ok) {
            const error = await res.json();
            if (error.fieldErrors) {
                setErrors(error.fieldErrors);
            }
            return;
        }

        setRawEntries((await res.json()).data);
        closeModal();
    }

    async function deleteEntry(id) {
        await confirm('Buchung löschen', 'Möchten Sie diese Buchung wirklich löschen?');
        const res = await apiFetch(`/entry/${id}`, {method: 'DELETE'});
        setRawEntries((await res.json()).data);
    }

    return (
        <div className="relative">
            <Modal dismissible show={modal} onClose={() => closeModal()}>
                <ModalHeader>{form.id ? 'Buchung bearbeiten' : 'Neue Buchung'}</ModalHeader>
                <ModalBody>
                    {Object.keys(errors).length !== 0 && (
                        <Alert color="failure" className="mb-4" onDismiss={() => setErrors({})}>
                            {Object.keys(errors).map((key) => (
                                <p key={key}>{errors[key].join(' ')}</p>
                            ))}
                        </Alert>
                    )}
                    <form className="flex max-w-md flex-col gap-4">
                        <TextInput id="date" type="date" label="Datum" required value={form.date} onChange={(e) => setForm({...form, date: e.target.value})} />
                        <TextInput id="description" label="Beschreibung" required value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} />
                        <SelectInput id="unitId" label="Kostenstelle" value={form.unitId} onChange={(e) => setForm({...form, unitId: e.target.value})}>
                            <option value="">Keine Kostenstelle</option>
                            {units.map((unit) => (
                                <option key={unit.id} value={unit.id}>
                                    {unit.name}
                                </option>
                            ))}
                        </SelectInput>
                        <SelectInput id="categoryId" label="Konto" required value={form.categoryId} onChange={(e) => setForm({...form, categoryId: e.target.value})}>
                            <option value="">Bitte wählen</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </SelectInput>
                        <TextInput
                            id="amount"
                            label="Betrag in € (Ausgaben mit Minus)"
                            placeholder="-12,50"
                            required
                            value={form.amount}
                            onChange={(e) => setForm({...form, amount: e.target.value})}
                        />
                        <TextInput id="receiptNumber" label="Quittungs-Nr" value={form.receiptNumber} onChange={(e) => setForm({...form, receiptNumber: e.target.value})} />
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={() => save()}>Speichern</Button>
                </ModalFooter>
            </Modal>

            {books?.length > 0 && (
                <Tabs aria-label="Kassen" variant="underline">
                    {books.map((book) => (
                        <TabItem key={book.id} title={book.name}>
                            <BookEntries entries={entries.filter((entry) => entry.bookId === book.id)} onNew={() => newEntry(book)} onEdit={editEntry} onDelete={deleteEntry} />
                        </TabItem>
                    ))}
                </Tabs>
            )}
            {books?.length === 0 && <p className="py-3 pr-48 text-sm">Keine Kassen gefunden.</p>}
            <Button size="sm" color="alternative" className="absolute top-2 right-0" onClick={() => setOverviewOpen(true)}>
                Kostenstellen-Übersicht
            </Button>
            <UnitOverview show={overviewOpen} onClose={() => setOverviewOpen(false)} units={units} entries={entries} />
        </div>
    );
}

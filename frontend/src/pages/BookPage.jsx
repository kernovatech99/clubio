import {Button, ButtonGroup, Modal, ModalBody, ModalFooter, ModalHeader, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow} from 'flowbite-react';
import {useEffect, useState} from 'react';
import {MdAdd, MdDelete, MdEdit} from 'react-icons/md';
import {apiFetch} from '../lib/api.js';
import {TextInput} from '../components/TextInput.jsx';
import {ColorInput} from '../components/ColorInput.jsx';
import {ColorSwatch} from '../components/ColorSwatch.js';

export default function BookPage() {
    const [books, setBooks] = useState(null);
    const [modal, setModal] = useState(false);

    function resetForm() {
        setForm({name: '', color: ''});
    }

    useEffect(() => {
        apiFetch('/book')
            .then((response) => (response.ok ? response.json() : Promise.reject(response)))
            .then((data) => setBooks(data.data));
    }, []);

    const [form, setForm] = useState({name: '', color: ''});

    async function save() {
        const res = form.id
            ? await apiFetch(`/book/${form.id}`, {method: 'PUT', body: JSON.stringify(form), headers: {'Content-Type': 'application/json'}})
            : await apiFetch('/book', {method: 'POST', body: JSON.stringify(form), headers: {'Content-Type': 'application/json'}});
        setBooks((await res.json()).data);
        setModal(false);
        resetForm();
    }

    async function deleteBook(id) {
        const res = await apiFetch(`/book/${id}`, {method: 'DELETE'});
        setBooks((await res.json()).data);
    }

    async function editBook(book) {
        setForm(book);
        setModal(true);
    }

    return (
        <div className="flex flex-col gap-4">
            <Modal dismissible show={modal} onClose={() => setModal(false)}>
                <ModalHeader>{form.id ? 'Kasse bearbeiten' : 'Neue Kasse'}</ModalHeader>
                <ModalBody>
                    <form className="flex max-w-md flex-col gap-4">
                        <TextInput id="name" label="Name" required value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} />
                        <ColorInput id="color" label="Farbe" required value={form.color} onChange={(color) => setForm({...form, color})} />
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={() => save()}>Speichern</Button>
                </ModalFooter>
            </Modal>

            <div className="flex items-center justify-end gap-4">
                <Button className="shrink-0" onClick={() => setModal(true)}>
                    <MdAdd className="mr-2 h-5 w-5" />
                    Neu
                </Button>
            </div>
            <div className="overflow-x-auto">
                <Table striped>
                    <TableHead>
                        <TableRow>
                            <TableHeadCell>Name</TableHeadCell>
                            <TableHeadCell>Farbe</TableHeadCell>
                            <TableHeadCell className="text-right">Aktionen</TableHeadCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {books?.map((book) => (
                            <TableRow key={book.id}>
                                <TableCell className="font-medium text-white">{book.name}</TableCell>
                                <TableCell>
                                    <ColorSwatch color={book.color} />
                                </TableCell>
                                <TableCell className="text-right">
                                    <ButtonGroup>
                                        <Button onClick={() => editBook(book)} size="xs" color="alternative" title="Bearbeiten">
                                            <MdEdit className="size-4" />
                                        </Button>
                                        <Button onClick={() => deleteBook(book.id)} size="xs" color="red" title="Löschen">
                                            <MdDelete className="size-4" />
                                        </Button>
                                    </ButtonGroup>
                                </TableCell>
                            </TableRow>
                        ))}
                        {!books?.length && (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center">
                                    Keine Kassen gefunden.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

import {Alert, Button, ButtonGroup, Modal, ModalBody, ModalFooter, ModalHeader, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow} from 'flowbite-react';
import {useEffect, useState} from 'react';
import {MdAdd, MdDelete, MdEdit} from 'react-icons/md';
import {apiFetch} from '../lib/api.js';
import {TextInput} from '../components/TextInput.jsx';
import {ColorInput} from '../components/ColorInput.jsx';
import {ColorSwatch} from '../components/ColorSwatch.js';
import {useDialog} from '../components/DialogContext.tsx';

export default function UnitPage() {
    const [units, setUnits] = useState(null);
    const [modal, setModal] = useState(false);
    const {confirm} = useDialog();

    function resetForm() {
        setForm({name: '', color: ''});
    }

    useEffect(() => {
        apiFetch('/unit')
            .then((response) => (response.ok ? response.json() : Promise.reject(response)))
            .then((data) => setUnits(data.data));
    }, []);

    const [form, setForm] = useState({name: '', color: ''});
    const [errors, setErrors] = useState({});

    async function save() {
        const res = form.id
            ? await apiFetch(`/unit/${form.id}`, {method: 'PUT', body: JSON.stringify(form), headers: {'Content-Type': 'application/json'}})
            : await apiFetch('/unit', {method: 'POST', body: JSON.stringify(form), headers: {'Content-Type': 'application/json'}});

        if (!res.ok) {
            const error = await res.json();
            if (error.fieldErrors) {
                setErrors(error.fieldErrors);
            }
            return;
        }

        setUnits((await res.json()).data);
        setModal(false);
        resetForm();
    }

    async function deleteUnit(id) {
        await confirm('Kostenstelle löschen', 'Möchten Sie diese Kostenstelle wirklich löschen?');
        const res = await apiFetch(`/unit/${id}`, {method: 'DELETE'});
        setUnits((await res.json()).data);
    }

    async function editUnit(unit) {
        setForm(unit);
        setModal(true);
    }

    async function closeModal() {
        setModal(false);
        resetForm();
        setErrors({});
    }

    return (
        <div className="flex flex-col gap-4">
            <Modal dismissible show={modal} onClose={() => closeModal()}>
                <ModalHeader>{form.id ? 'Kostenstelle bearbeiten' : 'Neue Kostenstelle'}</ModalHeader>
                <ModalBody>
                    {Object.keys(errors).length !== 0 && (
                        <Alert color="failure" onDismiss={() => setErrors({})}>
                            {Object.keys(errors).map((key) => (
                                <p key={key}>{errors[key].join(' ')}</p>
                            ))}
                        </Alert>
                    )}
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
                        {units?.map((unit) => (
                            <TableRow key={unit.id}>
                                <TableCell className="font-medium text-white">{unit.name}</TableCell>
                                <TableCell>
                                    <ColorSwatch color={unit.color} />
                                </TableCell>
                                <TableCell className="text-right">
                                    <ButtonGroup>
                                        <Button onClick={() => editUnit(unit)} size="xs" color="alternative" title="Bearbeiten">
                                            <MdEdit className="size-4" />
                                        </Button>
                                        <Button onClick={() => deleteUnit(unit.id)} size="xs" color="red" title="Löschen">
                                            <MdDelete className="size-4" />
                                        </Button>
                                    </ButtonGroup>
                                </TableCell>
                            </TableRow>
                        ))}
                        {!units?.length && (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center">
                                    Keine Kostenstellen gefunden.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

import {Button, Modal, ModalBody, ModalHeader} from 'flowbite-react';
import {createContext, useContext, useState} from 'react';
import {HiOutlineExclamationCircle} from 'react-icons/hi';

const DialogContext = createContext(null);

function Dialog({onConfirm, onCancel, title, message, open}) {
    return (
        <>
            <Modal dismissible show={open} size="md" onClose={() => onCancel()} popup>
                <ModalHeader />
                <ModalBody>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal dark:text-gray-400">{title}</h3>
                        <p className="mb-5 dark:text-gray-400">{message}</p>
                        <div className="flex justify-center gap-4">
                            <Button color="red" onClick={onConfirm}>
                                Ja
                            </Button>
                            <Button color="alternative" onClick={onCancel}>
                                Nein, abbrechen
                            </Button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </>
    );
}

export function DialogProvider({children}) {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [onConfirm, setOnConfirm] = useState(() => () => {});
    const [onCancel, setOnCancel] = useState(() => () => {});

    const value = {
        confirm: async (title: string, message: string) => {
            return new Promise<void>((resolve, reject) => {
                setTitle(title);
                setMessage(message);
                setOnConfirm(() => () => {
                    setOpen(false);
                    resolve();
                });
                setOnCancel(() => () => {
                    setOpen(false);
                    reject();
                });
                setOpen(true);
            });
        },
    };

    return (
        <DialogContext value={value}>
            {children}
            <Dialog open={open} title={title} message={message} onConfirm={onConfirm} onCancel={onCancel} />
        </DialogContext>
    );
}

export function useDialog() {
    return useContext(DialogContext);
}

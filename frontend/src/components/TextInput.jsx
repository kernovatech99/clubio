import {TextInput as FlowbiteTextInput, Label} from 'flowbite-react';

export function TextInput({label, id, placeholder, required, value, onChange, type = 'text'}) {
    return (
        <>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor={id}>{label}</Label>
                </div>
                <FlowbiteTextInput id={id} type={type} placeholder={placeholder} required={required} value={value} onChange={onChange} />
            </div>
        </>
    );
}

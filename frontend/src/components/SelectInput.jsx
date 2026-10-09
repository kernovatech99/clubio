import {Select as FlowbiteSelect, Label} from 'flowbite-react';

export function SelectInput({label, id, required, value, onChange, children}) {
    return (
        <>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor={id}>{label}</Label>
                </div>
                <FlowbiteSelect id={id} required={required} value={value} onChange={onChange}>
                    {children}
                </FlowbiteSelect>
            </div>
        </>
    );
}

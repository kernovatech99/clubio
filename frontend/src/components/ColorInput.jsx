import {autoUpdate, flip, offset, shift, useFloating} from '@floating-ui/react';
import {TextInput as FlowbiteTextInput, Label} from 'flowbite-react';
import {useState} from 'react';

export function ColorInput({label, id, placeholder = 'keine Farbe gewählt', required, value, onChange}) {
    const [open, setOpen] = useState(false);
    const [reference, setReference] = useState(null);
    const [floating, setFloating] = useState(null);
    const {floatingStyles} = useFloating({
        open,
        elements: {reference, floating},
        placement: 'bottom-start',
        strategy: 'fixed',
        middleware: [offset(8), flip(), shift({padding: 8})],
        whileElementsMounted: autoUpdate,
    });

    function select(color) {
        onChange(color);
        setOpen(false);
    }

    return (
        <>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor={id}>{label}</Label>
                </div>
                <FlowbiteTextInput
                    ref={setReference}
                    id={id}
                    type="text"
                    placeholder={placeholder}
                    required={required}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onFocus={() => setOpen(true)}
                    onClick={() => setOpen(true)}
                    onBlur={() => setOpen(false)}
                    addon={<span className={'block size-4 rounded-full bg-' + value} />}
                />
                {open && (
                    <div
                        ref={setFloating}
                        style={floatingStyles}
                        data-testid="color-popover"
                        className="z-20 max-w-[calc(100vw-1rem)] overflow-x-auto rounded-lg border  p-3 shadow-sm dark:border-gray-600 dark:bg-gray-800"
                        onMouseDown={(e) => e.preventDefault()}
                    >
                        <div className="grid w-max gap-1" style={{gridTemplateColumns: 'repeat(26, 1fr)'}}>
                            <button
                                type="button"
                                data-cy="red-50"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-red-50"
                                onClick={() => select('red-50')}
                            />
                            <button
                                type="button"
                                data-cy="orange-50"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-orange-50"
                                onClick={() => select('orange-50')}
                            />
                            <button
                                type="button"
                                data-cy="amber-50"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-amber-50"
                                onClick={() => select('amber-50')}
                            />
                            <button
                                type="button"
                                data-cy="yellow-50"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-yellow-50"
                                onClick={() => select('yellow-50')}
                            />
                            <button
                                type="button"
                                data-cy="lime-50"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-lime-50"
                                onClick={() => select('lime-50')}
                            />
                            <button
                                type="button"
                                data-cy="green-50"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-green-50"
                                onClick={() => select('green-50')}
                            />
                            <button
                                type="button"
                                data-cy="emerald-50"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-emerald-50"
                                onClick={() => select('emerald-50')}
                            />
                            <button
                                type="button"
                                data-cy="teal-50"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-teal-50"
                                onClick={() => select('teal-50')}
                            />
                            <button
                                type="button"
                                data-cy="cyan-50"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-cyan-50"
                                onClick={() => select('cyan-50')}
                            />
                            <button
                                type="button"
                                data-cy="sky-50"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-sky-50"
                                onClick={() => select('sky-50')}
                            />
                            <button
                                type="button"
                                data-cy="blue-50"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-blue-50"
                                onClick={() => select('blue-50')}
                            />
                            <button
                                type="button"
                                data-cy="indigo-50"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-indigo-50"
                                onClick={() => select('indigo-50')}
                            />
                            <button
                                type="button"
                                data-cy="violet-50"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-violet-50"
                                onClick={() => select('violet-50')}
                            />
                            <button
                                type="button"
                                data-cy="purple-50"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-purple-50"
                                onClick={() => select('purple-50')}
                            />
                            <button
                                type="button"
                                data-cy="fuchsia-50"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-fuchsia-50"
                                onClick={() => select('fuchsia-50')}
                            />
                            <button
                                type="button"
                                data-cy="pink-50"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-pink-50"
                                onClick={() => select('pink-50')}
                            />
                            <button
                                type="button"
                                data-cy="rose-50"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-rose-50"
                                onClick={() => select('rose-50')}
                            />
                            <button
                                type="button"
                                data-cy="slate-50"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-slate-50"
                                onClick={() => select('slate-50')}
                            />
                            <button
                                type="button"
                                data-cy="gray-50"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-gray-50"
                                onClick={() => select('gray-50')}
                            />
                            <button
                                type="button"
                                data-cy="zinc-50"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-zinc-50"
                                onClick={() => select('zinc-50')}
                            />
                            <button
                                type="button"
                                data-cy="neutral-50"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-neutral-50"
                                onClick={() => select('neutral-50')}
                            />
                            <button
                                type="button"
                                data-cy="stone-50"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-stone-50"
                                onClick={() => select('stone-50')}
                            />
                            <button
                                type="button"
                                data-cy="taupe-50"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-taupe-50"
                                onClick={() => select('taupe-50')}
                            />
                            <button
                                type="button"
                                data-cy="mauve-50"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-mauve-50"
                                onClick={() => select('mauve-50')}
                            />
                            <button
                                type="button"
                                data-cy="mist-50"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-mist-50"
                                onClick={() => select('mist-50')}
                            />
                            <button
                                type="button"
                                data-cy="olive-50"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-olive-50"
                                onClick={() => select('olive-50')}
                            />
                            <button
                                type="button"
                                data-cy="red-100"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-red-100"
                                onClick={() => select('red-100')}
                            />
                            <button
                                type="button"
                                data-cy="orange-100"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-orange-100"
                                onClick={() => select('orange-100')}
                            />
                            <button
                                type="button"
                                data-cy="amber-100"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-amber-100"
                                onClick={() => select('amber-100')}
                            />
                            <button
                                type="button"
                                data-cy="yellow-100"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-yellow-100"
                                onClick={() => select('yellow-100')}
                            />
                            <button
                                type="button"
                                data-cy="lime-100"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-lime-100"
                                onClick={() => select('lime-100')}
                            />
                            <button
                                type="button"
                                data-cy="green-100"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-green-100"
                                onClick={() => select('green-100')}
                            />
                            <button
                                type="button"
                                data-cy="emerald-100"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-emerald-100"
                                onClick={() => select('emerald-100')}
                            />
                            <button
                                type="button"
                                data-cy="teal-100"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-teal-100"
                                onClick={() => select('teal-100')}
                            />
                            <button
                                type="button"
                                data-cy="cyan-100"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-cyan-100"
                                onClick={() => select('cyan-100')}
                            />
                            <button
                                type="button"
                                data-cy="sky-100"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-sky-100"
                                onClick={() => select('sky-100')}
                            />
                            <button
                                type="button"
                                data-cy="blue-100"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-blue-100"
                                onClick={() => select('blue-100')}
                            />
                            <button
                                type="button"
                                data-cy="indigo-100"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-indigo-100"
                                onClick={() => select('indigo-100')}
                            />
                            <button
                                type="button"
                                data-cy="violet-100"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-violet-100"
                                onClick={() => select('violet-100')}
                            />
                            <button
                                type="button"
                                data-cy="purple-100"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-purple-100"
                                onClick={() => select('purple-100')}
                            />
                            <button
                                type="button"
                                data-cy="fuchsia-100"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-fuchsia-100"
                                onClick={() => select('fuchsia-100')}
                            />
                            <button
                                type="button"
                                data-cy="pink-100"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-pink-100"
                                onClick={() => select('pink-100')}
                            />
                            <button
                                type="button"
                                data-cy="rose-100"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-rose-100"
                                onClick={() => select('rose-100')}
                            />
                            <button
                                type="button"
                                data-cy="slate-100"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-slate-100"
                                onClick={() => select('slate-100')}
                            />
                            <button
                                type="button"
                                data-cy="gray-100"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-gray-100"
                                onClick={() => select('gray-100')}
                            />
                            <button
                                type="button"
                                data-cy="zinc-100"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-zinc-100"
                                onClick={() => select('zinc-100')}
                            />
                            <button
                                type="button"
                                data-cy="neutral-100"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-neutral-100"
                                onClick={() => select('neutral-100')}
                            />
                            <button
                                type="button"
                                data-cy="stone-100"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-stone-100"
                                onClick={() => select('stone-100')}
                            />
                            <button
                                type="button"
                                data-cy="taupe-100"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-taupe-100"
                                onClick={() => select('taupe-100')}
                            />
                            <button
                                type="button"
                                data-cy="mauve-100"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-mauve-100"
                                onClick={() => select('mauve-100')}
                            />
                            <button
                                type="button"
                                data-cy="mist-100"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-mist-100"
                                onClick={() => select('mist-100')}
                            />
                            <button
                                type="button"
                                data-cy="olive-100"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-olive-100"
                                onClick={() => select('olive-100')}
                            />
                            <button
                                type="button"
                                data-cy="red-200"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-red-200"
                                onClick={() => select('red-200')}
                            />
                            <button
                                type="button"
                                data-cy="orange-200"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-orange-200"
                                onClick={() => select('orange-200')}
                            />
                            <button
                                type="button"
                                data-cy="amber-200"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-amber-200"
                                onClick={() => select('amber-200')}
                            />
                            <button
                                type="button"
                                data-cy="yellow-200"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-yellow-200"
                                onClick={() => select('yellow-200')}
                            />
                            <button
                                type="button"
                                data-cy="lime-200"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-lime-200"
                                onClick={() => select('lime-200')}
                            />
                            <button
                                type="button"
                                data-cy="green-200"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-green-200"
                                onClick={() => select('green-200')}
                            />
                            <button
                                type="button"
                                data-cy="emerald-200"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-emerald-200"
                                onClick={() => select('emerald-200')}
                            />
                            <button
                                type="button"
                                data-cy="teal-200"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-teal-200"
                                onClick={() => select('teal-200')}
                            />
                            <button
                                type="button"
                                data-cy="cyan-200"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-cyan-200"
                                onClick={() => select('cyan-200')}
                            />
                            <button
                                type="button"
                                data-cy="sky-200"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-sky-200"
                                onClick={() => select('sky-200')}
                            />
                            <button
                                type="button"
                                data-cy="blue-200"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-blue-200"
                                onClick={() => select('blue-200')}
                            />
                            <button
                                type="button"
                                data-cy="indigo-200"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-indigo-200"
                                onClick={() => select('indigo-200')}
                            />
                            <button
                                type="button"
                                data-cy="violet-200"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-violet-200"
                                onClick={() => select('violet-200')}
                            />
                            <button
                                type="button"
                                data-cy="purple-200"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-purple-200"
                                onClick={() => select('purple-200')}
                            />
                            <button
                                type="button"
                                data-cy="fuchsia-200"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-fuchsia-200"
                                onClick={() => select('fuchsia-200')}
                            />
                            <button
                                type="button"
                                data-cy="pink-200"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-pink-200"
                                onClick={() => select('pink-200')}
                            />
                            <button
                                type="button"
                                data-cy="rose-200"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-rose-200"
                                onClick={() => select('rose-200')}
                            />
                            <button
                                type="button"
                                data-cy="slate-200"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-slate-200"
                                onClick={() => select('slate-200')}
                            />
                            <button
                                type="button"
                                data-cy="gray-200"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-gray-200"
                                onClick={() => select('gray-200')}
                            />
                            <button
                                type="button"
                                data-cy="zinc-200"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-zinc-200"
                                onClick={() => select('zinc-200')}
                            />
                            <button
                                type="button"
                                data-cy="neutral-200"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-neutral-200"
                                onClick={() => select('neutral-200')}
                            />
                            <button
                                type="button"
                                data-cy="stone-200"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-stone-200"
                                onClick={() => select('stone-200')}
                            />
                            <button
                                type="button"
                                data-cy="taupe-200"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-taupe-200"
                                onClick={() => select('taupe-200')}
                            />
                            <button
                                type="button"
                                data-cy="mauve-200"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-mauve-200"
                                onClick={() => select('mauve-200')}
                            />
                            <button
                                type="button"
                                data-cy="mist-200"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-mist-200"
                                onClick={() => select('mist-200')}
                            />
                            <button
                                type="button"
                                data-cy="olive-200"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-olive-200"
                                onClick={() => select('olive-200')}
                            />
                            <button
                                type="button"
                                data-cy="red-300"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-red-300"
                                onClick={() => select('red-300')}
                            />
                            <button
                                type="button"
                                data-cy="orange-300"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-orange-300"
                                onClick={() => select('orange-300')}
                            />
                            <button
                                type="button"
                                data-cy="amber-300"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-amber-300"
                                onClick={() => select('amber-300')}
                            />
                            <button
                                type="button"
                                data-cy="yellow-300"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-yellow-300"
                                onClick={() => select('yellow-300')}
                            />
                            <button
                                type="button"
                                data-cy="lime-300"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-lime-300"
                                onClick={() => select('lime-300')}
                            />
                            <button
                                type="button"
                                data-cy="green-300"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-green-300"
                                onClick={() => select('green-300')}
                            />
                            <button
                                type="button"
                                data-cy="emerald-300"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-emerald-300"
                                onClick={() => select('emerald-300')}
                            />
                            <button
                                type="button"
                                data-cy="teal-300"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-teal-300"
                                onClick={() => select('teal-300')}
                            />
                            <button
                                type="button"
                                data-cy="cyan-300"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-cyan-300"
                                onClick={() => select('cyan-300')}
                            />
                            <button
                                type="button"
                                data-cy="sky-300"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-sky-300"
                                onClick={() => select('sky-300')}
                            />
                            <button
                                type="button"
                                data-cy="blue-300"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-blue-300"
                                onClick={() => select('blue-300')}
                            />
                            <button
                                type="button"
                                data-cy="indigo-300"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-indigo-300"
                                onClick={() => select('indigo-300')}
                            />
                            <button
                                type="button"
                                data-cy="violet-300"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-violet-300"
                                onClick={() => select('violet-300')}
                            />
                            <button
                                type="button"
                                data-cy="purple-300"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-purple-300"
                                onClick={() => select('purple-300')}
                            />
                            <button
                                type="button"
                                data-cy="fuchsia-300"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-fuchsia-300"
                                onClick={() => select('fuchsia-300')}
                            />
                            <button
                                type="button"
                                data-cy="pink-300"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-pink-300"
                                onClick={() => select('pink-300')}
                            />
                            <button
                                type="button"
                                data-cy="rose-300"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-rose-300"
                                onClick={() => select('rose-300')}
                            />
                            <button
                                type="button"
                                data-cy="slate-300"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-slate-300"
                                onClick={() => select('slate-300')}
                            />
                            <button
                                type="button"
                                data-cy="gray-300"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-gray-300"
                                onClick={() => select('gray-300')}
                            />
                            <button
                                type="button"
                                data-cy="zinc-300"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-zinc-300"
                                onClick={() => select('zinc-300')}
                            />
                            <button
                                type="button"
                                data-cy="neutral-300"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-neutral-300"
                                onClick={() => select('neutral-300')}
                            />
                            <button
                                type="button"
                                data-cy="stone-300"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-stone-300"
                                onClick={() => select('stone-300')}
                            />
                            <button
                                type="button"
                                data-cy="taupe-300"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-taupe-300"
                                onClick={() => select('taupe-300')}
                            />
                            <button
                                type="button"
                                data-cy="mauve-300"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-mauve-300"
                                onClick={() => select('mauve-300')}
                            />
                            <button
                                type="button"
                                data-cy="mist-300"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-mist-300"
                                onClick={() => select('mist-300')}
                            />
                            <button
                                type="button"
                                data-cy="olive-300"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-olive-300"
                                onClick={() => select('olive-300')}
                            />
                            <button
                                type="button"
                                data-cy="red-400"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-red-400"
                                onClick={() => select('red-400')}
                            />
                            <button
                                type="button"
                                data-cy="orange-400"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-orange-400"
                                onClick={() => select('orange-400')}
                            />
                            <button
                                type="button"
                                data-cy="amber-400"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-amber-400"
                                onClick={() => select('amber-400')}
                            />
                            <button
                                type="button"
                                data-cy="yellow-400"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-yellow-400"
                                onClick={() => select('yellow-400')}
                            />
                            <button
                                type="button"
                                data-cy="lime-400"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-lime-400"
                                onClick={() => select('lime-400')}
                            />
                            <button
                                type="button"
                                data-cy="green-400"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-green-400"
                                onClick={() => select('green-400')}
                            />
                            <button
                                type="button"
                                data-cy="emerald-400"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-emerald-400"
                                onClick={() => select('emerald-400')}
                            />
                            <button
                                type="button"
                                data-cy="teal-400"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-teal-400"
                                onClick={() => select('teal-400')}
                            />
                            <button
                                type="button"
                                data-cy="cyan-400"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-cyan-400"
                                onClick={() => select('cyan-400')}
                            />
                            <button
                                type="button"
                                data-cy="sky-400"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-sky-400"
                                onClick={() => select('sky-400')}
                            />
                            <button
                                type="button"
                                data-cy="blue-400"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-blue-400"
                                onClick={() => select('blue-400')}
                            />
                            <button
                                type="button"
                                data-cy="indigo-400"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-indigo-400"
                                onClick={() => select('indigo-400')}
                            />
                            <button
                                type="button"
                                data-cy="violet-400"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-violet-400"
                                onClick={() => select('violet-400')}
                            />
                            <button
                                type="button"
                                data-cy="purple-400"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-purple-400"
                                onClick={() => select('purple-400')}
                            />
                            <button
                                type="button"
                                data-cy="fuchsia-400"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-fuchsia-400"
                                onClick={() => select('fuchsia-400')}
                            />
                            <button
                                type="button"
                                data-cy="pink-400"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-pink-400"
                                onClick={() => select('pink-400')}
                            />
                            <button
                                type="button"
                                data-cy="rose-400"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-rose-400"
                                onClick={() => select('rose-400')}
                            />
                            <button
                                type="button"
                                data-cy="slate-400"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-slate-400"
                                onClick={() => select('slate-400')}
                            />
                            <button
                                type="button"
                                data-cy="gray-400"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-gray-400"
                                onClick={() => select('gray-400')}
                            />
                            <button
                                type="button"
                                data-cy="zinc-400"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-zinc-400"
                                onClick={() => select('zinc-400')}
                            />
                            <button
                                type="button"
                                data-cy="neutral-400"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-neutral-400"
                                onClick={() => select('neutral-400')}
                            />
                            <button
                                type="button"
                                data-cy="stone-400"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-stone-400"
                                onClick={() => select('stone-400')}
                            />
                            <button
                                type="button"
                                data-cy="taupe-400"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-taupe-400"
                                onClick={() => select('taupe-400')}
                            />
                            <button
                                type="button"
                                data-cy="mauve-400"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-mauve-400"
                                onClick={() => select('mauve-400')}
                            />
                            <button
                                type="button"
                                data-cy="mist-400"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-mist-400"
                                onClick={() => select('mist-400')}
                            />
                            <button
                                type="button"
                                data-cy="olive-400"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-olive-400"
                                onClick={() => select('olive-400')}
                            />
                            <button
                                type="button"
                                data-cy="red-500"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-red-500"
                                onClick={() => select('red-500')}
                            />
                            <button
                                type="button"
                                data-cy="orange-500"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-orange-500"
                                onClick={() => select('orange-500')}
                            />
                            <button
                                type="button"
                                data-cy="amber-500"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-amber-500"
                                onClick={() => select('amber-500')}
                            />
                            <button
                                type="button"
                                data-cy="yellow-500"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-yellow-500"
                                onClick={() => select('yellow-500')}
                            />
                            <button
                                type="button"
                                data-cy="lime-500"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-lime-500"
                                onClick={() => select('lime-500')}
                            />
                            <button
                                type="button"
                                data-cy="green-500"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-green-500"
                                onClick={() => select('green-500')}
                            />
                            <button
                                type="button"
                                data-cy="emerald-500"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-emerald-500"
                                onClick={() => select('emerald-500')}
                            />
                            <button
                                type="button"
                                data-cy="teal-500"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-teal-500"
                                onClick={() => select('teal-500')}
                            />
                            <button
                                type="button"
                                data-cy="cyan-500"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-cyan-500"
                                onClick={() => select('cyan-500')}
                            />
                            <button
                                type="button"
                                data-cy="sky-500"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-sky-500"
                                onClick={() => select('sky-500')}
                            />
                            <button
                                type="button"
                                data-cy="blue-500"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-blue-500"
                                onClick={() => select('blue-500')}
                            />
                            <button
                                type="button"
                                data-cy="indigo-500"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-indigo-500"
                                onClick={() => select('indigo-500')}
                            />
                            <button
                                type="button"
                                data-cy="violet-500"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-violet-500"
                                onClick={() => select('violet-500')}
                            />
                            <button
                                type="button"
                                data-cy="purple-500"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-purple-500"
                                onClick={() => select('purple-500')}
                            />
                            <button
                                type="button"
                                data-cy="fuchsia-500"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-fuchsia-500"
                                onClick={() => select('fuchsia-500')}
                            />
                            <button
                                type="button"
                                data-cy="pink-500"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-pink-500"
                                onClick={() => select('pink-500')}
                            />
                            <button
                                type="button"
                                data-cy="rose-500"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-rose-500"
                                onClick={() => select('rose-500')}
                            />
                            <button
                                type="button"
                                data-cy="slate-500"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-slate-500"
                                onClick={() => select('slate-500')}
                            />
                            <button
                                type="button"
                                data-cy="gray-500"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-gray-500"
                                onClick={() => select('gray-500')}
                            />
                            <button
                                type="button"
                                data-cy="zinc-500"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-zinc-500"
                                onClick={() => select('zinc-500')}
                            />
                            <button
                                type="button"
                                data-cy="neutral-500"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-neutral-500"
                                onClick={() => select('neutral-500')}
                            />
                            <button
                                type="button"
                                data-cy="stone-500"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-stone-500"
                                onClick={() => select('stone-500')}
                            />
                            <button
                                type="button"
                                data-cy="taupe-500"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-taupe-500"
                                onClick={() => select('taupe-500')}
                            />
                            <button
                                type="button"
                                data-cy="mauve-500"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-mauve-500"
                                onClick={() => select('mauve-500')}
                            />
                            <button
                                type="button"
                                data-cy="mist-500"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-mist-500"
                                onClick={() => select('mist-500')}
                            />
                            <button
                                type="button"
                                data-cy="olive-500"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-olive-500"
                                onClick={() => select('olive-500')}
                            />
                            <button
                                type="button"
                                data-cy="red-600"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-red-600"
                                onClick={() => select('red-600')}
                            />
                            <button
                                type="button"
                                data-cy="orange-600"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-orange-600"
                                onClick={() => select('orange-600')}
                            />
                            <button
                                type="button"
                                data-cy="amber-600"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-amber-600"
                                onClick={() => select('amber-600')}
                            />
                            <button
                                type="button"
                                data-cy="yellow-600"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-yellow-600"
                                onClick={() => select('yellow-600')}
                            />
                            <button
                                type="button"
                                data-cy="lime-600"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-lime-600"
                                onClick={() => select('lime-600')}
                            />
                            <button
                                type="button"
                                data-cy="green-600"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-green-600"
                                onClick={() => select('green-600')}
                            />
                            <button
                                type="button"
                                data-cy="emerald-600"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-emerald-600"
                                onClick={() => select('emerald-600')}
                            />
                            <button
                                type="button"
                                data-cy="teal-600"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-teal-600"
                                onClick={() => select('teal-600')}
                            />
                            <button
                                type="button"
                                data-cy="cyan-600"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-cyan-600"
                                onClick={() => select('cyan-600')}
                            />
                            <button
                                type="button"
                                data-cy="sky-600"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-sky-600"
                                onClick={() => select('sky-600')}
                            />
                            <button
                                type="button"
                                data-cy="blue-600"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-blue-600"
                                onClick={() => select('blue-600')}
                            />
                            <button
                                type="button"
                                data-cy="indigo-600"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-indigo-600"
                                onClick={() => select('indigo-600')}
                            />
                            <button
                                type="button"
                                data-cy="violet-600"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-violet-600"
                                onClick={() => select('violet-600')}
                            />
                            <button
                                type="button"
                                data-cy="purple-600"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-purple-600"
                                onClick={() => select('purple-600')}
                            />
                            <button
                                type="button"
                                data-cy="fuchsia-600"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-fuchsia-600"
                                onClick={() => select('fuchsia-600')}
                            />
                            <button
                                type="button"
                                data-cy="pink-600"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-pink-600"
                                onClick={() => select('pink-600')}
                            />
                            <button
                                type="button"
                                data-cy="rose-600"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-rose-600"
                                onClick={() => select('rose-600')}
                            />
                            <button
                                type="button"
                                data-cy="slate-600"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-slate-600"
                                onClick={() => select('slate-600')}
                            />
                            <button
                                type="button"
                                data-cy="gray-600"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-gray-600"
                                onClick={() => select('gray-600')}
                            />
                            <button
                                type="button"
                                data-cy="zinc-600"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-zinc-600"
                                onClick={() => select('zinc-600')}
                            />
                            <button
                                type="button"
                                data-cy="neutral-600"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-neutral-600"
                                onClick={() => select('neutral-600')}
                            />
                            <button
                                type="button"
                                data-cy="stone-600"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-stone-600"
                                onClick={() => select('stone-600')}
                            />
                            <button
                                type="button"
                                data-cy="taupe-600"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-taupe-600"
                                onClick={() => select('taupe-600')}
                            />
                            <button
                                type="button"
                                data-cy="mauve-600"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-mauve-600"
                                onClick={() => select('mauve-600')}
                            />
                            <button
                                type="button"
                                data-cy="mist-600"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-mist-600"
                                onClick={() => select('mist-600')}
                            />
                            <button
                                type="button"
                                data-cy="olive-600"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-olive-600"
                                onClick={() => select('olive-600')}
                            />
                            <button
                                type="button"
                                data-cy="red-700"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-red-700"
                                onClick={() => select('red-700')}
                            />
                            <button
                                type="button"
                                data-cy="orange-700"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-orange-700"
                                onClick={() => select('orange-700')}
                            />
                            <button
                                type="button"
                                data-cy="amber-700"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-amber-700"
                                onClick={() => select('amber-700')}
                            />
                            <button
                                type="button"
                                data-cy="yellow-700"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-yellow-700"
                                onClick={() => select('yellow-700')}
                            />
                            <button
                                type="button"
                                data-cy="lime-700"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-lime-700"
                                onClick={() => select('lime-700')}
                            />
                            <button
                                type="button"
                                data-cy="green-700"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-green-700"
                                onClick={() => select('green-700')}
                            />
                            <button
                                type="button"
                                data-cy="emerald-700"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-emerald-700"
                                onClick={() => select('emerald-700')}
                            />
                            <button
                                type="button"
                                data-cy="teal-700"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-teal-700"
                                onClick={() => select('teal-700')}
                            />
                            <button
                                type="button"
                                data-cy="cyan-700"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-cyan-700"
                                onClick={() => select('cyan-700')}
                            />
                            <button
                                type="button"
                                data-cy="sky-700"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-sky-700"
                                onClick={() => select('sky-700')}
                            />
                            <button
                                type="button"
                                data-cy="blue-700"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-blue-700"
                                onClick={() => select('blue-700')}
                            />
                            <button
                                type="button"
                                data-cy="indigo-700"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-indigo-700"
                                onClick={() => select('indigo-700')}
                            />
                            <button
                                type="button"
                                data-cy="violet-700"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-violet-700"
                                onClick={() => select('violet-700')}
                            />
                            <button
                                type="button"
                                data-cy="purple-700"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-purple-700"
                                onClick={() => select('purple-700')}
                            />
                            <button
                                type="button"
                                data-cy="fuchsia-700"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-fuchsia-700"
                                onClick={() => select('fuchsia-700')}
                            />
                            <button
                                type="button"
                                data-cy="pink-700"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-pink-700"
                                onClick={() => select('pink-700')}
                            />
                            <button
                                type="button"
                                data-cy="rose-700"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-rose-700"
                                onClick={() => select('rose-700')}
                            />
                            <button
                                type="button"
                                data-cy="slate-700"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-slate-700"
                                onClick={() => select('slate-700')}
                            />
                            <button
                                type="button"
                                data-cy="gray-700"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-gray-700"
                                onClick={() => select('gray-700')}
                            />
                            <button
                                type="button"
                                data-cy="zinc-700"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-zinc-700"
                                onClick={() => select('zinc-700')}
                            />
                            <button
                                type="button"
                                data-cy="neutral-700"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-neutral-700"
                                onClick={() => select('neutral-700')}
                            />
                            <button
                                type="button"
                                data-cy="stone-700"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-stone-700"
                                onClick={() => select('stone-700')}
                            />
                            <button
                                type="button"
                                data-cy="taupe-700"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-taupe-700"
                                onClick={() => select('taupe-700')}
                            />
                            <button
                                type="button"
                                data-cy="mauve-700"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-mauve-700"
                                onClick={() => select('mauve-700')}
                            />
                            <button
                                type="button"
                                data-cy="mist-700"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-mist-700"
                                onClick={() => select('mist-700')}
                            />
                            <button
                                type="button"
                                data-cy="olive-700"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-olive-700"
                                onClick={() => select('olive-700')}
                            />
                            <button
                                type="button"
                                data-cy="red-800"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-red-800"
                                onClick={() => select('red-800')}
                            />
                            <button
                                type="button"
                                data-cy="orange-800"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-orange-800"
                                onClick={() => select('orange-800')}
                            />
                            <button
                                type="button"
                                data-cy="amber-800"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-amber-800"
                                onClick={() => select('amber-800')}
                            />
                            <button
                                type="button"
                                data-cy="yellow-800"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-yellow-800"
                                onClick={() => select('yellow-800')}
                            />
                            <button
                                type="button"
                                data-cy="lime-800"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-lime-800"
                                onClick={() => select('lime-800')}
                            />
                            <button
                                type="button"
                                data-cy="green-800"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-green-800"
                                onClick={() => select('green-800')}
                            />
                            <button
                                type="button"
                                data-cy="emerald-800"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-emerald-800"
                                onClick={() => select('emerald-800')}
                            />
                            <button
                                type="button"
                                data-cy="teal-800"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-teal-800"
                                onClick={() => select('teal-800')}
                            />
                            <button
                                type="button"
                                data-cy="cyan-800"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-cyan-800"
                                onClick={() => select('cyan-800')}
                            />
                            <button
                                type="button"
                                data-cy="sky-800"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-sky-800"
                                onClick={() => select('sky-800')}
                            />
                            <button
                                type="button"
                                data-cy="blue-800"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-blue-800"
                                onClick={() => select('blue-800')}
                            />
                            <button
                                type="button"
                                data-cy="indigo-800"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-indigo-800"
                                onClick={() => select('indigo-800')}
                            />
                            <button
                                type="button"
                                data-cy="violet-800"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-violet-800"
                                onClick={() => select('violet-800')}
                            />
                            <button
                                type="button"
                                data-cy="purple-800"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-purple-800"
                                onClick={() => select('purple-800')}
                            />
                            <button
                                type="button"
                                data-cy="fuchsia-800"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-fuchsia-800"
                                onClick={() => select('fuchsia-800')}
                            />
                            <button
                                type="button"
                                data-cy="pink-800"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-pink-800"
                                onClick={() => select('pink-800')}
                            />
                            <button
                                type="button"
                                data-cy="rose-800"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-rose-800"
                                onClick={() => select('rose-800')}
                            />
                            <button
                                type="button"
                                data-cy="slate-800"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-slate-800"
                                onClick={() => select('slate-800')}
                            />
                            <button
                                type="button"
                                data-cy="gray-800"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-gray-800"
                                onClick={() => select('gray-800')}
                            />
                            <button
                                type="button"
                                data-cy="zinc-800"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-zinc-800"
                                onClick={() => select('zinc-800')}
                            />
                            <button
                                type="button"
                                data-cy="neutral-800"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-neutral-800"
                                onClick={() => select('neutral-800')}
                            />
                            <button
                                type="button"
                                data-cy="stone-800"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-stone-800"
                                onClick={() => select('stone-800')}
                            />
                            <button
                                type="button"
                                data-cy="taupe-800"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-taupe-800"
                                onClick={() => select('taupe-800')}
                            />
                            <button
                                type="button"
                                data-cy="mauve-800"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-mauve-800"
                                onClick={() => select('mauve-800')}
                            />
                            <button
                                type="button"
                                data-cy="mist-800"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-mist-800"
                                onClick={() => select('mist-800')}
                            />
                            <button
                                type="button"
                                data-cy="olive-800"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-olive-800"
                                onClick={() => select('olive-800')}
                            />
                            <button
                                type="button"
                                data-cy="red-900"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-red-900"
                                onClick={() => select('red-900')}
                            />
                            <button
                                type="button"
                                data-cy="orange-900"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-orange-900"
                                onClick={() => select('orange-900')}
                            />
                            <button
                                type="button"
                                data-cy="amber-900"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-amber-900"
                                onClick={() => select('amber-900')}
                            />
                            <button
                                type="button"
                                data-cy="yellow-900"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-yellow-900"
                                onClick={() => select('yellow-900')}
                            />
                            <button
                                type="button"
                                data-cy="lime-900"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-lime-900"
                                onClick={() => select('lime-900')}
                            />
                            <button
                                type="button"
                                data-cy="green-900"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-green-900"
                                onClick={() => select('green-900')}
                            />
                            <button
                                type="button"
                                data-cy="emerald-900"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-emerald-900"
                                onClick={() => select('emerald-900')}
                            />
                            <button
                                type="button"
                                data-cy="teal-900"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-teal-900"
                                onClick={() => select('teal-900')}
                            />
                            <button
                                type="button"
                                data-cy="cyan-900"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-cyan-900"
                                onClick={() => select('cyan-900')}
                            />
                            <button
                                type="button"
                                data-cy="sky-900"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-sky-900"
                                onClick={() => select('sky-900')}
                            />
                            <button
                                type="button"
                                data-cy="blue-900"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-blue-900"
                                onClick={() => select('blue-900')}
                            />
                            <button
                                type="button"
                                data-cy="indigo-900"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-indigo-900"
                                onClick={() => select('indigo-900')}
                            />
                            <button
                                type="button"
                                data-cy="violet-900"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-violet-900"
                                onClick={() => select('violet-900')}
                            />
                            <button
                                type="button"
                                data-cy="purple-900"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-purple-900"
                                onClick={() => select('purple-900')}
                            />
                            <button
                                type="button"
                                data-cy="fuchsia-900"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-fuchsia-900"
                                onClick={() => select('fuchsia-900')}
                            />
                            <button
                                type="button"
                                data-cy="pink-900"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-pink-900"
                                onClick={() => select('pink-900')}
                            />
                            <button
                                type="button"
                                data-cy="rose-900"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-rose-900"
                                onClick={() => select('rose-900')}
                            />
                            <button
                                type="button"
                                data-cy="slate-900"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-slate-900"
                                onClick={() => select('slate-900')}
                            />
                            <button
                                type="button"
                                data-cy="gray-900"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-gray-900"
                                onClick={() => select('gray-900')}
                            />
                            <button
                                type="button"
                                data-cy="zinc-900"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-zinc-900"
                                onClick={() => select('zinc-900')}
                            />
                            <button
                                type="button"
                                data-cy="neutral-900"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-neutral-900"
                                onClick={() => select('neutral-900')}
                            />
                            <button
                                type="button"
                                data-cy="stone-900"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-stone-900"
                                onClick={() => select('stone-900')}
                            />
                            <button
                                type="button"
                                data-cy="taupe-900"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-taupe-900"
                                onClick={() => select('taupe-900')}
                            />
                            <button
                                type="button"
                                data-cy="mauve-900"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-mauve-900"
                                onClick={() => select('mauve-900')}
                            />
                            <button
                                type="button"
                                data-cy="mist-900"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-mist-900"
                                onClick={() => select('mist-900')}
                            />
                            <button
                                type="button"
                                data-cy="olive-900"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-olive-900"
                                onClick={() => select('olive-900')}
                            />
                            <button
                                type="button"
                                data-cy="red-950"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-red-950"
                                onClick={() => select('red-950')}
                            />
                            <button
                                type="button"
                                data-cy="orange-950"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-orange-950"
                                onClick={() => select('orange-950')}
                            />
                            <button
                                type="button"
                                data-cy="amber-950"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-amber-950"
                                onClick={() => select('amber-950')}
                            />
                            <button
                                type="button"
                                data-cy="yellow-950"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-yellow-950"
                                onClick={() => select('yellow-950')}
                            />
                            <button
                                type="button"
                                data-cy="lime-950"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-lime-950"
                                onClick={() => select('lime-950')}
                            />
                            <button
                                type="button"
                                data-cy="green-950"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-green-950"
                                onClick={() => select('green-950')}
                            />
                            <button
                                type="button"
                                data-cy="emerald-950"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-emerald-950"
                                onClick={() => select('emerald-950')}
                            />
                            <button
                                type="button"
                                data-cy="teal-950"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-teal-950"
                                onClick={() => select('teal-950')}
                            />
                            <button
                                type="button"
                                data-cy="cyan-950"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-cyan-950"
                                onClick={() => select('cyan-950')}
                            />
                            <button
                                type="button"
                                data-cy="sky-950"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-sky-950"
                                onClick={() => select('sky-950')}
                            />
                            <button
                                type="button"
                                data-cy="blue-950"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-blue-950"
                                onClick={() => select('blue-950')}
                            />
                            <button
                                type="button"
                                data-cy="indigo-950"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-indigo-950"
                                onClick={() => select('indigo-950')}
                            />
                            <button
                                type="button"
                                data-cy="violet-950"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-violet-950"
                                onClick={() => select('violet-950')}
                            />
                            <button
                                type="button"
                                data-cy="purple-950"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-purple-950"
                                onClick={() => select('purple-950')}
                            />
                            <button
                                type="button"
                                data-cy="fuchsia-950"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-fuchsia-950"
                                onClick={() => select('fuchsia-950')}
                            />
                            <button
                                type="button"
                                data-cy="pink-950"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-pink-950"
                                onClick={() => select('pink-950')}
                            />
                            <button
                                type="button"
                                data-cy="rose-950"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-rose-950"
                                onClick={() => select('rose-950')}
                            />
                            <button
                                type="button"
                                data-cy="slate-950"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-slate-950"
                                onClick={() => select('slate-950')}
                            />
                            <button
                                type="button"
                                data-cy="gray-950"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-gray-950"
                                onClick={() => select('gray-950')}
                            />
                            <button
                                type="button"
                                data-cy="zinc-950"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-zinc-950"
                                onClick={() => select('zinc-950')}
                            />
                            <button
                                type="button"
                                data-cy="neutral-950"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-neutral-950"
                                onClick={() => select('neutral-950')}
                            />
                            <button
                                type="button"
                                data-cy="stone-950"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-stone-950"
                                onClick={() => select('stone-950')}
                            />
                            <button
                                type="button"
                                data-cy="taupe-950"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-taupe-950"
                                onClick={() => select('taupe-950')}
                            />
                            <button
                                type="button"
                                data-cy="mauve-950"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-mauve-950"
                                onClick={() => select('mauve-950')}
                            />
                            <button
                                type="button"
                                data-cy="mist-950"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-mist-950"
                                onClick={() => select('mist-950')}
                            />
                            <button
                                type="button"
                                data-cy="olive-950"
                                className="size-4 cursor-pointer rounded-sm hover:scale-125 aria-pressed:ring-2 aria-pressed:ring-white bg-olive-950"
                                onClick={() => select('olive-950')}
                            />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

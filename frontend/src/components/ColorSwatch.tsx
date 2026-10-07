export function ColorSwatch({color}: {color: string}) {
    return (
        <span className="flex items-center gap-2">
            <span className={'block size-4 rounded-full bg-' + color} />
            {color}
        </span>
    );
}

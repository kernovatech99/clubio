import {libsane, SANEStatus, ScanImageReader, ScanOptionsMutable} from 'sane-wasm';

// Nur für Tests: Anzahl der virtuellen Scanner des SANE-Test-Backends, die ohne USB-Gerät auskommen.
const testDevices = Number(import.meta.env.VITE_SCAN_TEST_DEVICES ?? 0);
const resolution = 150;

let libPromise = null;
// Der Browser merkt sich freigegebene USB-Geräte. War kein Scanner darunter, fragen wir beim nächsten Versuch erneut.
let askForDevice = false;

function loadLib() {
    libPromise ??= libsane({sane: {loaderURL: new URL(`${import.meta.env.BASE_URL}sane-wasm`, location.origin).href, debugTestDevices: testDevices}})
        .then((lib) => {
            lib.sane_init();
            return lib;
        })
        .catch((error) => {
            libPromise = null;
            throw error;
        });

    return libPromise;
}

// Muss direkt im Klick-Handler laufen, da der Browser die Geräteauswahl nur nach einer Benutzeraktion öffnet.
async function requestUsbDevice() {
    if (!navigator.usb) {
        throw new Error('Dieser Browser kann nicht auf USB-Scanner zugreifen. Bitte Chrome oder Edge verwenden.');
    }
    if (!askForDevice && (await navigator.usb.getDevices()).length > 0) {
        return;
    }
    try {
        await navigator.usb.requestDevice({filters: []});
    } catch {
        throw new Error('Es wurde kein Scanner ausgewählt.');
    }
}

function toJpeg({pixels_per_line: width, lines: height}, data) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    canvas.getContext('2d').putImageData(new ImageData(data, width, height), 0, 0);
    return canvas.toDataURL('image/jpeg', 0.85);
}

// Scannt eine Seite mit dem ersten gefundenen Scanner und liefert sie als JPEG (Data-URL).
export async function scanDocument() {
    if (typeof SharedArrayBuffer === 'undefined') {
        throw new Error('Scannen ist auf dieser Seite nicht möglich, da sie nicht "cross-origin isolated" ausgeliefert wird.');
    }
    if (!testDevices) {
        await requestUsbDevice();
    }

    const lib = await loadLib();
    const {devices} = await lib.sane_get_devices();
    if (!devices?.length) {
        askForDevice = true;
        throw new Error('Es wurde kein Scanner gefunden.');
    }
    askForDevice = false;

    const {status} = await lib.sane_open(devices[0].name);
    if (status !== SANEStatus.GOOD) {
        throw new Error(`Der Scanner ${devices[0].vendor} ${devices[0].model} konnte nicht geöffnet werden (${lib.sane_strstatus(status)}).`);
    }

    try {
        const options = await ScanOptionsMutable.get(lib);
        if (options.resolution) {
            // Unterstützt der Scanner die Auflösung nicht, bleibt es bei seiner Voreinstellung
            await options.setValue(options.resolution.index, resolution);
        }

        const reader = new ScanImageReader(lib);
        let image = null;
        reader.on('image', (parameters, data) => {
            image = toJpeg(parameters, data);
        });
        const {promise} = await reader.start();
        await promise;

        return image;
    } catch (error) {
        throw new Error(`Das Scannen ist fehlgeschlagen (${error.message}).`, {cause: error});
    } finally {
        await lib.sane_close();
    }
}

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import flowbiteReact from 'flowbite-react/plugin/vite';
import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {defineConfig} from 'vite';

const saneFiles = {
    'libsane.js': 'text/javascript',
    'libsane.worker.js': 'text/javascript',
    'libsane.wasm': 'application/wasm',
};

function readSaneFile(name) {
    return readFileSync(fileURLToPath(new URL(`./node_modules/sane-wasm/build/${name}`, import.meta.url)));
}

// sane-wasm benötigt SharedArrayBuffer, den der Browser nur auf "cross-origin isolated" Seiten bereitstellt.
const crossOriginIsolation = {
    'Cross-Origin-Opener-Policy': 'same-origin',
    'Cross-Origin-Embedder-Policy': 'require-corp',
};

// Nicht über server.headers, da Vite diese bei "304 Not Modified" weglässt und der Browser dann eine
// zwischengespeicherte Seite ohne die Header weiterverwendet.
function isolate(server) {
    server.middlewares.use((_req, res, next) => {
        for (const [name, value] of Object.entries(crossOriginIsolation)) {
            res.setHeader(name, value);
        }
        next();
    });
}

// sane-wasm lädt seine Dateien zur Laufzeit nach. Statt vom CDN liefern wir sie selbst unter /sane-wasm aus.
function saneWasm() {
    return {
        name: 'sane-wasm',
        configureServer(server) {
            isolate(server);
            server.middlewares.use('/sane-wasm', (req, res, next) => {
                const name = req.url.split('?')[0].slice(1);
                if (!(name in saneFiles)) {
                    next();
                    return;
                }
                res.setHeader('Content-Type', saneFiles[name]);
                res.end(readSaneFile(name));
            });
        },
        configurePreviewServer: isolate,
        generateBundle() {
            for (const name of Object.keys(saneFiles)) {
                this.emitFile({type: 'asset', fileName: `sane-wasm/${name}`, source: readSaneFile(name)});
            }
        },
    };
}

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss(), flowbiteReact(), saneWasm()],
});

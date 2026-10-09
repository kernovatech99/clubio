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

// sane-wasm lädt seine Dateien zur Laufzeit nach. Statt vom CDN liefern wir sie selbst unter /sane-wasm aus.
function saneWasm() {
    return {
        name: 'sane-wasm',
        configureServer(server) {
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
        generateBundle() {
            for (const name of Object.keys(saneFiles)) {
                this.emitFile({type: 'asset', fileName: `sane-wasm/${name}`, source: readSaneFile(name)});
            }
        },
    };
}

// sane-wasm benötigt SharedArrayBuffer, den der Browser nur auf "cross-origin isolated" Seiten bereitstellt.
const crossOriginIsolation = {
    'Cross-Origin-Opener-Policy': 'same-origin',
    'Cross-Origin-Embedder-Policy': 'require-corp',
};

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss(), flowbiteReact(), saneWasm()],
    server: {headers: crossOriginIsolation},
    preview: {headers: crossOriginIsolation},
});

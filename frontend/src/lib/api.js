const API_URL = (import.meta.env.VITE_API_URL ?? '').replace(/\/+$/, '');

// Wrapper around fetch that prefixes every request with the backend base URL
export function apiFetch(path, options) {
    return fetch(`${API_URL}${path.startsWith('/') ? path : `/${path}`}`, options);
}

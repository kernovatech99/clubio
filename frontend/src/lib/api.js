const API_URL = (import.meta.env.VITE_API_URL ?? '').replace(/\/+$/, '');

// Prefixes a path with the backend base URL
export function apiUrl(path) {
    return `${API_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

// Wrapper around fetch that prefixes every request with the backend base URL
export function apiFetch(path, options) {
    return fetch(apiUrl(path), options);
}

const BASE_URL = '/api/backend/content/types';

async function _request(path, options = {}) {
    const response = await fetch(`${BASE_URL}${path}`, {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        ...options
    });

    if (!response.ok) {
        let errorPayload = null;
        try {
            errorPayload = await response.json();
        } catch (parseError) {
            errorPayload = null;
        }

        const message = errorPayload?.error || `Request failed with status ${response.status}`;
        const error = new Error(message);
        error.status = response.status;
        error.details = errorPayload?.details || {};
        throw error;
    }

    if (response.status === 204) {
        return null;
    }

    return response.json();
}

export function listContentTypes({ page = 0, size = 20 } = {}) {
    const query = new URLSearchParams({ page: String(page), size: String(size) });
    return _request(`?${query.toString()}`);
}

export function getContentType(id) {
    return _request(`/${id}`);
}

export function createContentType(payload) {
    return _request('', {
        method: 'POST',
        body: JSON.stringify(payload)
    });
}

export function updateContentType(id, payload) {
    return _request(`/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload)
    });
}

export const CONTENT_FIELD_TYPES = [
    'TEXT',
    'RICH_TEXT',
    'NUMBER',
    'BOOLEAN',
    'DATE',
    'DATETIME',
    'JSON',
    'REFERENCE'
];

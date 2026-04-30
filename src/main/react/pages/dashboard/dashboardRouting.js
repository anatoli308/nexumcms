export function toViewSlug(viewLabel) {
    return viewLabel
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-');
}

export function buildSectionPath(sectionKey, viewLabel) {
    if (!viewLabel) {
        return `/backend/${sectionKey}`;
    }

    return `/backend/${sectionKey}/${toViewSlug(viewLabel)}`;
}

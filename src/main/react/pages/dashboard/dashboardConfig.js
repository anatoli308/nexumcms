export const drawerWidth = 240;
export const topbarHeight = 44;
export const brandLogoSrc = '/brand/nexum-logo-dark.png';
export const brandMarkSrc = '/brand/nexum-monogram-light.png';

export const navigationItems = [
    { key: 'dashboard', label: 'Dashboard', icon: 'grid' },
    { key: 'dokumente', label: 'Dokumente', icon: 'doc' },
    { key: 'mam', label: 'MAM', icon: 'image' },
    { key: 'struktur', label: 'Struktur', icon: 'tree' },
    { key: 'system', label: 'System', icon: 'settings' },
    { key: 'workflow', label: 'Workflow', icon: 'flow' }
];

export const sectionViews = {
    dashboard: ['Uebersicht', 'Aktivitaet'],
    dokumente: ['Seitenbaum', 'Entwuerfe'],
    mam: ['Bibliothek', 'Metadaten'],
    struktur: ['Navigation', 'Templates'],
    system: ['Benutzerkonto', 'Rollen'],
    workflow: ['Freigaben', 'Versionen']
};

export const sectionDescriptions = {
    dashboard: 'Die Shell steht jetzt wie im CMS-Vorbild: oben eine schmale Utility-Bar, links die Admin-Navigation und rechts die eigentliche Arbeitsflaeche.',
    dokumente: 'Seiten, Komponenten und Inhaltsobjekte koennen spaeter in genau diese Shell einziehen, ohne dass du die Bedienlogik neu strukturieren musst.',
    mam: 'Medien, Tags und Referenzen profitieren von derselben Topbar, derselben Suche und derselben linken Bereichssteuerung.',
    struktur: 'Templates, Slots und Navigationsbaeume brauchen frueh eine feste Umgebung, damit das Backend spaeter nicht zerfasert.',
    system: 'Benutzer, Rollen und Space-Konfiguration passen besonders gut in ein klassisches Admin-Layout mit Utility-Bar und Bereichsleiste.',
    workflow: 'Freigaben, Statuswechsel und Versionen lassen sich sauber in dieser Shell andocken, ohne neue Navigationsebene zu erfinden.'
};

export const nextBackendSlice = {
    dashboard: 'Content service fuer Seiten, Komponenten und Slots',
    dokumente: 'Entity- und DTO-Modell fuer Content Nodes und Baumstruktur',
    mam: 'Media service fuer Assets, Tags und Referenzen',
    struktur: 'Template- und Slot-Verwaltung im Service-Layer',
    system: 'Rollen, Rechte und Space-Mapping im Backend',
    workflow: 'Freigabe- und Publikationslogik mit Statusmodell'
};

export const moduleHighlights = [
    'Content service fuer Seiten und Module',
    'Media library mit Asset-Referenzen',
    'Freigabe-Queue mit Statuswechseln',
    'Rollen- und Rechteverwaltung je Space'
];

export const recentEvents = [
    { title: 'Startseite Fruehjahr', detail: 'vor 18 min aktualisiert' },
    { title: 'Landingpage Karriere', detail: 'Metadaten und Route angepasst' },
    { title: 'Produktdetail X200', detail: 'Asset-Referenzen synchronisiert' },
    { title: 'Systemrolle Redakteur', detail: 'Rechteprofil vorbereitet' }
];
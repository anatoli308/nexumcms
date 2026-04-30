import { darken, lighten } from '@mui/material/styles';

export const THEME_PRESETS = [
    { key: 'blue', label: 'Blue' },
    { key: 'teal', label: 'Teal' },
    { key: 'aubergine', label: 'Aubergine' },
    { key: 'peach', label: 'Peach' }
];

const PRESET_COLORS = {
    blue: {
        primary: '#007BFF',
        secondary: '#00D1FF'
    },
    teal: {
        primary: '#0E8A8A',
        secondary: '#FFD700'
    },
    aubergine: {
        primary: '#6E4A86',
        secondary: '#A8B828'
    },
    peach: {
        primary: '#C7742E',
        secondary: '#40826D'
    }
};

function getPresetColors(presetKey) {
    return PRESET_COLORS[presetKey] ?? PRESET_COLORS.blue;
}

function getSurfaceTokens(mode) {
    if (mode === 'dark') {
        return {
            backgroundDefault: '#0D1117',
            backgroundPaper: '#161B22',
            textPrimary: '#F0F6FC',
            textSecondary: '#A5B0BF',
            divider: 'rgba(240, 246, 252, 0.16)',
            shellTopbar: '#090D14',
            shellTopbarText: '#F0F6FC',
            shellSidebar: '#0B121C',
            shellSidebarText: '#F0F6FC',
            shellSidebarActive: '#172536',
            shellSidebarHover: '#122031',
            shellSidebarSubtle: '#8CA2BC',
            panelMuted: '#111A26',
            searchBackground: 'rgba(255,255,255,0.08)',
            searchBorder: 'rgba(255,255,255,0.24)'
        };
    }

    return {
        backgroundDefault: '#F5F8FC',
        backgroundPaper: '#FFFFFF',
        textPrimary: '#132033',
        textSecondary: '#4F647F',
        divider: '#D9E0EA',
        shellTopbar: '#FFFFFF',
        shellTopbarText: '#132033',
        shellSidebar: '#F4F7FB',
        shellSidebarText: '#132033',
        shellSidebarActive: '#E6EEF8',
        shellSidebarHover: '#EDF3FA',
        shellSidebarSubtle: '#607A9C',
        panelMuted: '#EEF3FA',
        searchBackground: '#FFFFFF',
        searchBorder: '#D0DBE8'
    };
}

export default function createPalette({ mode = 'light', preset = 'blue' } = {}) {
    const presetColors = getPresetColors(preset);
    const surfaces = getSurfaceTokens(mode);

    return {
        mode,
        primary: {
            main: presetColors.primary,
            light: lighten(presetColors.primary, 0.22),
            dark: darken(presetColors.primary, 0.2),
            contrastText: '#FFFFFF'
        },
        secondary: {
            main: presetColors.secondary,
            light: lighten(presetColors.secondary, 0.22),
            dark: darken(presetColors.secondary, 0.2),
            contrastText: '#FFFFFF'
        },
        success: {
            main: '#2E7D32'
        },
        warning: {
            main: '#ED6C02'
        },
        error: {
            main: '#D32F2F'
        },
        background: {
            default: surfaces.backgroundDefault,
            paper: surfaces.backgroundPaper
        },
        text: {
            primary: surfaces.textPrimary,
            secondary: surfaces.textSecondary
        },
        divider: surfaces.divider,
        custom: {
            shellTopbar: surfaces.shellTopbar,
            shellTopbarText: surfaces.shellTopbarText,
            shellSidebar: surfaces.shellSidebar,
            shellSidebarText: surfaces.shellSidebarText,
            shellSidebarActive: surfaces.shellSidebarActive,
            shellSidebarHover: surfaces.shellSidebarHover,
            shellSidebarSubtle: surfaces.shellSidebarSubtle,
            panelMuted: surfaces.panelMuted,
            searchBackground: surfaces.searchBackground,
            searchBorder: surfaces.searchBorder
        }
    };
}

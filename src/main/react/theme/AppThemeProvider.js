import React from 'react';
import { CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material';

import createAppTheme from './createAppTheme';
import { THEME_PRESETS } from './palette';
import ThemeSettingsContext from './ThemeSettingsContext';

const STORAGE_MODE_KEY = 'nexumcms.theme.mode';
const STORAGE_PRESET_KEY = 'nexumcms.theme.preset';

function isValidMode(value) {
    return value === 'light' || value === 'dark';
}

function isValidPreset(value) {
    return THEME_PRESETS.some((preset) => preset.key === value);
}

export default function AppThemeProvider({ children }) {
    const [mode, setMode] = React.useState('light');
    const [preset, setPreset] = React.useState('blue');

    React.useEffect(() => {
        try {
            const storedMode = window.localStorage.getItem(STORAGE_MODE_KEY);
            const storedPreset = window.localStorage.getItem(STORAGE_PRESET_KEY);

            if (isValidMode(storedMode)) {
                setMode(storedMode);
            }

            if (isValidPreset(storedPreset)) {
                setPreset(storedPreset);
            }
        } catch (error) {
            // Ignore storage issues and continue with defaults.
        }
    }, []);

    React.useEffect(() => {
        try {
            window.localStorage.setItem(STORAGE_MODE_KEY, mode);
            window.localStorage.setItem(STORAGE_PRESET_KEY, preset);
        } catch (error) {
            // Ignore storage issues and continue in-memory.
        }
    }, [mode, preset]);

    const toggleMode = React.useCallback(() => {
        setMode((currentMode) => (currentMode === 'light' ? 'dark' : 'light'));
    }, []);

    const applyPreset = React.useCallback((nextPreset) => {
        if (isValidPreset(nextPreset)) {
            setPreset(nextPreset);
        }
    }, []);

    const theme = React.useMemo(() => createAppTheme({ mode, preset }), [mode, preset]);

    const contextValue = React.useMemo(
        () => ({
            mode,
            preset,
            setPreset: applyPreset,
            toggleMode,
            presetOptions: THEME_PRESETS
        }),
        [mode, preset, applyPreset, toggleMode]
    );

    return (
        <ThemeSettingsContext.Provider value={contextValue}>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    {children}
                </ThemeProvider>
            </StyledEngineProvider>
        </ThemeSettingsContext.Provider>
    );
}

import React from 'react';

const ThemeSettingsContext = React.createContext({
    mode: 'light',
    preset: 'blue',
    presetOptions: [],
    toggleMode: () => {},
    setPreset: () => {}
});

export function useThemeSettings() {
    return React.useContext(ThemeSettingsContext);
}

export default ThemeSettingsContext;

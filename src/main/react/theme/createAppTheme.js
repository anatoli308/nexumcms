import { createTheme, responsiveFontSizes } from '@mui/material/styles';

import components from './components';
import createPalette from './palette';
import typography from './typography';

export default function createAppTheme({ mode = 'light', preset = 'blue' } = {}) {
    let theme = createTheme({
        palette: createPalette({ mode, preset }),
        typography,
        shape: {
            borderRadius: 12
        },
        spacing: 8,
        components
    });

    theme = responsiveFontSizes(theme, {
        breakpoints: ['sm', 'md', 'lg']
    });

    return theme;
}
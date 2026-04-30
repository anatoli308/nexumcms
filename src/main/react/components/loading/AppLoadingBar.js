import React from 'react';
import { Box, LinearProgress, useMediaQuery } from '@mui/material';

import { useAppLoading } from './AppLoadingProvider';

export default function AppLoadingBar() {
    const { isLoading, pendingCount } = useAppLoading();
    const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

    if (!isLoading) {
        return null;
    }

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                right: 0,
                left: 0,
                zIndex: (muiTheme) => muiTheme.zIndex.tooltip + 1
            }}
        >
            <LinearProgress
                variant={prefersReducedMotion ? 'determinate' : 'indeterminate'}
                value={prefersReducedMotion ? 100 : undefined}
                aria-label={`Global loading progress. Active requests: ${pendingCount}`}
            />
        </Box>
    );
}

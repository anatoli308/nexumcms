import React from 'react';
import {
    AppBar,
    Box,
    Button,
    Chip,
    FormControl,
    IconButton,
    InputBase,
    MenuItem,
    Select,
    Stack,
    Toolbar,
    Tooltip,
    Typography
} from '@mui/material';

import Iconify from '../../../components/utils/Iconify';
import { dashboardBrand, dashboardTopActions, dashboardTopbarHeight } from '../dashboardConfig';

export default function DashboardTopbar({
    mode,
    preset,
    presetOptions,
    searchQuery,
    onSearchQueryChange,
    onDrawerToggle,
    onPresetChange,
    onToggleMode
}) {
    const isDarkMode = mode === 'dark';

    return (
        <AppBar
            position="fixed"
            color="transparent"
            sx={{
                height: dashboardTopbarHeight,
                justifyContent: 'center',
                bgcolor: (muiTheme) => muiTheme.palette.custom.shellTopbar,
                borderBottom: (muiTheme) => `1px solid ${muiTheme.palette.divider}`
            }}
        >
            <Toolbar sx={{ minHeight: `${dashboardTopbarHeight}px !important`, px: { xs: 1.5, md: 2 } }}>
                <Button
                    variant="text"
                    onClick={onDrawerToggle}
                    aria-label="Toggle navigation menu"
                    sx={{
                        minWidth: 0,
                        mr: 1,
                        display: { xs: 'inline-flex', md: 'none' },
                        color: (muiTheme) => muiTheme.palette.custom.shellTopbarText
                    }}
                >
                    <Iconify icon="solar:hamburger-menu-outline" sx={{ width: 20, height: 20 }} />
                </Button>

                <Stack direction="row" spacing={1.25} sx={{ alignItems: 'center' }}>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            color: (muiTheme) => muiTheme.palette.custom.shellTopbarText,
                            fontWeight: 700
                        }}
                    >
                        {dashboardBrand.name}
                    </Typography>
                    <Chip size="small" color="primary" label={`${mode} / ${preset}`} />
                </Stack>

                <Box sx={{ flexGrow: 1 }} />

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: { xs: 170, sm: 220, lg: 260 },
                        borderRadius: 2,
                        px: 1,
                        border: (muiTheme) => `1px solid ${muiTheme.palette.custom.searchBorder}`,
                        bgcolor: (muiTheme) => muiTheme.palette.custom.searchBackground
                    }}
                >
                    <Iconify
                        icon="solar:magnifier-outline"
                        sx={{ width: 18, height: 18, color: (muiTheme) => muiTheme.palette.text.secondary }}
                    />
                    <InputBase
                        value={searchQuery}
                        onChange={(event) => onSearchQueryChange(event.target.value)}
                        placeholder="Search"
                        inputProps={{ 'aria-label': 'Search dashboard' }}
                        sx={{
                            py: 0.5,
                            pl: 1,
                            color: (muiTheme) => muiTheme.palette.text.primary,
                            fontSize: 14,
                            width: '100%'
                        }}
                    />
                </Box>

                <Stack direction="row" spacing={0.5} sx={{ ml: 1 }}>
                    {dashboardTopActions.map((item) => (
                        <Tooltip key={item.key} title={item.label}>
                            <IconButton
                                size="small"
                                sx={{ color: (muiTheme) => muiTheme.palette.custom.shellTopbarText }}
                                aria-label={item.label}
                            >
                                <Iconify icon={item.icon} sx={{ width: 19, height: 19 }} />
                            </IconButton>
                        </Tooltip>
                    ))}
                </Stack>

                <FormControl size="small" sx={{ ml: 1.25, minWidth: 118 }}>
                    <Select
                        value={preset}
                        onChange={onPresetChange}
                        sx={{
                            height: 34,
                            color: (muiTheme) => muiTheme.palette.custom.shellTopbarText,
                            borderRadius: 1.5,
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: (muiTheme) => muiTheme.palette.custom.searchBorder
                            },
                            '& .MuiSvgIcon-root': {
                                color: (muiTheme) => muiTheme.palette.custom.shellTopbarText
                            }
                        }}
                    >
                        {presetOptions.map((option) => (
                            <MenuItem key={option.key} value={option.key}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Tooltip title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}>
                    <IconButton
                        onClick={onToggleMode}
                        sx={{ ml: 0.75, color: (muiTheme) => muiTheme.palette.custom.shellTopbarText }}
                        aria-label="Toggle theme mode"
                    >
                        <Iconify icon={isDarkMode ? 'solar:sun-outline' : 'solar:moon-outline'} sx={{ width: 20, height: 20 }} />
                    </IconButton>
                </Tooltip>
            </Toolbar>
        </AppBar>
    );
}

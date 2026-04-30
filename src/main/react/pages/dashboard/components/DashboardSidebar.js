import React from 'react';
import {
    Box,
    Button,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    Paper,
    Stack,
    Typography,
    useTheme
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';

import Iconify from '../../../components/utils/Iconify';
import {
    dashboardBrand,
    dashboardDrawerWidth,
    dashboardNavigation,
    dashboardTopbarHeight,
    dashboardViewsBySection
} from '../dashboardConfig';
import { buildSectionPath } from '../dashboardRouting';

export default function DashboardSidebar({
    mode,
    isDesktop,
    mobileOpen,
    activeSection,
    activeView,
    onDrawerToggle,
    onSectionLinkClick,
    onViewSelect
}) {
    const theme = useTheme();
    const [logoLoadFailed, setLogoLoadFailed] = React.useState(false);
    const [markLoadFailed, setMarkLoadFailed] = React.useState(false);

    const isDarkMode = mode === 'dark';
    const brandLogoSrc = isDarkMode ? dashboardBrand.logoSrcDark : dashboardBrand.logoSrcLight;
    const brandMarkSrc = isDarkMode ? dashboardBrand.markSrcDark : dashboardBrand.markSrcLight;
    const activeViews = dashboardViewsBySection[activeSection] ?? [];

    React.useEffect(() => {
        setLogoLoadFailed(false);
        setMarkLoadFailed(false);
    }, [brandLogoSrc, brandMarkSrc]);

    const sidebarContent = (
        <Box
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                color: (muiTheme) => muiTheme.palette.custom.shellSidebarText,
                bgcolor: (muiTheme) => muiTheme.palette.custom.shellSidebar
            }}
        >
            <Box sx={{ px: 2.25, py: 1.75 }}>
                {logoLoadFailed ? (
                    <Typography
                        variant="h6"
                        sx={{
                            color: (muiTheme) => muiTheme.palette.custom.shellSidebarText,
                            letterSpacing: '0.02em'
                        }}
                    >
                        {dashboardBrand.name}
                    </Typography>
                ) : (
                    <Box
                        component="img"
                        src={brandLogoSrc}
                        alt="Nexum CMS"
                        onError={() => setLogoLoadFailed(true)}
                        sx={{
                            display: 'block',
                            width: '100%',
                            maxWidth: 170,
                            objectFit: 'contain'
                        }}
                    />
                )}
                <Typography variant="caption" sx={{ display: 'block', mt: 0.75, color: (muiTheme) => muiTheme.palette.custom.shellSidebarSubtle }}>
                    {dashboardBrand.environmentLabel}
                </Typography>
            </Box>

            <Divider sx={{ borderColor: alpha(theme.palette.custom.shellSidebarSubtle, 0.3) }} />

            <List disablePadding sx={{ py: 1.25 }}>
                {dashboardNavigation.map((item) => {
                    const selected = item.key === activeSection;
                    return (
                        <ListItem key={item.key} disablePadding>
                            <ListItemButton
                                component={RouterLink}
                                to={buildSectionPath(item.key, dashboardViewsBySection[item.key]?.[0] ?? '')}
                                selected={selected}
                                onClick={onSectionLinkClick}
                                sx={{
                                    py: 1.25,
                                    px: 1.75,
                                    borderLeft: '3px solid',
                                    borderLeftColor: selected ? 'primary.main' : 'transparent',
                                    bgcolor: selected ? (muiTheme) => muiTheme.palette.custom.shellSidebarActive : 'transparent',
                                    '&:hover': {
                                        bgcolor: (muiTheme) => muiTheme.palette.custom.shellSidebarHover
                                    },
                                    '&.Mui-selected:hover': {
                                        bgcolor: (muiTheme) => muiTheme.palette.custom.shellSidebarActive
                                    }
                                }}
                            >
                                <Stack direction="row" spacing={1.25} sx={{ alignItems: 'center' }}>
                                    <Iconify icon={item.icon} sx={{ width: 18, height: 18 }} />
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: (muiTheme) => muiTheme.palette.custom.shellSidebarText,
                                            fontWeight: selected ? 700 : 500
                                        }}
                                    >
                                        {item.label}
                                    </Typography>
                                </Stack>
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>

            {activeViews.length > 0 ? (
                <Box sx={{ px: 1.5, pb: 2 }}>
                    <Typography
                        variant="overline"
                        sx={{
                            px: 1,
                            color: (muiTheme) => muiTheme.palette.custom.shellSidebarSubtle,
                            letterSpacing: '0.08em'
                        }}
                    >
                        Views
                    </Typography>
                    <Stack spacing={0.5} sx={{ mt: 0.5 }}>
                        {activeViews.map((view) => {
                            const selected = view === activeView;
                            return (
                                <Button
                                    key={view}
                                    fullWidth
                                    onClick={() => onViewSelect(view)}
                                    sx={{
                                        justifyContent: 'flex-start',
                                        color: selected
                                            ? (muiTheme) => muiTheme.palette.custom.shellSidebarText
                                            : (muiTheme) => muiTheme.palette.custom.shellSidebarSubtle,
                                        bgcolor: selected ? (muiTheme) => muiTheme.palette.custom.shellSidebarActive : 'transparent',
                                        '&:hover': {
                                            bgcolor: (muiTheme) => muiTheme.palette.custom.shellSidebarHover
                                        }
                                    }}
                                >
                                    {view}
                                </Button>
                            );
                        })}
                    </Stack>
                </Box>
            ) : null}

            <Box sx={{ mt: 'auto', p: 2 }}>
                <Paper
                    sx={{
                        p: 1.5,
                        borderColor: alpha(theme.palette.custom.shellSidebarSubtle, 0.3),
                        bgcolor: alpha(theme.palette.custom.shellSidebarSubtle, 0.12)
                    }}
                >
                    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                        {markLoadFailed ? (

                            <Iconify icon="solar:shield-check-outline" sx={{ width: 20, height: 20 }} />
                        ) : (
                            <Box
                                component="img"
                                src={brandMarkSrc}
                                alt="Nexum Mark"
                                onError={() => setMarkLoadFailed(true)}
                                sx={{ width: 24, height: 24, objectFit: 'contain' }}
                            />
                        )}
                        <Typography
                            variant="body2"
                            sx={{
                                color: (muiTheme) => muiTheme.palette.custom.shellSidebarText,
                                fontWeight: 600
                            }}
                        >
                            Enterprise Starter
                        </Typography>
                    </Stack>
                </Paper>
            </Box>
        </Box>
    );

    return (
        <Box component="nav" sx={{ width: { md: dashboardDrawerWidth }, flexShrink: { md: 0 } }} aria-label="dashboard sections">
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={onDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': {
                        width: dashboardDrawerWidth,
                        top: dashboardTopbarHeight,
                        height: `calc(100% - ${dashboardTopbarHeight}px)`,
                        bgcolor: (muiTheme) => muiTheme.palette.custom.shellSidebar
                    }
                }}
            >
                {sidebarContent}
            </Drawer>

            <Drawer
                variant="permanent"
                open
                sx={{
                    display: { xs: 'none', md: 'block' },
                    '& .MuiDrawer-paper': {
                        width: dashboardDrawerWidth,
                        top: dashboardTopbarHeight,
                        height: `calc(100% - ${dashboardTopbarHeight}px)`,
                        bgcolor: (muiTheme) => muiTheme.palette.custom.shellSidebar
                    }
                }}
            >
                {sidebarContent}
            </Drawer>
        </Box>
    );
}

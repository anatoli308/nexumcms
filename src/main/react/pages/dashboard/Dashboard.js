import React from 'react';
import {
    AppBar,
    Box,
    Button,
    Chip,
    Divider,
    Drawer,
    FormControl,
    IconButton,
    InputBase,
    List,
    ListItem,
    ListItemButton,
    MenuItem,
    Paper,
    Select,
    Stack,
    Toolbar,
    Tooltip,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';

import Iconify from '../../components/utils/Iconify';
import { useThemeSettings } from '../../theme/ThemeSettingsContext';
import {
    dashboardBrand,
    dashboardDrawerWidth,
    dashboardNavigation,
    dashboardQuickActions,
    dashboardRecentActivity,
    dashboardSectionMeta,
    dashboardStats,
    dashboardTopActions,
    dashboardTopbarHeight,
    dashboardViewsBySection
} from './dashboardConfig';

function toViewSlug(viewLabel) {
    return viewLabel
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-');
}

function buildSectionPath(sectionKey, viewLabel) {
    if (!viewLabel) {
        return `/backend/${sectionKey}`;
    }

    return `/backend/${sectionKey}/${toViewSlug(viewLabel)}`;
}

function StarterCard({ title, children, action }) {
    return (
        <Paper sx={{ p: 3, borderColor: 'divider', bgcolor: 'background.paper' }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
                <Typography variant="h6">{title}</Typography>
                {action}
            </Stack>
            <Box sx={{ mt: 2 }}>{children}</Box>
        </Paper>
    );
}

export default function Dashboard() {
    const theme = useTheme();
    const isDesktop = useMediaQuery((muiTheme) => muiTheme.breakpoints.up('md'));
    const navigate = useNavigate();
    const { section, view } = useParams();

    const { mode, preset, presetOptions, setPreset, toggleMode } = useThemeSettings();

    const isKnownSection = dashboardNavigation.some((item) => item.key === section);
    const activeSection = isKnownSection ? section : dashboardNavigation[0].key;
    const activeViews = dashboardViewsBySection[activeSection] ?? [];
    const defaultView = activeViews[0] ?? '';
    const activeViewBySlug = React.useMemo(
        () =>
            activeViews.reduce((acc, label) => {
                acc[toViewSlug(label)] = label;
                return acc;
            }, {}),
        [activeViews]
    );
    const isKnownView = Boolean(view && activeViewBySlug[view]);
    const activeView = isKnownView ? activeViewBySlug[view] : defaultView;

    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [logoLoadFailed, setLogoLoadFailed] = React.useState(false);
    const [markLoadFailed, setMarkLoadFailed] = React.useState(false);

    const isDarkMode = mode === 'dark';
    const brandLogoSrc = isDarkMode ? dashboardBrand.logoSrcDark : dashboardBrand.logoSrcLight;
    const brandMarkSrc = isDarkMode ? dashboardBrand.markSrcDark : dashboardBrand.markSrcLight;

    React.useEffect(() => {
        setLogoLoadFailed(false);
        setMarkLoadFailed(false);
    }, [brandLogoSrc, brandMarkSrc]);

    React.useEffect(() => {
        if (section && !isKnownSection) {
            navigate(buildSectionPath('dashboard', dashboardViewsBySection.dashboard?.[0] ?? ''), { replace: true });
            return;
        }

        if (!activeViews.length) {
            return;
        }

        if (!view || !isKnownView) {
            navigate(buildSectionPath(activeSection, defaultView), { replace: true });
        }
    }, [section, view, isKnownSection, activeSection, activeViews.length, isKnownView, defaultView, navigate]);

    const activeItem = dashboardNavigation.find((item) => item.key === activeSection) ?? dashboardNavigation[0];
    const activeMeta = dashboardSectionMeta[activeSection] ?? dashboardSectionMeta.dashboard;

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const handleSectionLinkClick = () => {
        if (!isDesktop) {
            setMobileOpen(false);
        }
    };

    const handleViewSelect = (view) => {
        navigate(buildSectionPath(activeSection, view));

        if (!isDesktop) {
            setMobileOpen(false);
        }
    };

    const handlePresetChange = (event) => {
        setPreset(event.target.value);
    };

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
                                onClick={handleSectionLinkClick}
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
                                <Stack direction="row" spacing={1.25} alignItems="center">
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
                                    onClick={() => handleViewSelect(view)}
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
                    <Stack direction="row" spacing={1} alignItems="center">
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
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
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
                        onClick={handleDrawerToggle}
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

                    <Stack direction="row" alignItems="center" spacing={1.25}>
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
                            onChange={(event) => setSearchQuery(event.target.value)}
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
                            onChange={handlePresetChange}
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
                            onClick={toggleMode}
                            sx={{ ml: 0.75, color: (muiTheme) => muiTheme.palette.custom.shellTopbarText }}
                            aria-label="Toggle theme mode"
                        >
                            <Iconify icon={isDarkMode ? 'solar:sun-outline' : 'solar:moon-outline'} sx={{ width: 20, height: 20 }} />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>

            <Box component="nav" sx={{ width: { md: dashboardDrawerWidth }, flexShrink: { md: 0 } }} aria-label="dashboard sections">
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
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

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    minWidth: 0,
                    pt: `${dashboardTopbarHeight + 16}px`,
                    px: { xs: 2, md: 3 },
                    pb: 3,
                    width: { md: `calc(100% - ${dashboardDrawerWidth}px)` }
                }}
            >
                <Stack spacing={3}>
                    <StarterCard
                        title={`${activeItem.label} / ${activeView}`}
                        action={<Chip label="Editorial Core" color="primary" size="small" />}
                    >
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5, maxWidth: 820 }}>
                            {activeMeta.description}
                        </Typography>

                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.25}>
                            <Button variant="contained" startIcon={<Iconify icon="solar:diskette-outline" sx={{ width: 18, height: 18 }} />}>
                                Save workspace
                            </Button>
                            <Button variant="outlined" startIcon={<Iconify icon="solar:restart-outline" sx={{ width: 18, height: 18 }} />}>
                                Reset selection
                            </Button>
                        </Stack>
                    </StarterCard>

                    <Box
                        sx={{
                            display: 'grid',
                            gap: 2,
                            gridTemplateColumns: {
                                xs: '1fr',
                                sm: 'repeat(3, minmax(0, 1fr))'
                            }
                        }}
                    >
                        {dashboardStats.map((item) => (
                            <Paper key={item.label} sx={{ p: 2, borderColor: 'divider', bgcolor: 'background.paper' }}>
                                <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase' }}>
                                    {item.label}
                                </Typography>
                                <Typography variant="h5" sx={{ mt: 0.75 }}>
                                    {item.value}
                                </Typography>
                            </Paper>
                        ))}
                    </Box>

                    <Box
                        sx={{
                            display: 'grid',
                            gap: 2,
                            gridTemplateColumns: {
                                xs: '1fr',
                                xl: '1.1fr 0.9fr'
                            }
                        }}
                    >
                        <StarterCard title="Quick actions">
                            <Stack spacing={1.5}>
                                {dashboardQuickActions.map((item) => (
                                    <Paper
                                        key={item.title}
                                        sx={{
                                            p: 1.5,
                                            borderColor: 'divider',
                                            bgcolor: (muiTheme) => muiTheme.palette.custom.panelMuted
                                        }}
                                    >
                                        <Stack direction="row" justifyContent="space-between" spacing={2} alignItems="flex-start">
                                            <Box>
                                                <Typography variant="subtitle2">{item.title}</Typography>
                                                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                                    {item.description}
                                                </Typography>
                                            </Box>
                                            <Button
                                                size="small"
                                                variant="text"
                                                endIcon={<Iconify icon="solar:arrow-right-outline" sx={{ width: 16, height: 16 }} />}
                                            >
                                                {item.actionLabel}
                                            </Button>
                                        </Stack>
                                    </Paper>
                                ))}
                            </Stack>
                        </StarterCard>

                        <Stack spacing={2}>
                            <StarterCard title="Recent activity">
                                <Stack spacing={1.2}>
                                    {dashboardRecentActivity.map((item) => (
                                        <Box key={item.title}>
                                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                {item.title}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {item.detail}
                                            </Typography>
                                            <Divider sx={{ mt: 1.2 }} />
                                        </Box>
                                    ))}
                                </Stack>
                            </StarterCard>

                            <StarterCard title="Next backend slice">
                                <Typography variant="body2" color="text.secondary">
                                    {activeMeta.nextSlice}
                                </Typography>
                            </StarterCard>
                        </Stack>
                    </Box>
                </Stack>
            </Box>
        </Box>
    );
}

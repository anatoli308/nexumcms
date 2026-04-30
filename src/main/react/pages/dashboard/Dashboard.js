import React from 'react';
import {
    Box,
    Button,
    Chip,
    Divider,
    Paper,
    Stack,
    Typography,
    useMediaQuery
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

import Iconify from '../../components/utils/Iconify';
import ContentTypesPage from '../content/ContentTypesPage';
import DashboardSidebar from './components/DashboardSidebar';
import DashboardTopbar from './components/DashboardTopbar';
import { useThemeSettings } from '../../theme/ThemeSettingsContext';
import {
    dashboardDrawerWidth,
    dashboardNavigation,
    dashboardQuickActions,
    dashboardRecentActivity,
    dashboardSectionMeta,
    dashboardStats,
    dashboardTopbarHeight,
    dashboardViewsBySection
} from './dashboardConfig';
import { buildSectionPath, toViewSlug } from './dashboardRouting';

function StarterCard({ title, children, action }) {
    return (
        <Paper sx={{ p: 3, borderColor: 'divider', bgcolor: 'background.paper' }}>
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h6">{title}</Typography>
                {action}
            </Stack>
            <Box sx={{ mt: 2 }}>{children}</Box>
        </Paper>
    );
}

export default function Dashboard() {
    const isDesktop = useMediaQuery((muiTheme) => muiTheme.breakpoints.up('md'));
    const navigate = useNavigate();
    const { section, view } = useParams();

    const { mode, preset, presetOptions, setPreset, toggleMode } = useThemeSettings();

    const isKnownSection = dashboardNavigation.some((item) => item.key === section);
    const activeSection = isKnownSection ? section : dashboardNavigation[0].key;
    const activeViews = dashboardViewsBySection[activeSection] ?? [];
    const defaultView = activeViews[0] ?? '';
    const activeViewBySlug = React.useMemo(
        () => Object.fromEntries(activeViews.map((label) => [toViewSlug(label), label])),
        [activeViews]
    );
    const isKnownView = Boolean(view && activeViewBySlug[view]);
    const activeView = isKnownView ? activeViewBySlug[view] : defaultView;
    const shouldRedirectToDashboard = Boolean(section && !isKnownSection) || !activeViews.length;
    const shouldRedirectToDefaultView = !shouldRedirectToDashboard && (!view || !isKnownView);

    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState('');

    React.useEffect(() => {
        if (shouldRedirectToDashboard) {
            navigate(buildSectionPath('dashboard', dashboardViewsBySection.dashboard?.[0] ?? ''), { replace: true });
            return;
        }

        if (shouldRedirectToDefaultView) {
            navigate(buildSectionPath(activeSection, defaultView), { replace: true });
        }
    }, [shouldRedirectToDashboard, shouldRedirectToDefaultView, activeSection, defaultView, navigate]);

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

    const handleViewSelect = (viewLabel) => {
        navigate(buildSectionPath(activeSection, viewLabel));

        if (!isDesktop) {
            setMobileOpen(false);
        }
    };

    const handlePresetChange = (event) => {
        setPreset(event.target.value);
    };

    if (shouldRedirectToDashboard || shouldRedirectToDefaultView) {
        return null;
    }

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
            <DashboardTopbar
                mode={mode}
                preset={preset}
                presetOptions={presetOptions}
                searchQuery={searchQuery}
                onSearchQueryChange={setSearchQuery}
                onDrawerToggle={handleDrawerToggle}
                onPresetChange={handlePresetChange}
                onToggleMode={toggleMode}
            />

            <DashboardSidebar
                mode={mode}
                isDesktop={isDesktop}
                mobileOpen={mobileOpen}
                activeSection={activeSection}
                activeView={activeView}
                onDrawerToggle={handleDrawerToggle}
                onSectionLinkClick={handleSectionLinkClick}
                onViewSelect={handleViewSelect}
            />

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
                {activeSection === 'content' && activeView === 'Content Types' ? (
                    <ContentTypesPage />
                ) : (
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
                                        <Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
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
                )}
            </Box>
        </Box>
    );
}

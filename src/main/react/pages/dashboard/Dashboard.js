import React from 'react';
import {
    AppBar,
    Box,
    Button,
    Divider,
    Drawer,
    InputBase,
    List,
    ListItem,
    ListItemButton,
    Paper,
    Stack,
    Toolbar,
    Typography,
    useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import {
    brandLogoSrc,
    brandMarkSrc,
    drawerWidth,
    moduleHighlights,
    navigationItems,
    nextBackendSlice,
    recentEvents,
    sectionDescriptions,
    sectionViews,
    topbarHeight
} from './dashboardConfig';
import {
    ActionRow,
    DetailField,
    MenuToggleButton,
    MetricBox,
    NavGlyph,
    UtilityButton
} from './DashboardParts';

export default function Dashboard() {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [activeSection, setActiveSection] = React.useState('dashboard');
    const [activeView, setActiveView] = React.useState(sectionViews.dashboard[0]);
    const menuButtonRef = React.useRef(null);
    const focusTimeoutRef = React.useRef(null);

    React.useEffect(() => {
        return () => {
            if (focusTimeoutRef.current !== null) {
                window.clearTimeout(focusTimeoutRef.current);
            }
        };
    }, []);

    const selectedItem = navigationItems.find((item) => item.key === activeSection) ?? navigationItems[0];
    const selectedViews = sectionViews[activeSection] ?? [];

    const handleDrawerToggle = () => {
        setMobileOpen((open) => !open);
    };

    const closeDrawerAndRestoreFocus = () => {
        setMobileOpen(false);

        if (focusTimeoutRef.current !== null) {
            window.clearTimeout(focusTimeoutRef.current);
        }

        focusTimeoutRef.current = window.setTimeout(() => {
            menuButtonRef.current?.focus();
        }, 150);
    };

    const handleSectionSelect = (sectionKey) => {
        const nextViews = sectionViews[sectionKey] ?? [];

        setActiveSection(sectionKey);
        setActiveView(nextViews[0] ?? activeView);

        if (!isDesktop) {
            closeDrawerAndRestoreFocus();
        }
    };

    const handleViewSelect = (view) => {
        setActiveView(view);

        if (!isDesktop) {
            closeDrawerAndRestoreFocus();
        }
    };

    const quickActions = React.useMemo(
        () => [
            {
                title: 'Backend slice definieren',
                description: `Fuer ${selectedItem.label.toLowerCase()} zuerst klare Service-Grenzen, DTOs und Endpunkte festziehen.`,
                actionLabel: 'Planen'
            },
            {
                title: 'UI-Modul andocken',
                description: `Den Bereich ${activeView.toLowerCase()} als eigene Arbeitsmaske an dieselbe Shell haengen.`,
                actionLabel: 'Oeffnen'
            },
            {
                title: 'Rechte und Workflow beachten',
                description: 'Auch der erste Backend-Schnitt sollte Rollen, Status und Publikationsregeln schon mitdenken.',
                actionLabel: 'Pruefen'
            }
        ],
        [selectedItem.label, activeView]
    );

    const drawerContent = (
        <Box sx={{ display: 'flex', height: '100%', flexDirection: 'column', bgcolor: '#3a3a3a', color: '#ffffff' }}>
            <Box sx={{ px: 2, py: 2.25 }}>
                <Box component="img" src={brandLogoSrc} alt="Nexum CMS" sx={{ display: 'block', width: '100%', maxWidth: 162 }} />
            </Box>

            <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.08)' }} />

            <List disablePadding sx={{ py: 1.5 }}>
                {navigationItems.map((item) => {
                    const selected = item.key === activeSection;

                    return (
                        <ListItem key={item.key} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                onClick={() => handleSectionSelect(item.key)}
                                selected={selected}
                                sx={{
                                    gap: 1.5,
                                    minHeight: 52,
                                    px: 2,
                                    color: 'inherit',
                                    borderLeft: '4px solid',
                                    borderLeftColor: selected ? '#2f9cff' : 'transparent',
                                    bgcolor: selected ? '#2f2f2f' : 'transparent',
                                    '&.Mui-selected': {
                                        bgcolor: '#2f2f2f'
                                    },
                                    '&:hover': {
                                        bgcolor: '#333333'
                                    }
                                }}
                            >
                                <Box sx={{ display: 'flex', width: 24, justifyContent: 'center' }}>
                                    <NavGlyph variant={item.icon} active={selected} />
                                </Box>
                                <Typography variant="body2" sx={{ fontSize: 15, fontWeight: 500 }}>
                                    {item.label}
                                </Typography>
                            </ListItemButton>

                            {selected && selectedViews.length > 0 ? (
                                <Box sx={{ bgcolor: '#2f2f2f', pb: 1.25, pt: 0.25 }}>
                                    {selectedViews.map((view) => {
                                        const selectedView = view === activeView;

                                        return (
                                            <Button
                                                key={view}
                                                aria-current={selectedView ? 'page' : undefined}
                                                fullWidth
                                                onClick={() => handleViewSelect(view)}
                                                sx={{
                                                    justifyContent: 'flex-start',
                                                    borderRadius: 0,
                                                    px: 4.5,
                                                    py: 0.75,
                                                    color: selectedView ? '#52c1ff' : 'rgba(255, 255, 255, 0.72)',
                                                    textTransform: 'none',
                                                    fontSize: 13,
                                                    fontWeight: selectedView ? 700 : 500,
                                                    '&:hover': {
                                                        bgcolor: 'transparent',
                                                        color: '#8bd4ff'
                                                    }
                                                }}
                                            >
                                                {view}
                                            </Button>
                                        );
                                    })}
                                </Box>
                            ) : null}
                        </ListItem>
                    );
                })}
            </List>

            <Box sx={{ mt: 'auto', px: 2, pb: 2.5, pt: 2 }}>
                <Paper square elevation={0} sx={{ bgcolor: '#2e2e2e', color: '#ffffff', p: 1.5, border: '1px solid #4a4a4a' }}>
                    <Stack direction="row" spacing={1.25} alignItems="center">
                        <Box
                            component="img"
                            src={brandMarkSrc}
                            alt="Nexum"
                            sx={{ width: 32, height: 32, flexShrink: 0, bgcolor: '#ffffff', p: 0.25, borderRadius: 0.5 }}
                        />
                        <Box>
                            <Typography variant="body2" sx={{ fontWeight: 700 }}>
                                Editorial Core
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.64)' }}>
                                Backend shell bereit
                            </Typography>
                        </Box>
                    </Stack>
                </Paper>
            </Box>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#ececec' }}>
            <AppBar
                position="fixed"
                elevation={0}
                sx={{
                    height: topbarHeight,
                    justifyContent: 'center',
                    bgcolor: '#1f1f1f',
                    borderBottom: '1px solid #0f0f0f',
                    zIndex: theme.zIndex.drawer + 1
                }}
            >
                <Toolbar sx={{ minHeight: `${topbarHeight}px !important`, px: { xs: 1, md: 0 } }}>
                    <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
                        <MenuToggleButton ref={menuButtonRef} isOpen={mobileOpen} onClick={handleDrawerToggle} />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, px: { xs: 0.5, md: 1.5 } }}>
                        <Box component="img" src={brandMarkSrc} alt="Nexum" sx={{ display: { xs: 'none', sm: 'block' }, width: 24, height: 24 }} />
                        <Typography variant="body2" sx={{ fontWeight: 700, letterSpacing: '0.02em', color: 'common.white' }}>
                            nexum CMS
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#8ecbff' }}>
                            beta
                        </Typography>
                    </Box>

                    <Box sx={{ flexGrow: 1 }} />

                    <Box sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'stretch', height: '100%' }}>
                        {['Alerts', 'Inbox', 'Help', 'Setup'].map((label) => (
                            <UtilityButton key={label} label={label} />
                        ))}
                    </Box>

                    <Box
                        sx={{
                            ml: { xs: 1, md: 0 },
                            mr: 1,
                            display: 'flex',
                            alignItems: 'center',
                            width: { xs: 180, sm: 220 },
                            height: 30,
                            border: '1px solid #4e4e4e',
                            bgcolor: '#ffffff'
                        }}
                    >
                        <InputBase
                            aria-label="Suchen"
                            placeholder="Suchen"
                            sx={{
                                flexGrow: 1,
                                px: 1.25,
                                fontSize: 14,
                                color: '#1f1f1f'
                            }}
                        />
                        <Box sx={{ width: 34, display: 'flex', justifyContent: 'center' }} aria-hidden="true">
                            <Box sx={{ position: 'relative', width: 14, height: 14 }}>
                                <Box sx={{ position: 'absolute', inset: 0, border: '1.5px solid #1f1f1f', borderRadius: 99 }} />
                                <Box sx={{ position: 'absolute', right: -1, bottom: -2, width: 6, height: 1.5, bgcolor: '#1f1f1f', transform: 'rotate(45deg)' }} />
                            </Box>
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>

            <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }} aria-label="CMS navigation">
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            top: topbarHeight,
                            height: `calc(100% - ${topbarHeight}px)`,
                            borderRight: 'none',
                            boxSizing: 'border-box',
                            bgcolor: '#3a3a3a'
                        }
                    }}
                >
                    {drawerContent}
                </Drawer>

                <Drawer
                    variant="permanent"
                    open
                    sx={{
                        display: { xs: 'none', md: 'block' },
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            top: topbarHeight,
                            height: `calc(100% - ${topbarHeight}px)`,
                            borderRight: 'none',
                            boxSizing: 'border-box',
                            bgcolor: '#3a3a3a'
                        }
                    }}
                >
                    {drawerContent}
                </Drawer>
            </Box>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    width: {
                        md: `calc(100% - ${drawerWidth}px)`
                    },
                    minWidth: 0,
                    pt: `${topbarHeight}px`,
                    bgcolor: '#ececec'
                }}
            >
                <Box sx={{ borderBottom: '1px solid #ababab', bgcolor: '#c9c9c9', px: { xs: 2, md: 2.5 }, py: 1 }}>
                    <Typography variant="caption" sx={{ fontWeight: 700, letterSpacing: '0.04em', color: '#111111' }}>
                        {selectedItem.label.toUpperCase()} / {activeView.toUpperCase()} (SPACE: EDITORIAL CORE)
                    </Typography>
                </Box>

                <Box sx={{ p: { xs: 2, md: 3 }, display: 'grid', gap: 3 }}>
                    <Paper
                        square
                        elevation={0}
                        sx={{
                            border: '1px solid #d2d2d2',
                            bgcolor: '#ffffff',
                            p: { xs: 2, md: 3 },
                            display: 'grid',
                            gap: 3,
                            gridTemplateColumns: {
                                xs: '1fr',
                                xl: '1.15fr 0.95fr'
                            }
                        }}
                    >
                        <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 2.5 }}>
                                <Box sx={{ width: 16, height: 16, borderRadius: 99, bgcolor: '#2f9cff' }} />
                                <Typography variant="h4" sx={{ fontWeight: 400, color: '#111111' }}>
                                    {selectedItem.label} workspace
                                </Typography>
                            </Box>

                            <Typography variant="body1" sx={{ mb: 3, maxWidth: 760, color: '#5d5d5d', lineHeight: 1.8 }}>
                                {sectionDescriptions[activeSection]}
                            </Typography>

                            <Stack spacing={2}>
                                <DetailField label="Aktiver Space" value="Editorial Core" muted />
                                <DetailField label="Aktuelle Ansicht" value={`${selectedItem.label} / ${activeView}`} muted />
                                <DetailField label="UI Pattern" value="Responsive Drawer + AppBar + Kontextleiste" />
                                <DetailField label="Brand assets" value="Nexum Logo und Monogramm aus /static/brand eingebunden" />
                                <DetailField label="Naechster Backend Slice" value={nextBackendSlice[activeSection]} />
                            </Stack>

                            <Box sx={{ mt: 3.5, display: 'flex', flexWrap: 'wrap', gap: 1.5, justifyContent: 'flex-end' }}>
                                <Button sx={{ color: '#111111', textTransform: 'none', fontWeight: 500 }}>Zuruecksetzen</Button>
                                <Button
                                    variant="contained"
                                    sx={{
                                        borderRadius: 0,
                                        px: 2.25,
                                        bgcolor: '#1f1f1f',
                                        color: '#ffffff',
                                        textTransform: 'none',
                                        boxShadow: 'none',
                                        '&:hover': {
                                            bgcolor: '#111111',
                                            boxShadow: 'none'
                                        }
                                    }}
                                >
                                    Workspace speichern
                                </Button>
                            </Box>

                            <Box
                                sx={{
                                    mt: 3,
                                    display: 'grid',
                                    gap: 1.5,
                                    gridTemplateColumns: {
                                        xs: '1fr',
                                        sm: 'repeat(3, 1fr)'
                                    }
                                }}
                            >
                                <MetricBox label="Offene Tasks" value="12" />
                                <MetricBox label="Freigaben" value="07" />
                                <MetricBox label="Module" value="04" />
                            </Box>
                        </Box>

                        <Stack spacing={4}>
                            {quickActions.map((item) => (
                                <ActionRow
                                    key={item.title}
                                    title={item.title}
                                    description={item.description}
                                    actionLabel={item.actionLabel}
                                />
                            ))}
                        </Stack>
                    </Paper>

                    <Box
                        sx={{
                            display: 'grid',
                            gap: 3,
                            gridTemplateColumns: {
                                xs: '1fr',
                                lg: '1fr 1fr'
                            }
                        }}
                    >
                        <Paper square elevation={0} sx={{ border: '1px solid #d2d2d2', bgcolor: '#ffffff', p: 2.5 }}>
                            <Typography variant="h6" sx={{ mb: 2, fontWeight: 400, color: '#111111' }}>
                                Letzte Aktivitaet
                            </Typography>
                            <Stack spacing={1.5}>
                                {recentEvents.map((item) => (
                                    <Box
                                        key={item.title}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            gap: 1.5,
                                            borderBottom: '1px solid #ececec',
                                            pb: 1.25,
                                            '&:last-of-type': {
                                                borderBottom: 'none',
                                                pb: 0
                                            }
                                        }}
                                    >
                                        <Box>
                                            <Typography variant="body2" sx={{ fontWeight: 700, color: '#1f1f1f' }}>
                                                {item.title}
                                            </Typography>
                                            <Typography variant="caption" sx={{ color: '#686868' }}>
                                                {item.detail}
                                            </Typography>
                                        </Box>
                                        <Button sx={{ color: '#111111', textTransform: 'none', fontWeight: 500 }}>Oeffnen</Button>
                                    </Box>
                                ))}
                            </Stack>
                        </Paper>

                        <Paper square elevation={0} sx={{ border: '1px solid #d2d2d2', bgcolor: '#ffffff', p: 2.5 }}>
                            <Typography variant="h6" sx={{ mb: 2, fontWeight: 400, color: '#111111' }}>
                                Backend roadmap fuer diese Shell
                            </Typography>
                            <Stack spacing={1.75}>
                                {moduleHighlights.map((item) => (
                                    <Box key={item} sx={{ display: 'flex', gap: 1.25, alignItems: 'flex-start' }}>
                                        <Box sx={{ mt: 0.75, width: 10, height: 10, borderRadius: 99, bgcolor: '#2f9cff', flexShrink: 0 }} />
                                        <Typography variant="body2" sx={{ color: '#4b4b4b', lineHeight: 1.7 }}>
                                            {item}
                                        </Typography>
                                    </Box>
                                ))}
                            </Stack>
                        </Paper>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
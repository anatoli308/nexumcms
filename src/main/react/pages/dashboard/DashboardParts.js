import React from 'react';
import {
    Box,
    Button,
    IconButton,
    Paper,
    Typography
} from '@mui/material';
import { alpha } from '@mui/material/styles';

export const MenuToggleButton = React.forwardRef(function MenuToggleButton({ isOpen, onClick }, ref) {
    return (
        <IconButton
            ref={ref}
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
            onClick={onClick}
            edge="start"
            sx={{
                mr: 1,
                color: 'common.white'
            }}
        >
            <Box sx={{ display: 'grid', gap: '3px' }}>
                {[0, 1, 2].map((bar) => (
                    <Box
                        key={bar}
                        sx={{
                            width: 18,
                            height: 2,
                            borderRadius: 99,
                            bgcolor: 'common.white'
                        }}
                    />
                ))}
            </Box>
        </IconButton>
    );
});

export const UtilityButton = React.memo(function UtilityButton({ label }) {
    return (
        <Button
            size="small"
            sx={{
                minWidth: 0,
                px: 1.25,
                py: 0.75,
                borderLeft: '1px solid',
                borderColor: alpha('#ffffff', 0.18),
                color: 'common.white',
                borderRadius: 0,
                textTransform: 'none',
                fontSize: 12,
                '&:hover': {
                    bgcolor: alpha('#ffffff', 0.06)
                }
            }}
        >
            {label}
        </Button>
    );
});

export const NavGlyph = React.memo(function NavGlyph({ variant, active }) {
    const color = active ? '#52c1ff' : 'rgba(255, 255, 255, 0.8)';

    if (variant === 'grid') {
        return (
            <Box sx={{ display: 'grid', width: 18, height: 18, gridTemplateColumns: 'repeat(2, 1fr)', gap: '2px' }}>
                {[0, 1, 2, 3].map((item) => (
                    <Box key={item} sx={{ borderRadius: '2px', border: '1.5px solid', borderColor: color }} />
                ))}
            </Box>
        );
    }

    if (variant === 'doc') {
        return (
            <Box sx={{ position: 'relative', width: 16, height: 18, border: '1.5px solid', borderColor: color, borderRadius: '2px' }}>
                <Box sx={{ position: 'absolute', top: 3, left: 3, right: 3, height: 1.5, bgcolor: color }} />
                <Box sx={{ position: 'absolute', top: 7, left: 3, right: 5, height: 1.5, bgcolor: color }} />
                <Box sx={{ position: 'absolute', top: 11, left: 3, right: 6, height: 1.5, bgcolor: color }} />
            </Box>
        );
    }

    if (variant === 'image') {
        return (
            <Box sx={{ position: 'relative', width: 18, height: 16, border: '1.5px solid', borderColor: color, borderRadius: '2px' }}>
                <Box sx={{ position: 'absolute', top: 3, right: 3, width: 3, height: 3, borderRadius: 99, bgcolor: color }} />
                <Box
                    sx={{
                        position: 'absolute',
                        left: 2,
                        right: 2,
                        bottom: 2,
                        height: 7,
                        borderLeft: '1.5px solid',
                        borderBottom: '1.5px solid',
                        borderColor: color,
                        transform: 'skewX(-28deg)'
                    }}
                />
            </Box>
        );
    }

    if (variant === 'tree') {
        return (
            <Box sx={{ position: 'relative', width: 18, height: 18 }}>
                <Box sx={{ position: 'absolute', left: 8, top: 2, bottom: 2, width: 1.5, bgcolor: color }} />
                <Box sx={{ position: 'absolute', left: 8, top: 4, width: 6, height: 1.5, bgcolor: color }} />
                <Box sx={{ position: 'absolute', left: 8, top: 12, width: 6, height: 1.5, bgcolor: color }} />
                <Box sx={{ position: 'absolute', left: 1, top: 1, width: 5, height: 5, borderRadius: 99, border: '1.5px solid', borderColor: color }} />
                <Box sx={{ position: 'absolute', right: 0, top: 9, width: 5, height: 5, borderRadius: 99, border: '1.5px solid', borderColor: color }} />
            </Box>
        );
    }

    if (variant === 'settings') {
        return (
            <Box sx={{ position: 'relative', width: 18, height: 18 }}>
                <Box sx={{ position: 'absolute', inset: 2, borderRadius: 99, border: '1.5px solid', borderColor: color }} />
                <Box sx={{ position: 'absolute', inset: 6, borderRadius: 99, bgcolor: color }} />
            </Box>
        );
    }

    return (
        <Box sx={{ position: 'relative', width: 18, height: 18 }}>
            <Box sx={{ position: 'absolute', left: 1, top: 7.5, width: 16, height: 1.5, bgcolor: color }} />
            {[2, 8, 14].map((left) => (
                <Box
                    key={left}
                    sx={{
                        position: 'absolute',
                        top: 5,
                        left,
                        width: 5,
                        height: 5,
                        borderRadius: 99,
                        border: '1.5px solid',
                        borderColor: color,
                        bgcolor: '#3a3a3a'
                    }}
                />
            ))}
        </Box>
    );
});

export const DetailField = React.memo(function DetailField({ label, value, muted }) {
    return (
        <Box
            sx={{
                display: 'grid',
                gap: 1.25,
                alignItems: 'center',
                gridTemplateColumns: {
                    xs: '1fr',
                    md: '180px minmax(0, 1fr)'
                }
            }}
        >
            <Typography variant="body2" sx={{ fontWeight: 700, color: '#1f1f1f' }}>
                {label}
            </Typography>
            <Box
                sx={{
                    minHeight: 38,
                    display: 'flex',
                    alignItems: 'center',
                    px: 1.5,
                    border: '1px solid #d2d2d2',
                    bgcolor: muted ? '#efefef' : '#ffffff'
                }}
            >
                <Typography variant="body2" sx={{ color: '#333333' }}>
                    {value}
                </Typography>
            </Box>
        </Box>
    );
});

export const MetricBox = React.memo(function MetricBox({ label, value }) {
    return (
        <Paper
            square
            elevation={0}
            sx={{
                border: '1px solid #d8d8d8',
                bgcolor: '#fafafa',
                px: 1.5,
                py: 1.25
            }}
        >
            <Typography variant="caption" sx={{ display: 'block', color: '#686868', textTransform: 'uppercase' }}>
                {label}
            </Typography>
            <Typography variant="h6" sx={{ mt: 0.5, fontWeight: 700, color: '#111111' }}>
                {value}
            </Typography>
        </Paper>
    );
});

export const ActionRow = React.memo(function ActionRow({ title, description, actionLabel }) {
    return (
        <Box sx={{ display: 'grid', gap: 1.5, gridTemplateColumns: '1fr auto', alignItems: 'start' }}>
            <Box sx={{ minWidth: 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.75 }}>
                    <Box sx={{ width: 14, height: 14, borderRadius: 99, bgcolor: '#2f9cff' }} />
                    <Typography variant="h6" sx={{ fontWeight: 400, color: '#111111' }}>
                        {title}
                    </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: '#666666', lineHeight: 1.7 }}>
                    {description}
                </Typography>
            </Box>
            <Button
                variant="contained"
                sx={{
                    minWidth: 132,
                    alignSelf: 'center',
                    borderRadius: 0,
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
                {actionLabel}
            </Button>
        </Box>
    );
});
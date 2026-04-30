const components = {
    MuiCssBaseline: {
        styleOverrides: {
            body: {
                margin: 0
            }
        }
    },
    MuiPaper: {
        defaultProps: {
            elevation: 0
        },
        styleOverrides: {
            root: ({ theme }) => ({
                borderRadius: 12,
                border: `1px solid ${theme.palette.divider}`
            })
        }
    },
    MuiButton: {
        defaultProps: {
            disableElevation: true
        },
        styleOverrides: {
            root: {
                borderRadius: 10,
                paddingInline: 14
            }
        }
    },
    MuiAppBar: {
        styleOverrides: {
            root: {
                boxShadow: 'none'
            }
        }
    },
    MuiDrawer: {
        styleOverrides: {
            paper: {
                borderRight: 'none'
            }
        }
    }
};

export default components;
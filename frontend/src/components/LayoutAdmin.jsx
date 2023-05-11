import React, { useState, useEffect } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { LinearProgress, Grid, Container, Badge, IconButton, Typography, List, Toolbar, Box, CssBaseline, TextField } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ListItems from './ListItems';
import logoImg from '../images/logo.png'
import '../style/dashboard.css'
import { Outlet } from 'react-router-dom'

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(7),
                },
            }),
        },
    }),
);

const mdTheme = createTheme({
    // palette: {
    //   mode: 'dark',
    // },
})

function LayoutAdmin() {

    const [open, setOpen] = useState(true)
    const [IsProgress, setIsProgress] = useState(true)


    const toggleDrawer = () => {
        setOpen(!open)
    }

    useEffect(() => {

    }, [])

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="absolute" open={open} sx={{ boxShadow: 0 }}>
                    <Toolbar
                        sx={{
                            pr: '24px',
                            bgcolor: "white"
                        }}
                    >
                        <IconButton
                            edge="start"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        {open && <IconButton onClick={toggleDrawer}>
                            <MenuIcon />
                        </IconButton>}
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1, padding: 3 }}
                        >
                            <div className='parentdiv'>
                                <div className='SearchDiv'>
                                    <TextField id="outlined-basic" label="Search" variant="outlined" fullWidth size="small" sx={{}} />
                                </div>
                                <div className='SearchDivHelp'>
                                </div>
                            </div>

                        </Typography>
                        <IconButton color="inherit" onClick={() => {

                        }}>
                            <Badge badgeContent={3} color="primary">
                                <NotificationsIcon color='action' />
                            </Badge>
                        </IconButton>
                    </Toolbar>
                    {IsProgress && <LinearProgress />}
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <div className='logoContainer'>
                        <img src={logoImg} className="logo" />
                    </div>
                    <List component="" sx={{ my: 7 }}>
                        <ListItems />
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Outlet context={[IsProgress, setIsProgress]} />
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    )
}

export default LayoutAdmin
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Fragment} from "react";
import {Avatar, Badge, styled} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import config from "../config/config.json"
import LogoutIcon from '@mui/icons-material/Logout';
import Cookies from "js-cookie";

const drawerWidth = 240;


export default function ResponsiveDrawer() {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const user = useSelector((state: any) => state.auth.user)

    const navigate = useNavigate()
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const changeRoute = (path: string) => {
        navigate(path)
    }

    const handleLogout = () => {
        console.log('----111')
        Cookies.remove('access_token')
        Cookies.remove('refresh_token')
        navigate(0)
    }

    const StyledBadge = styled(Badge)(({theme}) => ({
        '& .MuiBadge-badge': {
            backgroundColor: '#44b700',
            color: '#44b700',
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
            '&::after': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                animation: 'ripple 1.2s infinite ease-in-out',
                border: '1px solid currentColor',
                content: '""',
            },
        },
        '@keyframes ripple': {
            '0%': {
                transform: 'scale(.8)',
                opacity: 1,
            },
            '100%': {
                transform: 'scale(2.4)',
                opacity: 0,
            },
        },
    }))
    const drawer = (
        <div>
            <div style={{margin: '10px 10px'}}>
                <StyledBadge
                    overlap="circular"
                    anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                    variant="dot"
                >
                    <Avatar alt="Remy Sharp" src={`http://localhost:8082/avatars/${user?.avatar}`}/>
                </StyledBadge>
                <span style={{marginLeft: '10px'}}>{user?.nick}</span>
            </div>
            <Divider/>
            <List>
                {config.navbar.map((item, index) => (
                    <ListItem onClick={() => changeRoute(item.path)} key={index} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
                            </ListItemIcon>
                            <ListItemText primary={item.name}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    )

    return (
        <Fragment>
            <CssBaseline/>
            <Box sx={{flexGrow: 1}}>
                <AppBar
                    position="fixed"
                    sx={{
                        width: {sm: `calc(100% - ${drawerWidth}px)`},
                        ml: {sm: `${drawerWidth}px`},
                    }}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{mr: 2, display: {sm: 'none'}}}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" sx={{ flexGrow: 1 }} component="div">
                            Responsive drawer elo 2
                        </Typography>
                        <IconButton onClick={handleLogout} sx={{float: 'right'}} color={'inherit'}>
                            <LogoutIcon/>
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </Box>
            <Box
                component="nav"
                sx={{width: {sm: drawerWidth}, flexShrink: {sm: 0}}}
            >
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    sx={{
                        display: {xs: 'block', sm: 'none'},
                        '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                    }}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: {xs: 'none', sm: 'block'},
                        '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
        </Fragment>
    )

}

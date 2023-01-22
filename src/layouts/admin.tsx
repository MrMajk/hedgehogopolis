import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import ResponsiveDrawer from "./drawer";
import {Outlet} from "react-router-dom";


const drawerWidth = 240;

export default function AdminLayout(outlet: any) {
    return (
        <Box sx={{display: 'flex'}}>

            <ResponsiveDrawer/>

            <Box
                component="main"
                sx={{flexGrow: 1, p: 3, width: '100%'}}
            >
                <Toolbar/>
                <Outlet/>
            </Box>
        </Box>
    );
}

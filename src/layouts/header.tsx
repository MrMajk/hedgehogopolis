import * as React from 'react';
import {Box, IconButton, Menu, useTheme} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {useDispatch, useSelector} from "react-redux";
import {setThemeMode} from "../store/themeSlice";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import {StoreInterface} from "../types/store";

const Header = () => {
    const theme = useTheme()
    const dispatch = useDispatch()
    const themeMode = useSelector((state: StoreInterface) => state.theme.mode)

    const handleChangeTheme = () => {
        const theme = themeMode === 'light' ? 'dark' : 'light'
        dispatch(setThemeMode(theme))
    }

    return (
        <React.Fragment>
            <Box sx={{flexGrow: 1}}>
                <IconButton sx={{ ml: 1 }} onClick={handleChangeTheme} color="inherit">
                    {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <MenuIcon/>
                </IconButton>

            </Box>
        </React.Fragment>
    )
}

export default Header

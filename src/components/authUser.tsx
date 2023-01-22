import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '../uiComponents/tabPanel'
import Login from "./login";
import {Collapse, Grid, Paper, useMediaQuery, useTheme} from "@mui/material";
import Signup from "./signup";


const AuthUser = () => {
    const [value, setValue] = React.useState(0);
    const [checked, setChecked] = React.useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.up("md"));

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setChecked(!checked)
        setValue(newValue);
    };

    return (
        <Grid container minHeight={'100vh'} justifyContent="center" alignItems="center">
            <Collapse sx={{
                [theme.breakpoints.up('md')]: {
                    position: 'relative',
                    top: '50px',
                    left: '80px'
                },
                [theme.breakpoints.down('md')]: {
                    position: 'absolute',
                    zIndex: '-1',
                    top: '100px'
                }
            }}
                      orientation={!isMobile ? 'vertical' : 'horizontal'}
                      timeout={1000}
                      in={checked}>
                <img style={{width: '200px'}} src="/puppetmaster.svg" alt="auth banner"/>
            </Collapse>
            <Grid style={{textAlign: 'center'}} xs={12} sm={8} md={6} item>

                <Paper elevation={6}>
                    <Tabs centered value={value} onChange={handleChange}>
                        <Tab label="Sign In"/>
                        <Tab label="Sign Up"/>
                    </Tabs>
                    <TabPanel value={value} index={0}>
                        <Login/>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <Signup/>
                    </TabPanel>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default AuthUser

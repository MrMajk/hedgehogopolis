import Header from "./header";
import {Fragment} from 'react'
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Slide from "@mui/material/Slide";

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
    children: React.ReactElement;
}


function HideOnScroll(props: Props) {
    const {children, window} = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

const Primary = (props: Props) => {
    return (
        <Fragment>
            <React.Fragment>
                <CssBaseline/>
                <HideOnScroll {...props}>
                    <AppBar>
                        <Toolbar>
                            <Typography variant="h6" component="div">
                                <Header/>
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </HideOnScroll>
                <Toolbar/>
                <Container>
                    {props.children}
                </Container>
            </React.Fragment>
        </Fragment>
    )
}

export default Primary

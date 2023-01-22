import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import {forwardRef, useImperativeHandle} from "react";
type ConfirmDialogProps = {
    confirmMessage: string,
    handleConfirm: () => void
}
type ConfirmDialog = {
    handleClickOpen: () => void
}

const ConfirmDialog = forwardRef<ConfirmDialog, ConfirmDialogProps>((props, ref) => {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    useImperativeHandle(ref, () => ({
        handleClickOpen() {
            setOpen(true)
        }
    }))

    const handleClose = () => {
        setOpen(false);
    };

    const onConfirmHandle = () => {
        props.handleConfirm()
        handleClose()
    }

    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title" textAlign="center">
                    <img style={{width: '150px'}} src="/frankenstein.png" alt="auth banner"/>
                    <p>{props.confirmMessage}</p>
                </DialogTitle>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        No!
                    </Button>
                    <Button onClick={onConfirmHandle} autoFocus>
                        Sure :)
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
})

export default ConfirmDialog

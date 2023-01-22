import {Alert, AlertTitle, Snackbar} from "@mui/material";
import {Fragment} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setNotification} from "../store/notificationSlice";

const Notification = () => {
    const {isActive, msg, title, type} = useSelector((state: any) => state.notification)
    const dispatch = useDispatch()
    const closeNotificationHandler = () => {
        dispatch(setNotification({
            isActive: false,
            msg,
            type,
            title
        }))
    }
    return (
        <Fragment>
            <Snackbar
                open={isActive}
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}>
                <Alert onClose={closeNotificationHandler} severity={type} sx={{width: '100%'}}>
                    <AlertTitle>{title}</AlertTitle>
                    {msg}
                </Alert>
            </Snackbar>
        </Fragment>
    )
}

export default Notification

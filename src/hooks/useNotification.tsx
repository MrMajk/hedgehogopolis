import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setNotification} from "../store/notificationSlice";
import {StoreInterface} from "../types/store";

const useNotification = () => {
    const {isActive, type, msg, title} = useSelector((state:StoreInterface) => state.notification)
    const dispatch = useDispatch()

    useEffect(() => {
        if (isActive === true) {
            setTimeout(() => {
                dispatch(setNotification({isActive: false, msg, type }))
            }, 5000)
        }
    }, [isActive])

    const showNotification = (msg: string, type: string, title:string) => {
        dispatch(setNotification({
            isActive: true,
            msg,
            type,
            title
        }))
    }

    return { showNotification }
}

export default useNotification

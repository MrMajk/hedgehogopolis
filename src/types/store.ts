import {AlertColor} from "@mui/material";
import {ReservationInterface} from "./reservations";

export interface StoreInterface {
    theme: {
        mode: 'light' | 'dark'
    },
    auth: {
        user: {
            id: number,
            email: string,
            nick: string,
            avatar: string
        },
        isTokenValidated: boolean
    },
    admin: {
        reservations: ReservationInterface[],
        tables: []
    },
    notification: {
        isActive: boolean,
        type: AlertColor,
        msg: string,
        title: string
    }
}

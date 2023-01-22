import {createSlice} from "@reduxjs/toolkit";
import {authApiSlice} from "./api/authApiSlice";

const initialState = {
    tables: [],
    reservations: [],
}

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setTables: (state, {payload}) => {
            state.tables = payload
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            authApiSlice.endpoints.getTables.matchFulfilled, (state, {payload}) => {
                console.log('hello')
                state.tables = payload
            })
        builder.addMatcher(
            authApiSlice.endpoints.getReservations.matchFulfilled, (state, {payload}) => {
                // @ts-ignore
                const formattedReservations = payload.map(({id, guest_name, guest_phone, start_date, end_date, table }) => ({
                    id,
                    guestName: guest_name,
                    guestPhone: guest_phone,
                    startDate: start_date,
                    endDate: end_date,
                    tableName: table.name,
                    tableSeats: table.seats
                }))
                state.reservations = formattedReservations
            })
        builder.addMatcher(
            authApiSlice.endpoints.removeTable.matchFulfilled, (state:any, {payload}) => {
                state.tables = state.tables.filter((table:any) => {
                    return table.id != payload.id
                })
            })
        builder.addMatcher(
            authApiSlice.endpoints.removeReservation.matchFulfilled, (state:any, {payload}) => {
                console.log(payload)
                state.reservations = state.reservations.filter((reservation:any) => {
                    return reservation.id != payload.id
                })
                console.log('store: ', state.reservations)
            })
    }
})
export const {setTables} = adminSlice.actions
export default adminSlice.reducer

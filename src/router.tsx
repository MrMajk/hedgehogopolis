import {createBrowserRouter} from "react-router-dom";
import AuthUser from "./components/authUser";
import Account from "./account";
import ProtectedRoute from "./components/protectedRoute";
import Primary from "./layouts/primary";
import AdminLayout from "./layouts/admin";
import AddTable from "./components/addTable";
import Tables from "./components/tables";
import {authApiSlice, useGetTablesQuery} from "./store/api/authApiSlice";
import store from "./store/store";
import Reservations from "./components/reservations";


export const router = createBrowserRouter([
    {
        path: '/auth',
        element: <Primary><AuthUser/></Primary>
    },
    {
        path: '/',
        element: <ProtectedRoute outlet={<AdminLayout/>}/>,
        children: [
            {
                path: '/',
                loader: async () => {
                    try {
                        const getReservations = store.dispatch(authApiSlice.endpoints.getReservations.initiate())
                        return await getReservations.unwrap()
                    } catch (e) {
                        console.log('get reservations endpoint error: ', e)
                    }
                },
                element: <Account/>
            },
            {
                path: '/add-table',
                element: <AddTable/>
            },
            {
                path: '/tables',
                loader: async () => {
                    const getTables = store.dispatch(authApiSlice.endpoints.getTables.initiate())
                    try {
                        await getTables.unwrap()
                    } catch (e) {
                        console.log('getTables endpoint error: ', e)
                    }
                }
                ,
                element: <Tables/>
            },
            {
                path: '/table/:id',
                loader: async ({params}) => {
                    try {
                        const getTableById = store.dispatch(authApiSlice.endpoints.getTableById.initiate(params.id))
                        return await getTableById.unwrap()
                    } catch (e) {
                        console.log('getTable endpoint error: ', e)
                    }
                },
                element: <AddTable editMode={true}/>
            },
            {
                path: '/reservations',
                loader: async () => {

                    try {
                        const getReservations = store.dispatch(authApiSlice.endpoints.getReservations.initiate())
                        return await getReservations.unwrap()
                    } catch (e) {
                        console.log('getTable endpoint error: ', e)
                    }
                },
                element: <Reservations/>
            }
        ]
    }
])

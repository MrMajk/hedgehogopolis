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
                        // @ts-ignore
                        const getReservations = store.dispatch(authApiSlice.endpoints.getReservations.initiate())
                        // @ts-ignore
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
                    // @ts-ignore
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
                        // @ts-ignore
                        const getTableById = store.dispatch(authApiSlice.endpoints.getTableById.initiate(params.id))
                        console.log('param', params)
                        // @ts-ignore
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
                        // @ts-ignore
                        const getReservations = store.dispatch(authApiSlice.endpoints.getReservations.initiate())
                        // @ts-ignore
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

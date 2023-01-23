import {apiReAuthSlice, apiAuthSlice} from './apiSlice'
import {ReservationInterface} from "../../types/reservations";
import {TableInterface} from "../../types/table";

export const reAuthApiSlice = apiReAuthSlice.injectEndpoints({
  endpoints: builder => ({
    checkToken: builder.query({
      query: () => ({
        url: '/check-token',
        method: 'GET'
      })
    }),
    revokeToken: builder.mutation({
      query: refresh_token => ({
        url: '/revoke-token',
        method: 'POST',
        body: {refresh_token}
      })
    }),
    getUserById: builder.query({
      query: userId => ({
        url: `/user/${userId}`,
        method: 'GET',
      })
    })
  })
})

export const authApiSlice = apiAuthSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({
        url: '/login',
        method: 'POST',
        body: {...credentials}
      })
    }),
    signup: builder.mutation({
      query: credentials => ({
        url: '/signup',
        method: 'POST',
        body: credentials
      })
    }),
    getUserById: builder.query({
      query: userId => ({
        url: `/user/${userId}`,
        method: 'GET'
      })
    }),
    addTable: builder.mutation({
      query: credentials => ({
        url: '/add-table',
        method: 'POST',
        body: credentials
      })
    }),
    getTables: builder.query<TableInterface[], void>({
      query: () => ({
        url: `/tables`,
        method: 'GET'
      })
    }),
    getReservations: builder.query<ReservationInterface[], void>({
      query: () => ({
        url: `/reservations`,
        method: 'GET'
      })
    }),
    removeReservation: builder.mutation({
      query: id => ({
        url: `/reservation/${id}`,
        method: 'DELETE'
      })
    }),
    removeTable: builder.mutation({
      query: tableId => ({
        url: `/table/${tableId}`,
        method: 'DELETE'
      })
    }),
    editTable: builder.mutation({
      query: ({id, fd}) => ({
        url: `/table/${id}`,
        method: 'PUT',
        body: fd
      })
    }),
    getTableById: builder.query({
      query: tableId => ({
        url: `/table/${tableId}`,
        method: 'GET'
      })
    })
  })
})


export const {
  useCheckTokenQuery,
  useRevokeTokenMutation,
} = reAuthApiSlice

export const {
  useLoginMutation,
  useSignupMutation,
  useAddTableMutation,
  useGetTablesQuery,
  useEditTableMutation,
  useLazyGetTablesQuery,
  useLazyGetTableByIdQuery,
  useRemoveTableMutation,
  useRemoveReservationMutation
} = authApiSlice


import * as React from 'react'
import {useGetTablesQuery} from "../store/api/authApiSlice"
import {useSelector} from "react-redux"
import {Grid} from '@mui/material'
import CustomPagination from "../uiComponents/customPagination"
import usePagination from "../hooks/usePagination"
import ConfirmDialog from "../uiComponents/confirmDialog";
import TableCard from "./tableCard";

interface MediaProps {
    loading?: boolean,
    table: {
        image: string
    }
}

const ITEMS_PER_PAGE = 4;

export default function Tables() {
    const tables = useSelector((state: any) => state.admin.tables)
    const {
        currentPage, changePage, pageCount,
    } = usePagination(tables, ITEMS_PER_PAGE);
// @ts-ignore
    const onPageChange = (event, value) => changePage(value);

    const getCurrentTables = () => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;

        return tables.slice(start, end);
    };

    return (
        <Grid container direction="row"
              justifyContent="center"
              alignItems="center" spacing={2}>
            {getCurrentTables().map((table: any) =>
                <Grid item md={6} lg={4}>
                    <TableCard table={table}/>
                </Grid>
            )}
            <Grid container direction="row"
                  justifyContent="center"
                  alignItems="center" item xs={12}>
                <CustomPagination
                    // @ts-ignore
                    itemCount={tables.length}
                    itemsPerPage={ITEMS_PER_PAGE}
                    onPageChange={onPageChange}
                    currentPage={currentPage}
                    pageCount={pageCount}
                />
            </Grid>
        </Grid>

    );
}

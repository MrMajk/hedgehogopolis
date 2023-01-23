import * as React from 'react'
import {useSelector} from "react-redux"
import {Grid} from '@mui/material'
import CustomPagination from "../uiComponents/customPagination"
import usePagination from "../hooks/usePagination"
import TableCard from "./tableCard";
import {StoreInterface} from "../types/store";
import {TableInterface} from "../types/table";


const ITEMS_PER_PAGE = 4;

export default function Tables() {
    const tables = useSelector((state: StoreInterface) => state.admin.tables)
    const {
        currentPage, changePage, pageCount,
    } = usePagination(tables, ITEMS_PER_PAGE);

    const onPageChange = (event:any, page:number) => changePage(page);

    const getCurrentTables = () => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;

        return tables.slice(start, end);
    };


    return (
        <Grid container direction="row"
              justifyContent="center"
              alignItems="center" spacing={2}>
            {getCurrentTables().map((table: TableInterface) =>
                <Grid item md={6} lg={4}>
                    <TableCard table={table}/>
                </Grid>
            )}
            <Grid container direction="row"
                  justifyContent="center"
                  alignItems="center" item xs={12}>
                <CustomPagination
                    onPageChange={onPageChange}
                    currentPage={currentPage}
                    pageCount={pageCount}
                />
            </Grid>
        </Grid>

    );
}

import * as React from 'react';
import {styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useSelector} from "react-redux";
import { Checkbox, FormControlLabel, FormGroup, useMediaQuery, useTheme} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import ConfirmDialog from "../uiComponents/confirmDialog";
import {Fragment, useEffect, useRef, useState} from "react";
import {useRemoveReservationMutation} from "../store/api/authApiSlice";
import ReservationList from "./reservation/list";

interface Data {
    guestName: string;
    table: string;
    startDate: string;
    endDate: string;
}

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        textAlign: 'center'
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        textAlign: 'center'
    },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));
const Reservations = () => {
    type ConfirmDialogHandle = React.ElementRef<typeof ConfirmDialog>;

    const reservations = useSelector((state: any) => state.admin.reservations)
    const dialogRef = useRef<ConfirmDialogHandle | null>(null)
    const [removeReservation] = useRemoveReservationMutation()
    const [filterdReservations, setFilterdReservations] = React.useState(reservations);
    const [reservationIdToRemove, setReservationIdToRemove] = useState(null);
    const isMobile = useMediaQuery(useTheme().breakpoints.down('md'))
    const removeOpenModal = (id: number) => {
        console.log('11111')
        // @ts-ignore
        setReservationIdToRemove(id)
        // @ts-ignore
        dialogRef?.current?.handleClickOpen()
    }

    const removeReservationHandle = () => {
        console.log('removeReservationHandle')
        removeReservation(reservationIdToRemove)
    }

    useEffect(() => {
        setFilterdReservations(reservations)
    }, [reservations]);


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const today = new Date().toDateString()
            console.log(reservations)
            // @ts-ignore
            setFilterdReservations(reservations.filter((element) => {
                console.log(new Date(element.startDate).toDateString(), today)
                return new Date(element.startDate).toDateString() === today
            }))
        } else {
            setFilterdReservations(reservations)
        }
    };

    return (
        <Fragment>
            <FormGroup>
                <FormControlLabel control={
                    <Checkbox onChange={handleChange}/>
                } label="Show only today"/>
            </FormGroup>
            {!isMobile && <TableContainer component={Paper}>
                {filterdReservations && <Table sx={{maxWidth: '1200px'}} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Quest</StyledTableCell>
                      <StyledTableCell>Phone</StyledTableCell>
                      <StyledTableCell>Start Date</StyledTableCell>
                      <StyledTableCell>End Date</StyledTableCell>
                      <StyledTableCell>Table</StyledTableCell>
                      <StyledTableCell>Seats</StyledTableCell>
                      <StyledTableCell>Delete</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                      {filterdReservations.map((element: any) => (
                          <StyledTableRow key={`table-${element.id}`}>
                              <StyledTableCell align="right">{element.guestName}</StyledTableCell>
                              <StyledTableCell align="right">{element.guestPhone}</StyledTableCell>
                              <StyledTableCell align="right">{element.startDate}</StyledTableCell>
                              <StyledTableCell align="right">{element.endDate}</StyledTableCell>
                              <StyledTableCell align="right">{element.tableName}</StyledTableCell>
                              <StyledTableCell align="right">{element.tableSeats}</StyledTableCell>
                              <StyledTableCell align="right">
                                  {/*@ts-ignore*/}
                                  <IconButton aria-label="delete" onClick={() => removeOpenModal(element.id)}>
                                      <DeleteIcon/>
                                  </IconButton>
                              </StyledTableCell>
                          </StyledTableRow>
                      ))}
                  </TableBody>
                </Table>
                }
              <ConfirmDialog
                confirmMessage='Are you sure you want to delete this reservation?'
                handleConfirm={removeReservationHandle}
                ref={dialogRef}
              />
            </TableContainer>}
            {isMobile && <ReservationList reservations={filterdReservations} removeReservation={removeReservationHandle}/>
            }
        </Fragment>
    );
}

export default Reservations

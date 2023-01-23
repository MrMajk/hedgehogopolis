import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {Fragment, useEffect, useRef, useState} from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmDialog from "../../uiComponents/confirmDialog";
import {useRemoveReservationMutation} from "../../store/api/authApiSlice";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import {Avatar, ListItem, ListItemAvatar, Typography, useTheme} from "@mui/material";
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import TableBarIcon from '@mui/icons-material/TableBar';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import {ReservationInterface, ReservationsForListInterface} from "../../types/reservations";


export default function ReservationList(props:{reservations:ReservationInterface[]}) {
    type CountdownHandle = React.ElementRef<typeof ConfirmDialog>;

    const {reservations} = props
    const [selectedIndex, setSelectedIndex] = useState("")
    const [selectedSubIndex, setSelectedSubIndex] = useState("")
    const [formattedReservations, setFormattedReservations] = useState<any>(reservations);
    const [reservationIdToRemove, setReservationIdToRemove] = useState<number | null>(null);
    const [removeReservation] = useRemoveReservationMutation()
    const dialogRef = useRef<CountdownHandle | null>(null)

    const handleMainIndex = (index: string) => {
        if (selectedIndex === index) {
            setSelectedIndex("")
            setSelectedSubIndex("")
        } else {
            setSelectedIndex(index)
            setSelectedSubIndex("")
        }
    }

    const handleSubIndex = (index: string) => {
        if (selectedSubIndex === index) {
            setSelectedSubIndex("")
        } else {
            setSelectedSubIndex(index)
        }
    }

    const removeOpenModal = (id: number) => {
        setReservationIdToRemove(id)
        dialogRef?.current?.handleClickOpen()
    }

    const removeReservationHandle = () => {
        removeReservation(reservationIdToRemove)
    }

    useEffect(() => {
        const groups: ReservationsForListInterface = reservations.reduce((groups: ReservationsForListInterface, reservations: ReservationInterface) => {
            const date = reservations.startDate.split('T')[0];
            if (!groups[date]) {
                groups[date] = [];
            }
            groups[date].push(reservations);
            return groups;
        }, {});

        const groupArrays = Object.keys(groups).map((date) => {
            return {
                date,
                reservations: groups[date]
            };
        });

        setFormattedReservations(groupArrays)
    }, [reservations]);


    return (
        <Fragment>
            <List
                component="nav"
                aria-labelledby="nested-list-subheader">
                {formattedReservations[0].reservations && formattedReservations.map((reservation: ReservationsForListInterface, index: string) => (
                    <Fragment>
                        <ListItemButton onClick={() => handleMainIndex(`main-${index}`)}>
                            <ListItemText key={`main-${index}`} primary={`${reservation.date}`}/>
                            {`main-${index}` === selectedIndex ? <ExpandLess/> : <ExpandMore/>}
                        </ListItemButton>

                        <Collapse in={`main-${index}` === selectedIndex} timeout="auto" unmountOnExit>
                            {reservation.reservations.map((reservation: ReservationInterface) => (
                                <Fragment>
                                    <ListItemButton key={`list-${reservation.id}`} onClick={() => handleSubIndex(`list-${reservation.id}`)}>
                                        <ListItemAvatar>
                                            <Avatar>
                                                {reservation.guestName[0]}
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={reservation.guestName}
                                            secondary={
                                                <>
                                                    <Typography
                                                        component="span"
                                                        variant="body2"
                                                    >
                                                        {reservation.startDate}
                                                    </Typography>
                                                    {' - '}
                                                    <Typography
                                                        component="span"
                                                        variant="body2"
                                                    >
                                                        {reservation.endDate}
                                                    </Typography>
                                                </>}/>
                                        {`list-${reservation.id}` === selectedSubIndex ? <ExpandLess/> : <ExpandMore/>}
                                    </ListItemButton>
                                    <Collapse in={`list-${reservation.id}` === selectedSubIndex} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            <ListItem>
                                                <ListItemIcon>
                                                    <AccessTimeIcon/>
                                                </ListItemIcon>
                                                <ListItemText primary={`Start date: ${reservation.startDate}`}/>
                                            </ListItem>
                                            <ListItem>
                                                <ListItemIcon>
                                                    <AccessTimeFilledIcon/>
                                                </ListItemIcon>
                                                <ListItemText primary={`End date: ${reservation.endDate}`}/>
                                            </ListItem>
                                            <ListItem>
                                                <ListItemIcon>
                                                    <PhoneAndroidIcon/>
                                                </ListItemIcon>
                                                <ListItemText primary={`Phone: ${reservation.guestPhone}`}/>
                                            </ListItem>
                                            <ListItem>
                                                <ListItemIcon>
                                                    <TableBarIcon/>
                                                </ListItemIcon>
                                                <ListItemText primary={`Table: ${reservation.tableName}`}/>
                                            </ListItem>
                                            <ListItem>
                                                <ListItemIcon>
                                                    <EventSeatIcon/>
                                                </ListItemIcon>
                                                <ListItemText primary={`Seats: ${reservation.tableSeats}`}/>
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText primary={'REMOVE'}/>
                                                <IconButton aria-label="delete" onClick={() => removeOpenModal(reservation.id)}>
                                                    <DeleteIcon/>
                                                </IconButton>
                                            </ListItem>

                                        </List>
                                    </Collapse>
                                </Fragment>
                            ))}
                        </Collapse>
                    </Fragment>
                ))}
            </List>
            <ConfirmDialog
                confirmMessage='Are you sure you want to delete this reservation?'
                handleConfirm={removeReservationHandle}
                ref={dialogRef}
            />
        </Fragment>
    );
}

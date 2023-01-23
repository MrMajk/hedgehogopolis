export interface ReservationInterface {
    id: number,
    guestName: string,
    guestPhone: string,
    startDate: string,
    endDate: string,
    tableName: string,
    tableSeats: number
}

export interface ReservationDBInterface {
    id: number,
    guest_name: string,
    guest_phone: string,
    start_date: string,
    end_date: string,
    table_name: string,
    table_seats: number
}

export interface ReservationsForListInterface {
    [date: string]: ReservationInterface[]
}



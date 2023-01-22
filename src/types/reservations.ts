export interface ReservationsTableInterface {
    reservations: {
        id: number,
        guestName: string,
        guestPhone: string,
        startDate: string,
        endDate: string,
        tableName: string,
        tableSeats: number
    }[]
}

export interface ReservationInterface {
    id: number,
    guestName: string,
    guestPhone: string,
    startDate: string,
    endDate: string,
    tableName: string,
    tableSeats: number
}

export interface ReservationsForListInterface {
    [date: string]: ReservationInterface[]
}



export interface TableInterface {
    id: number,
    name: string,
    seats: number,
    image: string,
    createdAt: string,
    updatedAt: string,
    userId: number,
    user: {
        email: string,
        nick: string,
        avatar: string
    }
}

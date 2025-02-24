export interface Reservation {
    id: string,
    movieId: string,
    roomId: string,
    scheduleTime: string,
    seatsReserved: string | undefined,
    userEmail: string
}
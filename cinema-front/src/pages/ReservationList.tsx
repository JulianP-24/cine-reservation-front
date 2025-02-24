import { useEffect, useState } from "react";
import { deleteReservationById, getReservations } from "../services/CinemaServices";
import { Reservation } from "../Models/Reservation";

const ReservationList = () => {
  const [reservation, setReservation] = useState([]);

  useEffect(() => {
    fecthReservation();
  }, []);

  const fecthReservation = async () => {
    const reservationData = await getReservations();
    setReservation(reservationData);
  };

  const deleteReservation = async (reservationId: string) => {
      const parseId = parseInt(reservationId);
      try {
        await deleteReservationById(parseId);
        setReservation(reservation.filter((reservation: Reservation) => reservation.id !== reservationId));
        alert("Reservacion eliminada")
      }catch (error) {
        alert("Erro al borrar la reservacion. Intenta de nuevo");
        console.error("Error al borrar:", error);
      }
    };

  return (
    <>
      <div className="container">
        <h2 className="text-center">Lista de Reservas</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">ID Pelicula</th>
              <th scope="col">ID Sala</th>
              <th scope="col">Hora</th>
              <th scope="col">Asientos Reservados</th>
              <th scope="col">Email</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reservation.map((reservation: Reservation) => (
              <tr key={reservation.id}>
                <td>{reservation.id}</td>
                <td>{reservation.movieId}</td>
                <td>{reservation.roomId}</td>
                <td>{reservation.scheduleTime}</td>
                <td>{reservation.seatsReserved}</td>
                <td>{reservation.userEmail}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteReservation(reservation.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ReservationList;

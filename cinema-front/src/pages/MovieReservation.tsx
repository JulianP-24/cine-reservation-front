import { useEffect, useState } from "react";
import { Reservation } from "../Models/Reservation";
import { Room } from "../Models/Room";
import { createMovieReservation } from "../services/CinemaServices";
import { useNavigate } from "react-router-dom";

const MovieReservation = () => {
  const navigate = useNavigate();

  const [selectedMovie, setSelectedMovie] = useState<Record<string, string>>(
    {}
  );
  const [rooms, setRooms] = useState([]);
  const [roomId, setRoomId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [seats, setSeats] = useState<string[]>([]);
  const [selectedSchedules, setSelectedSchedules] = useState<
    Record<string, string>
  >({});

  const DEFAULT_VALUE = 20;

  useEffect(() => {
    const localDataMovie = localStorage.getItem("movie");
    const localDataRoom = localStorage.getItem("room");
    if (localDataMovie && localDataRoom) {
      const parseMovieData = JSON.parse(localDataMovie);
      const parseRoomData = JSON.parse(localDataRoom);
      setSelectedMovie(parseMovieData);
      setRooms(parseRoomData);
    }
  }, []);

  useEffect(() => {
    if (rooms.length != 0) {
      const roomCapacity = rooms.find(
        (room: Room) => selectedMovie.id === room.id
      ) as Room | undefined;
      if (roomCapacity) {
        generateSeats(parseInt(roomCapacity.capacity));
      } else {
        generateSeats(DEFAULT_VALUE);
      }
    }
  }, [rooms, selectedMovie]);

  const generateSeats = (capacity: number) => {
    const rows = ["A", "B", "C", "D", "E", "F"];
    const seatsPerRow = Math.ceil(capacity / rows.length);
    const seats = [];

    for (let i = 0; i < rows.length; i++) {
      for (let j = 1; j <= seatsPerRow; j++) {
        if (seats.length < capacity) {
          seats.push(`${rows[i]}${j}`);
        }
      }
    }
    setSeats(seats);
  };

  const toggleSeat = (seat: string) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const reservationData: Reservation = {
      id: '',
      movieId: selectedMovie.id.toString(),
      roomId: roomId,
      scheduleTime: selectedSchedules[selectedMovie.id],
      seatsReserved: validateSeats(),
      userEmail: userEmail,
    };

    try {
      await createMovieReservation(reservationData);
      alert("Reserva creada con éxito!");
      localStorage.clear();
      navigate('/');
    } catch (error) {
      alert("Erro al reservar. Intenta de nuevo");
      console.error("Error al reservar:", error);
    }
  };

  const validateSeats = (): string | undefined => {
    if (selectedSeats.length !== 0) {
      return selectedSeats.toString();
    } else {
      return undefined;
    }
  };

  const handleScheduleChange = (movieId: string, schedule: string) => {
    setSelectedSchedules((prev) => ({
      ...prev,
      [movieId]: schedule,
    }));
  };

  return (
    <>
      <div className="container">
        <h2>Reservar Asientos para {selectedMovie.title}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Sala</label>
            <select
              className="form-select"
              value={roomId}
              onChange={(event) => setRoomId(event.target.value)}
              required
            >
              <option value="">Seleccione una sala</option>
              {rooms.map((room: Room) => (
                <option key={room.id} value={room.id}>
                  {room.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            {selectedMovie.schedules && (
              <select
                className="form-select"
                value={selectedSchedules[selectedMovie.id] || ""}
                onChange={(event) =>
                  handleScheduleChange(selectedMovie.id, event.target.value)
                }
                required
              >
                <option value="">Seleccionar horario</option>
                {selectedMovie.schedules.split(",").map((schedule, index) => (
                  <option key={index} value={schedule}>
                    {schedule}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Seleccione sus asientos:</label>
            <div
              className="d-flex flex-wrap justify-content-center border p-3 rounded bg-light"
              style={{ width: "400px" }}
            >
              {seats.map((seat: string) => (
                <button
                  type="button"
                  key={seat}
                  className={`btn btn-sm m-1 ${
                    selectedSeats.includes(seat)
                      ? "btn-success"
                      : "btn-outline-primary"
                  }`}
                  onClick={() => toggleSeat(seat)}
                >
                  {seat}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Correo Electrónico
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="test@ejemplo.com"
              onChange={(event) => setUserEmail(event.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Reservar
          </button>
        </form>
      </div>
    </>
  );
};

export default MovieReservation;

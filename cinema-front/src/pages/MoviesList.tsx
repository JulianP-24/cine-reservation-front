import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteMovieById, getMovies } from "../services/CinemaServices";
import { Movie } from "../Models/Movie";
import RoomsList from "./RoomsList";
import ReservationList from "./ReservationList";

const MoviesList = () => {
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fecthMovies();
  }, []);

  const fecthMovies = async () => {
    const moviesData = await getMovies();
    setMovies(moviesData);
  };

  const addReservation = async (movieId: string) => {
    const validRoom = await verifyRoomData();
    const movie = movies.find((movie: Movie) => movie.id === movieId) || {};

    if (movie && validRoom) {
      localStorage.setItem("movie", JSON.stringify(movie));
      navigate("/add-reservation");
    }
  };

  const verifyRoomData = async (): Promise<string> => {
    const localDataRoom = localStorage.getItem("room");
    if (localDataRoom) {
      return localDataRoom;
    }
    return "";
  };

  const deleteMovie = async (movieId: string) => {
    const parseId = parseInt(movieId);
    try {
      await deleteMovieById(parseId);
      setMovies(movies.filter((movie: Movie) => movie.id !== movieId));
      alert("Pelicula eliminada")
    }catch (error) {
      alert("Erro al borrar la pelicula. Intenta de nuevo");
      console.error("Error al borrar:", error);
    }
  };

  return (
    <>
      <div className="container">
        <h2 className="text-center">Lista de Peliculas</h2>
        <Link to='/add-movie' className="btn btn-primary mb-2">Agregar Pelicula</Link>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Titulo</th>
              <th scope="col">Genero</th>
              <th scope="col">Duracion</th>
              <th scope="col">Clasificacion</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie: Movie) => (
              <tr key={movie.id}>
                <td>{movie.id}</td>
                <td>{movie.title}</td>
                <td>{movie.genre}</td>
                <td>{movie.duration}</td>
                <td>{movie.classification}</td>
                <td>
                  <button
                    className="btn btn-info me-2"
                    onClick={() => addReservation(movie.id)}
                  >
                    Reservar
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteMovie(movie.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        <RoomsList></RoomsList>
        <br />
        <ReservationList></ReservationList>
      </div>
    </>
  );
};

export default MoviesList;

import { useState } from "react";
import { createMovie } from "../services/CinemaServices";
import { Movie } from "../Models/Movie";
import { useNavigate } from "react-router-dom";

const CreateMovie = () => {
  const navigate = useNavigate();

  const [movieTitle, setMovieTittle] = useState("");
  const [movieGenre, setMovieGenre] = useState("");
  const [movieDuration, setMovieDuration] = useState("");
  const [movieCalssification, setMovieClassification] = useState("");



  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const movieData: Movie = {
        id: '',
        title: movieTitle,
        genre: movieGenre,
        duration: movieDuration,
        classification: movieCalssification
    };

    try {
      await createMovie(movieData);
      alert("Pelicula creada con éxito!");
      localStorage.clear();
      navigate('/');
    } catch (error) {
      alert("Erro al crear la pelicula. Intenta de nuevo");
      console.error("Error al reservar:", error);
    }
  };


  return (
    <>
      <div className="container">
        <h2>Agrega una pelicula</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Titulo
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="tilte"
              placeholder="Titulo"
              onChange={(event) => setMovieTittle(event.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="genre" className="form-label">
              Genero
            </label>
            <input
              type="text"
              className="form-control"
              id="genre"
              name="genre"
              placeholder="Genero"
              onChange={(event) => setMovieGenre(event.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="duration" className="form-label">
              Duracion
            </label>
            <input
              type="text"
              className="form-control"
              id="duration"
              name="duration"
              placeholder="100 min"
              onChange={(event) => setMovieDuration(event.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="classification" className="form-label">
              Clasificacion
            </label>
            <input
              type="text"
              className="form-control"
              id="classification"
              name="classification"
              placeholder="Apta para todo publico"
              onChange={(event) => setMovieClassification(event.target.value)}
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

export default CreateMovie;

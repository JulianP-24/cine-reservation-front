import axios from "axios";
import { Reservation } from "../Models/Reservation";
import { Movie } from "../Models/Movie";

const CINEMA_MANAGEMENT_URL = "http://localhost:8080";

const axiosInstance = axios.create({
  baseURL: CINEMA_MANAGEMENT_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getMovies = async () => {
  const response = await axiosInstance.get("movies/find-movies");
  return response.data;
};

export const createMovie = async (movie: Movie) => {
  const response = await axiosInstance.post(
    "movies/create-movies",
    movie
  );
  return response.data;
};

export const deleteMovieById = async (movieId: number) => {
  return await axiosInstance.delete(`movies/delete-movie/${movieId}`)
}

export const createMovieReservation = async (ReservationData: Reservation) => {
  const response = await axiosInstance.post(
    "reservations/create-reservations",
    ReservationData
  );
  return response.data;
};

export const getRooms = async () => {
  const response = await axiosInstance.get("rooms/find-rooms");
  return response.data;
};

export const getReservations = async () => {
  const response = await axiosInstance.get("reservations/find-reservations");
  return response.data;
};

export const deleteReservationById = async (reservationId: number) => {
  return await axiosInstance.delete(`reservations/delete-reservation/${reservationId}`)
}

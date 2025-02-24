import { useEffect, useState } from "react";
import { getRooms } from "../services/CinemaServices";
import { Room } from "../Models/Room";

const RoomsList = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fecthRooms();
  }, []);

  const fecthRooms = async () => {
    const roomsData = await getRooms();
    setRooms(roomsData);
    localStorage.setItem("room", JSON.stringify(roomsData));
  };

  return (
    <>
      <div className="container">
        <h2 className="text-center">Lista de Salas</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nombre</th>
              <th scope="col">Capacidad</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room: Room) => (
              <tr key={room.id}>
                <td>{room.id}</td>
                <td>{room.name}</td>
                <td>{room.capacity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default RoomsList;

import axios from 'axios';
import React, { useState, useEffect } from "react";
import './Dashboard.css';
function Dashboard() {
  const [list, setList] = useState([]);
  const [listaPlataformas, setListPlat] = useState([]);
  const [listaGeneros, setListGen] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const juegosResponse = await axios.get("http://localhost:8000/juegosAll");
      setList(juegosResponse.data);
    } catch (error) {
      console.error(error);
    }

    try {
      /*La generos response es para cruzar el id con el nombre*/
      const generosResponse = await axios.get("http://localhost:8000/generos");
      setListGen(generosResponse.data);
    } catch (error) {
      console.error(error);
    }

    try {
      /*La plataformas response es para cruzar el id con el nombre*/
      const plataformasResponse = await axios.get("http://localhost:8000/plataformas");
      setListPlat(plataformasResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getGeneroName = (generoId) => {
    const genero = listaGeneros.find((item) => item.id === generoId);
    return genero ? genero.nombre : "";
  };

  const getPlataformaName = (plataformaId) => {
    const plataforma = listaPlataformas.find((item) => item.id === plataformaId);
    return plataforma ? plataforma.nombre : "";
  };

  return (
    <>
      <table className="Dashboard">
        <tbody>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Genero</th>
            <th>Plataforma</th>
            <th>Descripcion</th>
            <th>Imagen</th>
          </tr>
          {list.map((game) => (
            <tr key={game.id}>
              <td>{game.id}</td>
              <td>{game.nombre}</td>
              <td>{getGeneroName(game.id_genero)}</td>
              <td>{getPlataformaName(game.id_plataforma)}</td>
              <td>{game.descripcion}</td>
              <td>{game.imagen}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Dashboard;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Dashboard.css";
import NewJuego from "../components/NewJuego";

function Dashboard () {
    const [listGen, setGeneros] = useState([]);
    const [listPlat, setPlataforma] = useState([]);
    const [listJuegos, setJuegos] = useState([]);
    const [showFilter, setShowFilter] = useState(true); 

    const toggleForm = () => {
      setShowFilter(!showFilter);
    };
    const getJuegos = (params={}) => {
      axios
        .get("http://localhost:8000/juegos",{params})
        .then(function (response) {
            setJuegos(response.data);
        })
        .catch((error) => {
            console.error(error.response.data);
            setJuegos([]);
        });
    };
    const getGenero = () => {
      axios
        .get("http://localhost:8000/generos")
        .then(function (response) {
          setGeneros(response.data);
        })
        .catch((error) => console.error(error));
    };
    const getPlataforma = () => {
      axios
        .get("http://localhost:8000/plataformas")
        .then(function (response) {
          setPlataforma(response.data);
        })
        .catch((error) => console.error(error));
    };
    const buscarGeneroPorId = (id) => {
        return listGen.find((objeto) => objeto.id === id).nombre;
    };
    const buscarPlataformaPorId = (id) => {
        return listPlat.find((objeto) => objeto.id === id).nombre;
    };
    const handleFilter = ()=>{
        let select = document.querySelector("#genero");
        let genero = select.value;
        select = document.querySelector("#plataforma");
        let plataforma = select.value;
        select = document.querySelector("#az");
        let asc = select.value;
        select = document.querySelector("#name");
        let nombre = select.value;
        console.log(
          genero +
            "|Plataforma:" +
            plataforma +
            "|Asc: " +
            asc +
            "|Nombre: " +
            nombre
        );

        getJuegos({genero,plataforma,asc,nombre});
    }

    useEffect(() => {
      getGenero();
      getPlataforma();
      getJuegos();
    }, []);
  
    const decode = (type, img) => {
      return "data:image/" + type + ";base64," + img;
    };

  return (
      <>
      <nav className="navigation">
        <a 
        onClick={toggleForm} 
        className={showFilter ? "active" : ""}>
          Menu de Juegos
        </a>
        <a 
        onClick={toggleForm}
        className={!showFilter ? "active" : ""}
        >
        Agregar un Juego
        </a>
      </nav>
      {showFilter ? (
        <form className="container-formulario">
              <div className="container-input">
                <div id="filter-elecciones">
                  <label>
                    Nombre
                    <input
                      id="name"
                      name="name"
                      type="text"
                      onChange={handleFilter}
                    />
                  </label>
                  <label>
                    Genero
                    <select id="genero" name="genero" type="text" onChange={handleFilter}>
                      <option value="">All</option>
                      {listGen.map((genero) => (
                        <option key={genero.id} value={genero.id}>
                          {genero.nombre}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Plataforma
                    <select id="plataforma" name="plataforma" type="text" onChange={handleFilter}>
                      <option value="">All</option>
                      {listPlat.map((plataforma) => (
                        <option key={plataforma.id} value={plataforma.id}>
                          {plataforma.nombre}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Orden
                    <select id="az" name="az" type="text" onChange={handleFilter}>
                      <option value={true}>Ascendente</option>
                      <option value={""}>Descendente</option>
                    </select>
                  </label>
                  <button
                    className="bi bi-search"
                    onClick={handleFilter}
                    type="button"
                  >
                    Filtrar
                  </button>
                </div>
              </div>
            {listJuegos.map((data) => (
                <section>
                  <div className="juegos">
                    <article>
                      <a className="link" href={data.url} target="blank">
                        <div className="titles">
                          <h2 className="title">{data.nombre}</h2>
                          <h3 className="title">
                            {buscarGeneroPorId(data.id_genero)}
                          </h3>
                          <h4 className="title">
                            {buscarPlataformaPorId(data.id_plataforma)}
                          </h4>
                        </div>
                        <img src={decode(data.tipo_imagen, data.imagen)}></img>
                      </a>
                      <p className="desc-juego">{data.descripcion}</p>
                    </article>
                  </div>
                </section>
              ))}
        </form>
      ) : (<NewJuego generos={listGen} plataformas={listPlat} />)}
      </>
  );
}

export default Dashboard;

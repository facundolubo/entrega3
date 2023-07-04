import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Dashboard.css";
import NewJuego from "../components/NewJuego";

function Dashboard() {
  const [listGen, setGeneros] = useState([]);
  const [listPlat, setPlataforma] = useState([]);
  const [listJuegos, setJuegos] = useState([]);
  const [showFilter, setShowFilter] = useState(true);
  const [filterOptions, setFilterOptions] = useState({
    genero: '',
    plataforma: '',
    asc: '',
    nombre: ''
  });
  
  const toggleForm = () => {
    setShowFilter(!showFilter);
  };
  
  const getJuegos = (params) => {
    axios
      .get("http://localhost:8000/juegos", {params})
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

    const handleFilterChange = (e) => {
      setFilterOptions({
        ...filterOptions,
        [e.target.name]: e.target.value
      });
    };
    
    const handleFilter = (e) => {
      e.preventDefault();
      getJuegos(filterOptions);
    };
    
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
        <button
          onClick={toggleForm}
          className={showFilter ? "active" : ""}
          >
          Menu de Juegos
        </button>
        <button
          onClick={toggleForm}
          className={!showFilter ? "active" : ""}
        >
          Agregar un Juego
        </button>
      </nav>
      {showFilter ? (
        <form className="container-formulario" onSubmit={handleFilter}>
          <div className="container-input">
            <div id="filter-elecciones">
              <label>
                Nombre
                <input
                  id="name"
                  name="nombre"
                  type="text"
                  value={filterOptions.nombre}
                  onChange={handleFilterChange}
                />
              </label>
              <label>
                Genero
                <select
                  id="genero"
                  name="genero"
                  value={filterOptions.genero}
                  onChange={handleFilterChange}
                >
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
                <select
                  id="plataforma"
                  name="plataforma"
                  value={filterOptions.plataforma}
                  onChange={handleFilterChange}
                >
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
                <select
                  id="az"
                  name="asc"
                  value={filterOptions.asc}
                  onChange={handleFilterChange}
                >
                  <option value={true}>Ascendente</option>
                  <option value={""}>Descendente</option>
                </select>
              </label>
              <button className="navigation button" type="submit">Filtrar</button>
            </div>
          </div>
          <section className="juegos-container">
            <div className="juegos">
              {listJuegos.map((data) => (
                <article className="juego" key={data.id}>
                  <a
                    className="link"
                    href={`https://${data.url}`} // para escapar de la pagina
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className="titles">
                      <h2 className="title">{data.nombre}</h2>
                      <h3 className="title">
                        {buscarGeneroPorId(data.id_genero)}
                      </h3>
                      <h4 className="title">
                        {buscarPlataformaPorId(data.id_plataforma)}
                      </h4>
                    </div>
                    <img src={decode(data.tipo_imagen, data.imagen)} alt="" />
                  </a>
                  <p className="desc-juego">{data.descripcion}</p>
                </article>
              ))}
            </div>
          </section>
        </form>
      ) : (
        <NewJuego generos={listGen} plataformas={listPlat} />
      )}
    </>
  );
}

export default Dashboard;

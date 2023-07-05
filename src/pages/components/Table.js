import React, { useState, useEffect } from "react";

import "./Table.css";
import axios from "axios";
import Alert from "./Alert";

function Table(props) {
  const { type } = props;
  const [lista, setLista] = useState([]);
  const [action, setAction] = useState("");
  const [hiddenInput, setHiddenInput] = useState("");
  const [moddleHidden, setModdleHidden] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [alert, setAlert] = useState({'state':false});

  const getList = async () => {
    await axios
      .get(`http://localhost:8000/${type}`)
      .then(function (response) {
        setLista(response.data);
      })
      .catch((error) => console.error(error));
  };

  const deleteList = (id, nombre) => {
    const result = window.confirm(
      "¿Estás seguro que deseas eliminar " + nombre + "?"
    );
    if (result) {
      const deletes = async () => {
        await axios
          .delete(`http://localhost:8000/${type}/${id}`)
          .then((response) => {
            getList();
            setAlert({'state': true,'text': response.data,'status':response.status})
          })
          .catch((error) => {
            setAlert({'state': true,'text': error.response.data,'status': error.response.status,});
          });
      };
      deletes();
    }
  };

  const edit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") {
      alert("El nombre no puede estar vacio");
      return;
    }
    const nombre = {
      nombre: inputValue,
    };
    axios
      .put(`http://localhost:8000/${type}/${hiddenInput}`, nombre)
      .then(function (response) {
        getList();
        setAlert({"state": true,"text": response.data,"status": response.status,});
      })
      .catch((error) => setAlert({'state': true,'text':error.response.data,'status': error.response.status,}));
    handleCloseModdle();
  };

  const editList = (id, nombre) => {
    setHiddenInput(id);
    setAction("editar");
    setInputValue(nombre);
    setModdleHidden(false);
  };

  const handleCloseModdle = () => {
    setHiddenInput("");
    setAction("");
    setInputValue("");
    setModdleHidden(true);
  };

  const handleAddSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() === "") {
      alert("El nombre no puede estar vacio");
      return;
    }
    axios
      .post(`http://localhost:8000/${type}`, { nombre: inputValue })
      .then(function (response) {
        getList();
         setAlert({
           state: true,
           text: response.data,
           status: response.status,
         });
      })
      .catch((error) => setAlert({'state': true,'text':error.response.data,'status': error.response.data,}));
    handleCloseModdle();
  };

  const handleAdd = (type) => {
    setAction("agregar");
    setInputValue("");
    setModdleHidden(false);
  };
  const handleSubmit = (e) => { 
      if ((action === "editar")) {
        edit(e);
      } 
      else {
        handleAddSubmit(e);
      }
  }
  const handleAlertClose = () => {
    setAlert({"state":false});
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <div className="generoApp">
      <div className={`moddle ${moddleHidden ? "hidden" : ""}`}>
        <div className="out" id="out" onClick={handleCloseModdle}></div>
        <div className="moddle-element">
          <i onClick={handleCloseModdle}>X</i>
          <header>
            <h3 id="titleModdle">{action === "agregar" ? "AGREGAR" : "EDITAR"}</h3>
          </header>
          <main>
            <form noValidate>
              <label>nombre</label>
              <input id="nombre" value={inputValue}onChange={(e) => setInputValue(e.target.value)}></input>
              <button id="save" type="button" onClick={handleSubmit}>
                Guardar
              </button>
            </form>
          </main>
        </div>
      </div>
      {alert.state && <Alert respuesta={alert} onClose={handleAlertClose}/>}
      <header className="TitleHeader">
        <h2>Lista {props.type}</h2>
      </header>
      <main>
        <div className="container-list">
          <div>
            <button onClick={() => handleAdd(type)}>Agregar {type}</button>
          </div>
          <table id="tableModdle">
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Accion</th>
              </tr>
            </thead>
            <tbody>
              {lista.map((data) => (
                <tr key={data.id}>
                  <td>{data.id}</td>
                  <td>{data.nombre}</td>
                  <td>
                    <button
                      id="editar"
                      onClick={() => editList(data.id, data.nombre)}
                    >
                      editar
                    </button>
                    <button
                      id="eliminar"
                      onClick={() => deleteList(data.id, data.nombre)}
                    >
                      eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default Table;

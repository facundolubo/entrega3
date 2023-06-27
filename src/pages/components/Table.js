import React, { useState, useEffect } from "react";

import "./Table.css";
import axios from "axios";

function Table(props) {
    const { type } = props;

    const [lista, setLista] = useState([]);
    const getList = async() => {
        await axios
        .get(`http://localhost:8000/${type}`)
        .then(function (response) {
            setLista(response.data);
        })
        .catch((error) => console.error(error));
    };

    const deleteList = (id) => {
        const result = window.confirm(
          "¿Estás que deceas Eliminar el id " + id + "?"
        );  
        if(result){
            const deletes = async ()=>{
                await axios
                .delete(`http://localhost:8000/${type}/${id}`)
                .then((response) => {
                    // Actualizar la lista de géneros después de eliminar uno
                    getList();
                })
                .catch((error) => {
                    console.error("Error al eliminar el género:", error);
                });
            }
            deletes();
        }
        
    };

    const editList = (id, nombre) => {
        const moddle = document.querySelector(".moddle");
        const closeX = document.querySelector("i");
        const input = document.querySelector("#nombre");
        const save = document.querySelector("#save");
        const outed = document.querySelector("#out");
        const body = document.querySelector("body");
        const table = document.getElementById("tableModdle");

        body.style = 'overflow-y:hidden';

        table.scrollIntoView({ behavior: "smooth", block: "start" });
        
        outed.classList.remove("hidden");

        const exit = ()=>{
            body.style = "overflow-y:auto";
            outed.classList.add("hidden");
            moddle.classList.add("hidden");
        }

        document.addEventListener("keydown", function (event) {
          if (event.key === "Escape") {
            exit();
          }
        });

        input.value = nombre;
        closeX.addEventListener("click", () => {
            body.style = "overflow-y:auto";
            moddle.classList.add("hidden");
        });
        moddle.classList.remove("hidden");

        
        outed.addEventListener("click",()=> exit());

        save.addEventListener("click", () => {
                moddle.classList.add("hidden");
                let nombre = {
                    nombre: input.value,
                };
                console.log(nombre);
                axios
                .put(`http://localhost:8000/${type}/${id}`, nombre)
                .then(function (response) {
                    //!alerta del response
                    getList();
                })
                .catch((error) => console.error(error));
                exit();
        });
    };

    useEffect(() => {
        getList();
    }, []);

    

    return (
      <div className="generoApp">
        <div className="moddle hidden">
          <div className="out" id="out"></div>
          <div className="moddle-element">
            <i>x</i>
            <header>
              <h3>EDITAR</h3>
            </header>
            <main>
              <form>
                <label>nombre</label>
                <input id="nombre"></input>
                <button id="save" type="button">
                  save
                </button>
              </form>
            </main>
          </div>
        </div>
        <header className="TitleHeader">
          <h2>Lista {props.type}</h2>
        </header>
        <main>
          <div className="container-list">
            <div>
              <a>Agregar Genero</a>
            </div>
            <table id="tableModdle">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Nombre</th>
                  <th>accion</th>
                </tr>
              </thead>
              <tbody>
                {lista.map((data, index) => (
                  <tr key={index}>
                    <td>{data.id}</td>
                    <td>{data.nombre}</td>
                    <td>
                      <button
                        id="editar"
                        onClick={() => editList(data.id, data.nombre)}
                      >
                        editar
                      </button>
                      <button id="eliminar" onClick={() => deleteList(data.id)}>
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

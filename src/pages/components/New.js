import './New.css';
import axios from "axios";

function New(props) {
    const type = props.tipo;
    const Create = ()=>{
        axios
          .post(`http://localhost:8000/${type}`)
          .then(function (response) {
            alert(response);
          })
          .catch((error) => console.error(error));
    }
    return (
        <div>
        <form className="NewForm">
            <h2> ESCRIBA EL AGREGAR</h2>
            <label>NOMBRE</label>
            <input></input>
            <div>
            <button>submit</button>
            </div>
        </form>
        </div>
    );
}

export default New;

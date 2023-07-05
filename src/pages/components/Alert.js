
import "./Alert.css";
function Alert({respuesta,onClose}) {

  return (
    <div className={`alert ${respuesta.status === 200 ? "correct" : ""}`}>
      {`${respuesta.status ===200?"Exitosa":"Error: "+respuesta.status}`}
      <i onClick={onClose}>x</i>
    </div>
  );
}

export default Alert;

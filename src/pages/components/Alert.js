
import "./Alert.css";
function Alert({respuesta,onClose}) {

  return (
    <div className={`alert ${respuesta.status === 200 ? "correct" : ""}`}>
      {`${respuesta.status === 200 ? respuesta.text : respuesta.text}`}
      <i onClick={onClose}>x</i>
    </div>
  );
}

export default Alert;

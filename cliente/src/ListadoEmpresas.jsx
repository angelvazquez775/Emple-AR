import { useState, useEffect } from "react";
import axios from "axios";

function ListadoEmpresas() {
  const [empresas, setEmpresas] = useState([]);
  const [elementoEliminado, setElementoEliminado] = useState(null)
  useEffect(() => {
    async function fetchEmpresas() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/listar_empresas")
        setEmpresas(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchEmpresas()
  }, [])

   const eliminarElemento = async (elementoId) => {
    try {
      const response = await axios.delete(`http://localhost:8000/eliminar_elemento/${elementoId}`);
      setElementoEliminado(response.data.mensaje);
      const nuevosElementos = empresas.filter((empresa, index) => index !== elementoId);
      setEmpresas(nuevosElementos);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="empresa-container">
      <h1 className="title">Empresas Registradas</h1>
      <ul>
        {empresas.map((empresa, index) => (
          <div key={index} className="cont-empresa">
            <p className="item-a">Nombre: {empresa.nombre}</p>
            <p className="item-b">Contraseña: {empresa.contraseña}</p>
            <p className="item-b">Razón Social: {empresa.razon_social}</p> 
            <p className="item-c">Descripción: {empresa.descripcion}</p> 
            <p className="item-c">Sitio Web: {empresa.web}</p> 
            <p className="item-c">Contacto: {empresa.contacto}</p> 
            <button onClick={() => eliminarElemento(index)} className="delete-btn">ELIMINAR</button>
          </div>
        ))}
      </ul>
    </div>
  )
}

export default ListadoEmpresas

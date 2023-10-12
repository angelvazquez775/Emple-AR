import { useState } from "react"
import { useEffect } from "react"
import axios from "axios"
function ListadoOfertas () {
    const [listaOfertas, setListaOfertas] = useState([]);
    const [elementoEliminado, setElementoEliminado] = useState(null)
    useEffect(() => {
      async function fetchEmpresas() {
        try {
          const response = await axios.get("http://127.0.0.1:8000/listar_ofertas")
          setListaOfertas(response.data)
        } catch (error) {
          console.error(error)
        }
      }
  
      fetchEmpresas()
    }, [])

    const eliminarOferta = async (elementoId) => {
        try {
          const response = await axios.delete(`http://localhost:8000/eliminar_oferta/${elementoId}`);
          setElementoEliminado(response.data.mensaje)
          const nuevosElementos = listaOfertas.filter((oferta, index) => index !== elementoId);
          setListaOfertas(nuevosElementos);
        } catch (error) {
          console.error(error);
        }
      }

    return(
        <>
            <div className="empresa-container">
      <h1 className="title">Ofertas Publicadas</h1>
            <ul>
                {listaOfertas.map((oferta, index) => (
                <div key={index} className="cont-empresa">
                    <p className="item-a">Nombre: {oferta.nombre}</p>
                    <p className="item-b">Titulo: {oferta.titulo}</p>
                    <p className="item-c">Descripción: {oferta.descripcion}</p> 
                    <p className="item-b">Localidad: {oferta.localidad}</p> 
                    <p className="item-b">Modalidad: {oferta.modalidad}</p> 
                    <p className="item-b">Horas: {oferta.horas}</p> 
                    <p className="item-c">Vacantes disponibles: {oferta.puestos}</p> 
                    <p className="item-c">Estado: {oferta.contacto === true ? "Activo" : "Inactivo"}</p> 
                    <button onClick={() => eliminarOferta(index)} className="delete-btn">ELIMINAR</button>
                </div>
                ))}
            </ul>
        </div>
        </>
    )
}

export default ListadoOfertas
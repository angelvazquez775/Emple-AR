import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
function ListadoETP () {

    const [instETP, setInstETP] = useState([]);
    const [elementoEliminado, setElementoEliminado] = useState(null)
    useEffect(() => {
        async function fetchETP() {
        try {
            const response = await axios.get("http://127.0.0.1:8000/listar_ETP")
            setInstETP(response.data)
        } catch (error) {
            console.error(error)
        }
        }

        fetchETP()
    }, [])

    const eliminarElemento = async (elementoId) => {
        try {
        const response = await axios.delete(`http://localhost:8000/eliminar_ETP/${elementoId}`);
        setElementoEliminado(response.data.mensaje);
        const nuevosElementos = instETP.filter((empresa, index) => index !== elementoId);
        setInstETP(nuevosElementos);
        } catch (error) {
        console.error(error);
    }
  }

    return(
        <>
            <div className="empresa-container">
                <h1 className="title">Instituciones ETP Registradas</h1>
                <ul>
                    {instETP.map((inst, index) => (
                    <div key={index} className="cont-empresa">
                        <p className="item-a">Nombre: {inst.nombre}</p>
                        <p className="item-b">Contraseña: {inst.contraseña}</p>
                        <p className="item-b">Clave CUE: {inst.claveCUE}</p> 
                        <p className="item-c">Direccion: {inst.direccion}</p> 
                        <p className="item-c">Codigo Postal: {inst.codigoPostal}</p> 
                        <p className="item-c">Localidad: {inst.localidad}</p> 
                        <p className="item-c">Contacto: {inst.contacto}</p> 
                        <button onClick={() => eliminarElemento(index)} className="delete-btn">ELIMINAR</button>
                    </div>
                    ))}
                </ul>
            </div>
        </>
    )
}
export default ListadoETP
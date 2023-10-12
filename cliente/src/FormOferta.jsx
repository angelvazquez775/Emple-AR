import { useState } from "react"
import { useEffect } from "react"
import axios from "axios"
function FormOferta ({setOfertList}) {
    const [nuevaOferta, setNuevaOferta ] = useState({
        nombre_empresa: "",
        titulo: "",
        descripcion: "",
        localidad: "",
        modalidad: "",
        horas: "",
        puestos: 0,
        estado: false
      })
    
    const [respuesta, setRespuesta] = useState("")
    const [mensaje, setMensaje] = useState(false)

    const handleChange = (event) => {
    const { name, value } = event.target
    setNuevaOferta({
      ...nuevaOferta,
      [name]: value,
    })
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/nueva_oferta", nuevaOferta);
      setRespuesta(response.data.mensaje)
      setOfertList(true)
    } catch (error) {
      console.error(error)
    }
  }

    return(
        <>
            <div className="form-container">
                <h1 className="form-title">Completa el formulario para añadir una nueva oferta</h1>
                <form onSubmit={handleSubmit} className="form">
                    <label className="label-form">Nombre de la empresa:</label> 
                    <input
                    type="text"
                    name="nombre_empresa"
                    value={nuevaOferta.nombre_empresa}
                    onChange={handleChange}
                    />
                    <label className="label-form">Titulo:</label>
                    <input
                        type="text"
                        name="titulo"
                        value={nuevaOferta.titulo}
                        onChange={handleChange}
                    />
                    
                    <label className="label-form">Descripción: </label>
                    <textarea
                        name="descripcion"
                        value={nuevaOferta.descripcion}
                        onChange={handleChange}
                    />
                    <label className="label-form">Localidad:</label>
                    <input
                        type="text"
                        name="localidad"
                        value={nuevaOferta.localidad}
                        onChange={handleChange}
                    />
                    
                    <label className="label-form">Modalidad:</label>
                    <input
                    type="text"
                    name="modalidad"
                    value={nuevaOferta.modalidad}
                    onChange={handleChange}
                    />
                    <label className="label-form">Horas:</label>
                    <input
                    type="text"
                    name="horas"
                    value={nuevaOferta.horas}
                    onChange={handleChange}
                    />
                    <label className="label-form">Puestos disponibles:</label>
                    <input
                    type="number"
                    name="puestos"
                    value={nuevaOferta.puestos}
                    onChange={handleChange}
                    />
                    <label className="label-form">Disponible:</label>
                    <input
                    type="radio"
                    name="estado"
                    value={nuevaOferta.estado}
                    onChange={handleChange}
                    />            
                    <button type="submit" className="submit-btn">Registrar Empresa</button>
                </form>
                {respuesta && <p>{respuesta}</p>}
            </div>
        </>
    )
}

export default FormOferta
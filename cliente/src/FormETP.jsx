import { useState } from "react"
import { useEffect } from "react"
import axios from "axios"
function FormETP ({setFormETP, setListETP}) {
    const [institucionETP, setinstitucionETP] = useState({
        nombre: "",
        contraseña: "",
        claveCUE: "",
        direccion: "",
        codigoPostal: 0,
        localidad: "",
        contacto: ""
      })
      const [respuesta, setRespuesta] = useState("")
      const [mensaje, setMensaje] = useState(false)
    
      const handleChange = (event) => {
        const { name, value } = event.target
        setinstitucionETP({
          ...institucionETP,
          [name]: value,
        })
      }
      const handleGenerate = () => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?" 
        let password = ""
        for(let i = 0; i < 12; i++){
          let caracterAleatorio = chars[Math.floor(Math.random() * chars.length)]
          password += caracterAleatorio
        }
        setinstitucionETP({
          ...institucionETP,
          contraseña : password
        })
        setMensaje(true)
      }
      const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          if(institucionETP){

          }
          const response = await axios.post("http://127.0.0.1:8000/registrar_ETP", institucionETP)
          setRespuesta(response.data.mensaje)
          setFormETP(false)
          setListETP(true)
        } catch (error) {
          console.error(error)
        }}
    return(
        <>
            <div className="form-container">
                <h1 className="form-title">Completa el formulario para añadir una ETP</h1>
                <form onSubmit={handleSubmit} className="form">
                    <label className="label-form">Nombre de la Institucion:</label> 
                    <input
                    required
                    type="text"
                    name="nombre"
                    value={institucionETP.nombre}
                    onChange={handleChange}
                    />
                    <label className="label-form">Introduzca el CUE:</label>
                    <input
                        required
                        type="text"
                        name="claveCUE"
                        value={institucionETP.claveCUE}
                        onChange={handleChange}
                    />
                    
                    <label className="label-form">Direccion: </label>
                    <input
                        required
                        type="text"
                        name="direccion"
                        value={institucionETP.direccion}
                        onChange={handleChange}
                    />
                    <label className="label-form">Codigo Postal:</label>
                    <input
                        required
                        type="number"
                        name="codigoPostal"
                        value={institucionETP.codigoPostal}
                        onChange={handleChange}
                    />
                    
                    <label className="label-form">Localidad:</label>
                    <input
                      required
                      type="text"
                      name="localidad"
                      value={institucionETP.localidad}
                      onChange={handleChange}
                    />

                    <label className="label-form">Contacto:</label>
                    <input
                      required
                      type="text"
                      name="contacto"
                      value={institucionETP.contacto}
                      onChange={handleChange}
                    />
                    {mensaje === false ? <h2 type="none" className="password-btn" onClick={() => handleGenerate()}>Generar Contraseña</h2> : <h2 className="form-title">Contraseña generada correctamente</h2>}
                    
                    <button type="submit" className="submit-btn">Registrar Escuela</button>
                </form>
            </div>
        </>
    )
}
export default FormETP
import { useState } from "react"
import axios from "axios"

function FormEmpresa({setForm, setListadoEmpresas}) {
  const [empresa, setEmpresa] = useState({
    nombre: "",
    contraseña: "",
    razon_social: "",
    descripcion: "",
    web: "",
    contacto: "",
  })
  const [respuesta, setRespuesta] = useState("")
  const [mensaje, setMensaje] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setEmpresa({
      ...empresa,
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
    setEmpresa({
      ...empresa,
      contraseña : password
    })
    setMensaje(true)
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/registrar_empresa", empresa);
      setRespuesta(response.data.mensaje)
      setForm(false)
      setListadoEmpresas(true)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className="form-container">
      <h1 className="form-title">Completa el formulario para añadir una empresa</h1>
      <form onSubmit={handleSubmit} className="form">
        <label className="label-form">Nombre de la empresa:</label> 
        <input
          type="text"
          name="nombre"
          value={empresa.nombre}
          onChange={handleChange}
        />
        <label className="label-form">Razón Social:</label>
          <input
            type="text"
            name="razon_social"
            value={empresa.razon_social}
            onChange={handleChange}
          />
        
        <label className="label-form">Descripción: </label>
          <textarea
            name="descripcion"
            value={empresa.descripcion}
            onChange={handleChange}
          />
        <label className="label-form">Sitio Web:</label>
          <input
            type="text"
            name="web"
            value={empresa.web}
            onChange={handleChange}
          />
        
        <label className="label-form">Contacto:</label>
        <input
          type="text"
          name="contacto"
          value={empresa.contacto}
          onChange={handleChange}
        />
        {mensaje === false ? <h2 type="none" className="password-btn" onClick={() => handleGenerate()}>Generar Contraseña</h2> : <h2 className="form-title">Contraseña generada correctamente</h2>}
        
        <button type="submit" className="submit-btn">Registrar Empresa</button>
      </form>
      {respuesta && <p>{respuesta}</p>}
    </div>
  )
}

export default FormEmpresa

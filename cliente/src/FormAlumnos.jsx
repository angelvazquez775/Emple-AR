import { useState } from "react"
import { useEffect } from "react"
import axios from "axios"
function FormAlumnos ({setRegister, listaAlumnos, setListaAlumnos}) {
    const [alumnos, setAlumnos] = useState({
        nombre: "",
        apellido: "",
        contraseña: "",
        dni: "",
        escuela: "",
        egresado: "",
        titulo: ""
      })
      const [respuesta, setRespuesta] = useState("")
      const [mensaje, setMensaje] = useState(false)
      const [etpData, setEtpData] = useState([])
      const [selectedOption, setSelectedOption] = useState('')

      useEffect(() => {
        async function fetchETP() {
        try {
            const response = await axios.get("http://127.0.0.1:8000/listar_ETP")
            setEtpData(response.data)
        } catch (error) {
            console.error(error)
        }
        }

        fetchETP()
      }, [])

      const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
      }
    
      const handleChange = (event) => {
        const { name, value } = event.target
        setAlumnos({
          ...alumnos,
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
        setAlumnos({
          ...alumnos,
          contraseña : password
        })
        setMensaje(true)
      }
      const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const response = await axios.post("http://127.0.0.1:8000/registrar_alumno", alumnos)
          setRespuesta(response.data.mensaje)
          setRegister(false)
        } catch (error) {
          console.error(error)
        }}
    return(
        <>
          <div className="difuminado">
            <div className="form-container-register">
                <h1 className="form-title">Completa el formulario para regitrarte</h1>
                <form onSubmit={handleSubmit} className="form">
                    <label className="label-form">Nombre:</label> 
                    <input
                    type="text"
                    name="nombre"
                    value={alumnos.nombre}
                    onChange={handleChange}
                    />
                    <label className="label-form">Apellido:</label>
                    <input
                        type="text"
                        name="apellido"
                        value={alumnos.apellido}
                        onChange={handleChange}
                    />
                    
                    <label className="label-form">D.N.I: </label>
                    <input
                        type="text"
                        name="dni"
                        value={alumnos.dni}
                        onChange={handleChange}
                    />
                    <label className="label-form">Escuela:</label>
                    <select value={selectedOption} onChange={handleSelectChange} className="select">
                      {etpData.map((data, index) => (
                        <option key={index} value={data.nombre}>
                          {data.nombre}
                        </option>
                      ))}
                    </select>
                    
                    <label className="label-form">Egresado:</label>
                    <input
                    type="text"
                    name="egresado"
                    value={alumnos.egresado}
                    placeholder="si o no"
                    onChange={handleChange}
                    />

                    <label className="label-form">Titulo:</label>
                    <input
                    type="text"
                    name="titulo"
                    value={alumnos.titulo}
                    onChange={handleChange}
                    />
                    {mensaje === false ? <h2 type="none" className="password-btn" onClick={() => handleGenerate()}>Generar Contraseña</h2> : <h2 className="form-title">Contraseña generada correctamente</h2>}
                    <div className="btn-container">
                      <button type="submit" className="submit-btn">Registrar Empresa</button>
                      <button onClick={() => setRegister(false)} className="cancel-btn">Cancelar</button>
                    </div>
               </form>
            </div>
          </div>
        </>
    )
}
export default FormAlumnos
import { useState } from "react"
import { useEffect } from "react"
import axios from "axios"
import ListadoOfertas from "./ListadoOfertas"
function LogInForm ({setLogInForm, setAddEmpresa, userData, setOferta,setUser, setAddInstETP, setOfEdu, setIndex, setNombreEmpresa, nombreEmpresa}) {
    
    const [userName, setUserName] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [error, setError] = useState(false)

    const [listadoEmpresas, setListadoEmpresas] = useState([])
    const [listadoETP, setListadoETP] = useState([])
    useEffect(() => {
        async function fetchEmpresas() {
          try {
            const response = await axios.get("http://127.0.0.1:8000/listar_empresas")
            setListadoEmpresas(response.data)
          } catch (error) {
            console.error(error)
          }
        }
    
        fetchEmpresas()
      }, [])
      useEffect(() => {
        async function fetchOferEdu() {
          try {
            const response = await axios.get("http://127.0.0.1:8000/listar_ETP")
            setListadoETP(response.data)
          } catch (error) {
            console.error(error)
          }
        }
    
        fetchOferEdu()
      }, [])

    const handleSubmit = (event) => {

        event.preventDefault()
        if(userName == '' || userPassword == ''){
            setError(true)  
            setTimeout(() => {
                setError(false)
            }, 2000)
        }
        if(userName == userData.name && userPassword == userData.password){
            setLogInForm(false)
            setAddEmpresa(true)
            setAddInstETP(true)
            setOferta(false)
            setUser("Inet01")
            setListadoEmpresas(true)
        }else{ 
            for(const emp of listadoEmpresas){
                if(emp.nombre == userName && emp.contraseña == userPassword){
                    setLogInForm(false)
                    setAddEmpresa(false)
                    setOferta(true)
                    setUser(emp.nombre)
                    break
                }
            }
            for(const ofer of listadoETP){
                if(ofer.nombre == userName && ofer.contraseña == userPassword){
                    setLogInForm(false)
                    setAddEmpresa(false)
                    setOferta(false)
                    setUser(ofer.nombre)
                    setOfEdu(true)
                    break
                }
            }
        }
    }

    return(
        <>
            <div className="form-container">
                <form className="form" onSubmit={handleSubmit}>
                    <h2 className="form-title">Iniciar Sesion</h2>
                    <label htmlFor="user-name"><b>Nombre de usuario:</b></label>
                    <input type="text" id="user-name" 
                        onChange={(event) => setUserName(event.target.value)}
                    />
                    <label htmlFor="user-password"><b>Contraseña:</b></label>
                    <input type="password" id="user-password"
                        onChange={(event) => setUserPassword(event.target.value)}
                    />
                    {error === true && <h2 className="error">Datos erroneos</h2>}
                    <input type="submit" value={'Iniciar Sesion'} className="submit-btn" />
                </form>
            </div>
        </>
    )
}

export default LogInForm
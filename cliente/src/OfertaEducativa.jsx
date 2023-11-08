import { useState } from "react"
import { useEffect } from "react"
import axios from "axios"
function OfertaEducativa ({user}) {

  const [listaAlumnos, setListaAlumnos] = useState([]);
  const [nuevaLista, setNuevaLista] = useState([])
  const [elementoEliminado, setElementoEliminado] = useState(null)
  useEffect(() => {
    async function fetchEmpresas() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/listar_alumnos")
        setListaAlumnos(response.data)
        console.log(user)
        for(const alumno of listaAlumnos){
          if(alumno.escuela === user){
              setNuevaLista([...nuevaLista, alumno])
              for(const alumno of listaAlumnos){
                if(alumno.escuela === user){
                    setNuevaLista([...nuevaLista, alumno])
                    console.log(nuevaLista)
                }else{
                  console.log("False")
                }
              }
              console.log(nuevaLista)
          }
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchEmpresas()
  }, [])

  return(
      <>
          <div className="empresa-container">
          <h1 className="title">Alumnos</h1>
          <button onClick={() => fetchAlumnos()}>Actualizar</button>
          <ul>
              {nuevaLista.map((alumno, index) => (
              <div key={index} className="cont-empresa">
                  <p className="item-a">Nombre: {alumno.nombre}</p>
                  <p className="item-b">Apellido: {alumno.apellido}</p>
                  <p className="item-c">Contraseña: {alumno.contraseña}</p> 
                  <p className="item-b">D.N.I: {alumno.dni}</p> 
                  <p className="item-b">Institucion: {alumno.escuela}</p> 
                  <p className="item-b">Egresado: {alumno.egresado}</p> 
                  <p className="item-b">Titulo: {alumno.titulo}</p>
              </div>
              ))}
          </ul>
      </div>
      </>
  )
}

export default OfertaEducativa
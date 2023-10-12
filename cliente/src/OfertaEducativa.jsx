import { useState } from "react"
import { useEffect } from "react"
import axios from "axios"
function OfertaEducativa ({user, listaAlumnos, setListaAlumnos}) {

    useEffect(() => {
      axios.get('/listar_alumnos')
        .then(response => setListaAlumnos(response.data))
        .catch(error => console.error('Error:', error));
    }, []);

    const [nuevaLista, setNuevaLista] = useState([])

    const encontrar = () => {
      for(const alumno of listaAlumnos){
          console.log(listaAlumnos)
          console.log(alumno.escuela)
          if(alumno.escuela === user){
            setNuevaLista([...nuevaLista, alumno])
            console.log(nuevaLista)
          }
      }
    }

    return(
      <>
        <h1>{user}</h1>
        <button onClick={() => encontrar()}>Actualizar</button>
      </>
    )
}

export default OfertaEducativa
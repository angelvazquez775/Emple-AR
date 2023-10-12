import { useState, useEffect } from "react"
import axios from "axios"
import Nav from "./Nav"
import MainText from "./MainText"
import AcercaDe from "./AcercaDe"
import LogInForm from "./LogInForm"
import FormEmpresa from "./FormEmpresa"
import ListadoEmpresas from "./ListadoEmpresas"
import FormOferta from "./FormOferta"
import ListadoOfertas from "./ListadoOfertas"
import FormETP from "./FormETP"
import ListadoETP from "./ListadoETP"
import OfertaEducativa from "./OfertaEducativa"
import FormAlumnos from "./FormAlumnos"
function App () {
  const [acercaDe, setAcercaDe] = useState(false)
  const [logInForm, setLoginForm] = useState(false)
  const [mainText, setMainText] = useState(true)
  const [form, setForm] = useState(false)
  const [listadoEmpresas, setListadoEmpresas] = useState(false)
  const [addEmpresa, setAddEmpresa] = useState(false)
  const [formEmpresa, setformEmpresa] = useState(false)
  const [oferta, setOferta] = useState(false)
  const [addInstETP, setAddInstETP] = useState(false)
  const [user, setUser] = useState("")
  const [formOfertas, setFormOfertas] = useState(false)
  const [ofertList, setOfertList] = useState(false)
  const [formETP, setFormETP] = useState(false)
  const [listETP, setListETP] = useState(false)
  const [register, setRegister] = useState(false)
  const [ofEdu, setOfEdu] = useState(false)
  const [index, setIndex] = useState("")
  const [listaAlumnos, setListaAlumnos] = useState([])
  const [nombreEmpresa, setNombreEmpresa] = useState("")
  


  const handleAdd = () => {
    setListadoEmpresas(false)
    setForm(true)
    setOferta(false)
  }
  const handleAddOferta = () => {
    setListadoEmpresas(false)
    setFormOfertas(true)
    setOferta(false)
    setFormETP(false)

  }
  const handleAddETP = () => {
    setOferta(false)
    setFormETP(true)
  }
  const userData = {
    name: 'Inet01',
    password: 'Inet2023'
  }

  return(
    <>  
      {register === true && <FormAlumnos
        setRegister={setRegister}
        setListaAlumnos={setListaAlumnos}
        listaAlumnos = {listaAlumnos}
      ></FormAlumnos>}
      <Nav
        setMainText = {setMainText}
        setLogInForm = {setLoginForm}  
        setAcercaDe = {setAcercaDe}
        setAddEmpresa = {setAddEmpresa}
        setAddInstETP = {setAddInstETP}
        setListETP = {setListETP}
        addEmpresa = {addEmpresa}
        setForm = {setForm}
        setListadoEmpresas = {setListadoEmpresas}
        oferta={oferta}
        user = {user}
        setOferta={setOferta}
        setOfertList={setOfertList}
        setformEmpresa = {setformEmpresa}
      ></Nav>
      {ofEdu === true && <OfertaEducativa
        listaAlumnos = {listaAlumnos}
        setListaAlumnos = {setListaAlumnos}
        user = {user}
      ></OfertaEducativa>}
      {formOfertas === true && <FormOferta
      setOfertList={setOfertList}
      ></FormOferta>}
      {ofertList === true && <ListadoOfertas
        nombreEmpresa = {nombreEmpresa}
      ></ListadoOfertas>}
      {mainText === true && <MainText
        setRegister = {setRegister}
      ></MainText>}  
      {acercaDe === true && <AcercaDe></AcercaDe>}
      {logInForm === true && <LogInForm
        setIndex = {setIndex}
        setForm={setForm}
        userData={userData}
        setAddEmpresa = {setAddEmpresa}
        setAddInstETP = {setAddInstETP}
        setLogInForm={setLoginForm}
        setOferta = {setOferta}
        setUser = {setUser}
        setOfEdu = {setOfEdu}
        setNombreEmpresa = {setNombreEmpresa}
        nombreEmpresa = {nombreEmpresa}
      ></LogInForm>}
      <div className="both-cont">
        <div>
          {addEmpresa === true && <h2 onClick={() => handleAdd()} className="btn">AÑADIR EMPRESA</h2>}
          {form === true && <FormEmpresa
            setForm = {setForm}
            setListadoEmpresas = {setListadoEmpresas}
          ></FormEmpresa>}
          {listadoEmpresas === true && <ListadoEmpresas
          ></ListadoEmpresas>}
        </div>
        <div>
          {addInstETP === true && <h2 onClick={() => handleAddETP()} className="btn">AÑADIR ETP</h2>}
          {formETP === true && <FormETP
            setFormETP={setFormETP}
            setListETP={setListETP}
          ></FormETP>}
          {listETP === true && <ListadoETP></ListadoETP>}
        </div>
      </div>
      
      {oferta === true && <h2 onClick={() => handleAddOferta()} className="btn">NUEVA OFERTA</h2>}
      
    </>
  )
}

export default App
function Nav ({setAcercaDe, setLogInForm, setMainText, setAddEmpresa, addEmpresa, setForm, setListadoEmpresas, setOferta, oferta, user, setOfertList, setAddInstETP, setListETP}) {

    const handleInicio = () => {
        setMainText(true)
        setAcercaDe(false)
        setLogInForm(false)
        setAddEmpresa(false)
        setForm(false)
        setListadoEmpresas(false)
        setOferta(false)
        setOfertList(false)
        setAddInstETP(false)
        setListETP(false)
    }
    const handleAcercaDe = () => {
        setMainText(false)
        setAcercaDe(true)
        setLogInForm(false)
        setAddEmpresa(false)
        setForm(false)
        setListadoEmpresas(false)
        setOferta(false)
        setOfertList(false)
        setListETP(false)

    }
    const handleLogIn = () => {
        setMainText(false)
        setAcercaDe(false)
        setLogInForm(true)
        setAddEmpresa(false)
        setForm(false)
        setListadoEmpresas(false)
        setOferta(false)
        setOfertList(false)
        setAddInstETP(false)
        setListETP(false)
    }

    return(
        <>
            <div className="nav-container">
                <img src="https://www.inet.edu.ar/wp-content/themes/inet/img/logo-inet.png" alt="inet-img" className="inet-logo" />
                <nav className="text-container">
                    <li className="nav-text" onClick={() => handleInicio()}>Inicio</li>
                    <li className="nav-text" onClick={() => handleAcercaDe()}>Acerca de</li>
                    {oferta === false || addEmpresa === false ? <li className="nav-text" onClick={() => handleLogIn()}>Iniciar sesion</li> : <li className="nav-text-user">{user}</li>}
                    
                </nav>
            </div>
        </>
    )
}
export default Nav
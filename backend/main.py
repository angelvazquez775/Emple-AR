from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Empresa(BaseModel):
    nombre: str
    contraseña: str
    razon_social: str
    descripcion: str
    web: str
    contacto: str

class Oferta(BaseModel):
    nombre_empresa: str
    titulo: str
    descripcion: str
    localidad: str
    modalidad: str
    horas: str
    puestos: int
    estado: str
class InstETP (BaseModel):
    nombre: str
    contraseña: str
    claveCUE: str
    direccion: str
    codigoPostal: int
    localidad: str
    contacto: str
class OfertaEducativa (BaseModel):
    educacion: str
    formacion: str
    titulo: str
    perfil: str
class Alumno(BaseModel):
    nombre: str
    apellido: str
    contraseña: str
    dni: str
    escuela: str
    egresado: str
    titulo: str
listaEmpresas = []
listaOfertas = []
listaETP = []
listaOfertasEdu = []
listaAlumnos = []
@app.post("/registrar_empresa")
async def registrar_empresa(empresa: Empresa):
    listaEmpresas.append(empresa)
    print(listaEmpresas)
    return {"mensaje": "Empresa registrada exitosamente"}
@app.post("/registrar_alumno")
async def registrar_alumno(alumno: Alumno):
    listaAlumnos.append(alumno)
    print(listaAlumnos)
    return {"mensaje": "Empresa registrada exitosamente"}

@app.post("/actualizar_perfil")
async def actualizar_perfil(oferta: OfertaEducativa):
    listaOfertasEdu.append(oferta)
    print(listaOfertasEdu)
    return {"mensaje": "Empresa registrada exitosamente"}

@app.post("/registrar_ETP")
async def registrar_ETP(institucion: InstETP):
    listaETP.append(institucion)
    print(listaETP)
    return {"mensaje": "Empresa registrada exitosamente"}

@app.post("/nueva_oferta")
async def nueva_oferta(oferta: Oferta):
    listaOfertas.append(oferta)
    print(listaOfertas)
    return {"mensaje": "Oferta publicada exitosamente"}

@app.delete("/eliminar_elemento/{elemento_id}")
async def eliminar_elemento(elemento_id: int):
    try:
        elemento_eliminado = listaEmpresas.pop(elemento_id)
        return {"mensaje": f"Elemento eliminado: {elemento_eliminado}"}
    except IndexError:
        return {"error": "Elemento no encontrado"}
    
@app.delete("/eliminar_ETP/{elemento_id}")
async def eliminar_ETP(elemento_id: int):
    try:
        elemento_eliminado = listaETP.pop(elemento_id)
        return {"mensaje": f"Elemento eliminado: {elemento_eliminado}"}
    except IndexError:
        return {"error": "Elemento no encontrado"}
    
@app.delete("/eliminar_oferta/{elemento_id}")
async def eliminar_oferta(elemento_id: int):
    try:
        elemento_eliminado = listaOfertas.pop(elemento_id)
        return {"mensaje": f"Elemento eliminado: {elemento_eliminado}"}
    except IndexError:
        return {"error": "Elemento no encontrado"}

@app.get("/listar_empresas")
async def listar_empresas():
    return listaEmpresas
@app.get("/listar_ofertas")
async def listar_ofertas():
    return listaOfertas
@app.get("/listar_ETP")
async def listar_ETP():
    return listaETP
@app.get("/listar_ofertasEdu")
async def listar_ofertasEdu():
    return listaOfertasEdu
@app.get("/listar_alumnos")
async def listar_alumnos():
    return listaAlumnos
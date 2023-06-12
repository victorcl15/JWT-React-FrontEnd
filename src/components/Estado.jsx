import React, { useEffect, useState, useContext } from "react";
//import {getAll} from "../servicios/equipos"
import { getTipoEquipos, createTipoEquipo, editarTipoEquipo, eliminarTipoEquipo } from "../servicios/TipoEquipo";
import "../styles/estilos.css"
import UseList from "./Utils/UseList";
import ModalEdit from "./Utils/ModalEdit";
import ModalNew from "./Utils/ModalNew";
import TokenContext from "./Utils/Context"

export default function Estado() {

  const {token} = useContext(TokenContext)
  const [equipos1, setEquipos] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(true)
    const [newEquipo, setNewEquipo] = useState({name: ""})
    const [identificador, setIdentificador] = useState("")
    const [equipoRecuperado, setEquipoRecuperado] = useState("")
    const [newEditarEquipo, setNewEditarEquipo] = useState({
      name: "",
      estado: ""
    })
    const rutas = "estadoequipos"
    const title = "Estado de Equipo"
    const NoAutorizado = "No estas autorizado a ver este modulo"

    const handleSubmit = async (event) => {
      event.preventDefault();
      console.log('Name:', newEquipo.name);
      console.log(newEquipo)
      
      await createTipoEquipo(rutas ,newEquipo, token.access_token)
       listarEquipos()
       setNewEquipo({name: ""})
    }

    const handleSetEquipoNew = (event) => {
      setNewEquipo({ name: event.target.value })
    }

    const listarEquipos = async () => {
      const {data} = await getTipoEquipos(rutas, token.access_token)
      console.log(data)
      setEquipos(data)
    }

    const eliminar = async (event) => {
      event.preventDefault();
      await eliminarTipoEquipo(rutas ,event.target.value)
      console.log(event.target.value)
      listarEquipos()
    }

    
    const editarEquipos = async (event) => {
      event.preventDefault();
      console.log(newEditarEquipo)
      
      console.log(identificador)
      
     await editarTipoEquipo(identificador, rutas, newEditarEquipo)
     
     
      setNewEditarEquipo({estado: "", name: ""})
      listarEquipos()

     // setNewEditarEquipo({name: "",
     //estado: true})
    }

    const handleSetEditarEquipoNombre = (event) => {
      setNewEditarEquipo({ 
        name: event.target.value==="" ? equipoRecuperado : event.target.value,
        estado: newEditarEquipo.estado
       })
    }
    const handleSetEditarEquipoEstado = (event) => {
      setNewEditarEquipo({ estado: event.target.value,
        name: newEditarEquipo.name==="" ? equipoRecuperado : newEditarEquipo.name
      })
    }

    const idImport = (event) => {
      //console.log(event.target.value)
      //console.log(event.target.name)
      //let idDefi = event.target.value
      //return idDefi
      setEquipoRecuperado(event.target.name)
      setIdentificador(event.target.value)
      
      
    }

    const refrescarEdit = () => {
      //window.location.reload();
      setNewEditarEquipo({estado: "", name: ""})
      setEquipoRecuperado("")
    }

    const refrescarNew = () => {
      //window.location.reload();
      setNewEquipo({name: ""})
    }

    useEffect(() => {
  
      listarEquipos()
      //getAll(setEquipos)
    }, [])
    
    const estados = [{label: "Activo", value: true},
  {label: "Inactivo", value: false}]
    const valido = "Valido"
    const invalido = "Invalido"
    const nada = "No hay datos"

  return (
    <>
        
        <div className="centrar" style={{marginLeft: "50px", marginRight: "50px", marginBottom: "50px", marginTop: "50px"}}>
{/* modal para crear equipo */}

<ModalNew
  title={title}
  refrescarNew={refrescarNew}
  handleSubmit={handleSubmit}
  handleSetEquipoNew={handleSetEquipoNew}
  newEquipo={newEquipo}
></ModalNew>
{/* aqui termina el modal de crear equipo */}

{/* modal para editar equipo*/}
<ModalEdit
title={title}
refrescarEdit={refrescarEdit}
editarEquipos={editarEquipos}
newEditarEquipo={newEditarEquipo}
equipoRecuperado={equipoRecuperado}
handleSetEditarEquipoNombre={handleSetEditarEquipoNombre}
handleSetEditarEquipoEstado={handleSetEditarEquipoEstado}
>
</ModalEdit>
{/* Aqui termina el modal de editar equipo */}

<UseList 
  equipos1={equipos1}
  valido={valido}
  invalido={invalido}
  nada={nada}
  idImport={idImport}
  eliminar={eliminar}
  NoAutorizado={NoAutorizado}

></UseList>

{/*pegar-listar-equipos*/}
</div>
      
            

      </>
  )
}

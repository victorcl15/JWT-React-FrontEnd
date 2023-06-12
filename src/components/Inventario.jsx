import React, { useEffect, useState, useContext } from "react";
//import {getAll} from "../servicios/equipos"
import { getTipoEquipos, createTipoEquipo, editarTipoEquipo, eliminarTipoEquipo } from "../servicios/TipoEquipo";
import moment, { isDate } from 'moment';
import "../styles/estilos.css"
import Spinner from "./Utils/Spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLoginToken } from "./Utils/useLoginToken";
import TokenContext from "./Utils/Context"


import dayjs from "dayjs";

export default function Inventario() {

  const {token} = useContext(TokenContext)
  const {user, userToken} = useLoginToken()
  const {access_token} = userToken
  const [equipos1, setEquipos] = useState(null)
  const [usuarios, setUsuarios] = useState(null)
  const [marcas, setMarcas] = useState(null)
  const [estados1, setEstados] = useState(null)
  const [equipos, setEquipos1] = useState(null)
  
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(true)
    const [newEquipo, setNewEquipo] = useState({
      serial: "", modelo: "",
    descrip: "", foto: "", color: "", fechaCompra: "", precio: "", usuario: "",
    marca: "", estado: "", equipo: ""
    })
    const [identificador, setIdentificador] = useState("")
    const [identificador1, setIdentificador1] = useState("")
    
    const [equipoRecuperado, setEquipoRecuperado] = useState({serial: "", modelo: "",
    descrip: "", foto: "", color: "", fechaCompra: "", precio: "", usuario: "",
    marca: "", estado: "", equipo: ""  
  })
    const [newEditarEquipo, setNewEditarEquipo] = useState({
      serial: "", modelo: "",
    descrip: "", foto: "", color: "", fechaCompra: "", precio: "", usuario: "",
    marca: "", estado: "", equipo: ""
    })
    const rutas = "inventarios"

    const handleSubmit = async (event) => {
      event.preventDefault();
      setLoading(true)
      console.log('Name:', newEquipo.name);
      console.log(newEquipo)
      
      
      await createTipoEquipo(rutas ,newEquipo, token.access_token)
       listarEquipos()
       setTimeout(() => {
        setLoading(false)
      }, 500)
       setNewEquipo({

        serial: "", modelo: "",
    descrip: "", foto: "", color: "", fechaCompra: "", precio: "", usuario: "",
    marca: "", estado: "", equipo: ""
       })
    }

    const handleKeyPress = (event) => {
      if (isNaN(event.key)) {
        event.preventDefault();
      }
    }
// listar inventarios
    const listarEquipos = async () => {
      setEquipos(null)
      console.log("===============")
     // console.log(access_token)
      console.log(token.access_token)
      console.log("================")
      const {data} = await getTipoEquipos(rutas, token.access_token)
      console.log(data)

      setTimeout(() => {
        setEquipos(data)
      }, 500)
     // setEquipos(data)
      
      
    }
    //listar usuarios
    const listarEquipos1 = async () => {
      const {data} = await getTipoEquipos("usuarios", token.access_token)
      const daticos = data.map(datico => datico.estado===true ? datico : null)
      console.log(daticos)
      setUsuarios(daticos)
    }
    //listar marcas
    const listarEquipos2 = async () => {
      const {data} = await getTipoEquipos("marcas", token.access_token)
      const daticos = data.map(datico => datico.estado===true ? datico : null)
      console.log(daticos)
      setMarcas(daticos)
    }
    //listar estados
    const listarEquipos3 = async () => {
      const {data} = await getTipoEquipos("estadoequipos", token.access_token)
      const daticos = data.map(datico => datico.estado===true ? datico : null)
      console.log(daticos)
      setEstados(daticos)
    }
    //listar equipos
    const listarEquipos4 = async () => {
      const {data} = await getTipoEquipos("tipoequipos", token.access_token)
      const daticos = data.map(datico => datico.estado===true ? datico : null)
      console.log(daticos)
      setEquipos1(daticos)
    }

    const eliminar = async (event) => {
      event.preventDefault();
      await eliminarTipoEquipo(rutas ,event.target.value)
      console.log(event.target.value)
      listarEquipos()
    }

    
    const editarEquipos = async (event) => {
      event.preventDefault();
      setLoading(true)
      console.log(newEditarEquipo)
      
      console.log(identificador)
      
     await editarTipoEquipo(identificador, rutas, newEditarEquipo)
     
     
     setNewEditarEquipo({
      serial: "", modelo: "",
  descrip: "", foto: "", color: "", fechaCompra: "", precio: "", usuario: "",
  marca: "", estado: "", equipo: ""
    })
      listarEquipos()
      setTimeout(() => {
        setLoading(false)
      }, 500)
      

     // setNewEditarEquipo({name: "",
     //estado: true})
    }

  
    const idImport = (event) => {
      //console.log(event.target.value)
      
      //setEquipoRecuperado({serial: event.target.getAttribute("data-serial")}
     
      
      setEquipoRecuperado({
        serial: event.target.getAttribute("data-serial"), modelo: event.target.getAttribute("data-modelo"),
        descrip: event.target.getAttribute("data-descrip"), foto: event.target.getAttribute("data-foto"),
        color: event.target.getAttribute("data-color"),
        fechaCompra: dayjs(event.target.getAttribute("data-fechacompra")).add(0, "day").format("YYYY-MM-DD"), precio: event.target.getAttribute("data-precio"), 
        usuario: event.target.getAttribute("data-usuario"),
        marca: event.target.getAttribute("data-marca"), estado: event.target.getAttribute("data-estado"),
        equipo: event.target.getAttribute("data-equipo")
      })
      console.log(event.target.id)
      setIdentificador(event.target.id)
      
      
    }

   
    const refrescarEdit = () => {
      //window.location.reload();
      setNewEditarEquipo({
        serial: "", modelo: "",
    descrip: "", foto: "", color: "", fechaCompra: "", precio: "", usuario: "",
    marca: "", estado: "", equipo: ""
      })
      setEquipoRecuperado({
        serial: "", modelo: "",
    descrip: "", foto: "", color: "", fechaCompra: "", precio: "", usuario: "",
    marca: "", estado: "", equipo: ""
      })
    }

    const refrescarNew = () => {
      //window.location.reload();
      setNewEquipo({
        serial: "", modelo: "",
    descrip: "", foto: "", color: "", fechaCompra: "", precio: "", usuario: "",
    marca: "", estado: "", equipo: ""
      })
    }

    useEffect(() => {
  
      listarEquipos()
      listarEquipos1()
      listarEquipos2()
      listarEquipos3()
      listarEquipos4()
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

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-fullscreen">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Crear Nuevo Inventario</h1>
        <button type="button" onClick={refrescarNew} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-auto" style={{  marginRight: "60px", marginTop: "40px", width: "30%"}}>
            <label htmlFor="recipient-name" className="col-form-label">Serial:</label>
            <input 
            type="text"
            placeholder="Escribe un equipo"
            className="form-control"
            id="recipient-name12"
            required
            value={newEquipo.serial}
            onChange={event => setNewEquipo({ 
            serial: event.target.value, modelo: newEquipo.modelo,
            descrip: newEquipo.descrip, foto: newEquipo.foto, color: newEquipo.color,
            fechaCompra: newEquipo.fechaCompra, precio: newEquipo.precio, usuario: newEquipo.usuario,
            marca: newEquipo.marca, estado: newEquipo.estado, equipo: newEquipo.equipo
            })}
            />

            
          </div>
          <div className="col-auto" style={{  marginRight: "60px", marginTop: "40px", width: "30%"}}>
            <label htmlFor="recipient-name" className="col-form-label">Modelo:</label>
            <input 
            type="text"
            placeholder="Escribe un email"
            className="form-control"
            id="recipient-email13"
            required
            value={newEquipo.modelo}
            onChange={event => setNewEquipo({ modelo: event.target.value, serial: newEquipo.serial,
              descrip: newEquipo.descrip, foto: newEquipo.foto, color: newEquipo.color,
              fechaCompra: newEquipo.fechaCompra, precio: newEquipo.precio, usuario: newEquipo.usuario,
              marca: newEquipo.marca, estado: newEquipo.estado, equipo: newEquipo.equipo
            })}
            />
          </div>
          <div className="col-auto" style={{  marginRight: "60px", marginTop: "40px", width: "30%"}}>
            <label htmlFor="recipient-name" className="col-form-label">Descripción:</label>
            <input 
            type="text"
            placeholder="Escribe un equipo"
            className="form-control"
            id="recipient-name14"
            required
            value={newEquipo.descrip}
            onChange={event => setNewEquipo({ descrip: event.target.value,
              serial: newEquipo.serial,
              modelo: newEquipo.modelo,
              foto: newEquipo.foto, color: newEquipo.color,
              fechaCompra: newEquipo.fechaCompra, precio: newEquipo.precio, usuario: newEquipo.usuario,
              marca: newEquipo.marca, estado: newEquipo.estado, equipo: newEquipo.equipo
            })}
            />

            
          </div>
          <div className="col-auto" style={{  marginRight: "60px", marginTop: "40px", width: "30%"}}>
            <label htmlFor="recipient-name" className="col-form-label">Foto:</label>
            <input 
            type="text"
            placeholder="Escribe un email"
            className="form-control"
            id="recipient-email15"
            required
            value={newEquipo.foto}
            onChange={event => setNewEquipo({ foto: event.target.value, 
              serial: newEquipo.serial,
              modelo: newEquipo.modelo,
              descrip: newEquipo.descrip, color: newEquipo.color,
              fechaCompra: newEquipo.fechaCompra, precio: newEquipo.precio, usuario: newEquipo.usuario,
              marca: newEquipo.marca, estado: newEquipo.estado, equipo: newEquipo.equipo
            })}
            />
          </div>
          <div className="col-auto" style={{  marginRight: "60px", marginTop: "40px", width: "30%"}}>
            <label htmlFor="recipient-name" className="col-form-label">Color:</label>
            <input 
            type="text"
            placeholder="Escribe un email"
            className="form-control"
            id="recipient-email16"
            required
            value={newEquipo.color}
            onChange={event => setNewEquipo({ color: event.target.value, 
              serial: newEquipo.serial,
              modelo: newEquipo.modelo,
              descrip: newEquipo.descrip, foto: newEquipo.foto, 
              fechaCompra: newEquipo.fechaCompra, precio: newEquipo.precio, usuario: newEquipo.usuario,
              marca: newEquipo.marca, estado: newEquipo.estado, equipo: newEquipo.equipo
            })}
            />
          </div>
          <div className="col-auto" style={{  marginRight: "60px", marginTop: "40px", width: "30%"}}>
          <label htmlFor="recipient-name" className="col-form-label">Fecha-Compra:</label>
            <DatePicker
            className="form-select" aria-label="Default select example"
            placeholderText="Seelecciona una fecha"
            
            selected={newEquipo.fechaCompra}
            onChange={(date) =>  setNewEquipo({
              fechaCompra: date,
              serial: newEquipo.serial,
              modelo: newEquipo.modelo,
              descrip: newEquipo.descrip, foto: newEquipo.foto, color: newEquipo.color,
              precio: newEquipo.precio, usuario: newEquipo.usuario,
              marca: newEquipo.marca, estado: newEquipo.estado, equipo: newEquipo.equipo
            })}
            ></DatePicker>
          </div>
          <div className="col-auto" style={{  marginRight: "60px", marginTop: "40px", width: "30%"}}>
            <label htmlFor="recipient-name" className="col-form-label">Precio:</label>
            <input 
            type="text"
            placeholder="Escribe un email"
            className="form-control"
            id="recipient-email18"
            required
            value={newEquipo.precio}
            
            onChange={event => isNaN(event.target.value) ? handleKeyPress : setNewEquipo({ precio: event.target.value, 
              serial: newEquipo.serial,
              modelo: newEquipo.modelo,
              descrip: newEquipo.descrip, foto: newEquipo.foto, color: newEquipo.color,
              fechaCompra: newEquipo.fechaCompra, usuario: newEquipo.usuario,
              marca: newEquipo.marca, estado: newEquipo.estado, equipo: newEquipo.equipo
            })}
            
            />
          </div>
          <div className="col-auto" style={{  marginRight: "60px", marginTop: "40px", width: "30%"}}>
            <label htmlFor="recipient-name" className="col-form-label">Usuario:</label>
            <select className="form-select" aria-label="Default select example"
            required
            value={newEquipo.usuario}
            //name={}
            onChange={event => {setNewEquipo({ usuario: event.target.value,
              serial: newEquipo.serial,
              modelo: newEquipo.modelo,
              descrip: newEquipo.descrip, foto: newEquipo.foto, color: newEquipo.color,
              fechaCompra: newEquipo.fechaCompra, precio: newEquipo.precio,
              marca: newEquipo.marca, estado: newEquipo.estado, equipo: newEquipo.equipo
            })
            
          }}
            
            >
              <option value="">Selecciona el usuario...</option>
              {usuarios != null ? usuarios.map((equipo, index) => equipo!=null ? (
              <option key={index} value={equipo.id} name={equipo.id}>
                {equipo.name}
              </option>
              ): null): nada}
              
            </select>
            </div>
            <div className="col-auto" style={{  marginRight: "60px", marginTop: "40px", width: "30%"}}>
            <label htmlFor="recipient-name" className="col-form-label">Marca:</label>
            <select className="form-select" aria-label="Default select example"
            value={newEquipo.marca}
            //name={newEquipo.name}
            onChange={event => setNewEquipo({ marca: event.target.value,
              serial: newEquipo.serial,
              modelo: newEquipo.modelo,
              descrip: newEquipo.descrip, foto: newEquipo.foto, color: newEquipo.color,
              fechaCompra: newEquipo.fechaCompra, precio: newEquipo.precio, usuario: newEquipo.usuario,
              estado: newEquipo.estado, equipo: newEquipo.equipo
            })}
            required
            >
              <option value="">Selecciona la marca...</option>
              {marcas != null ? marcas.map((equipo, index) => equipo!=null ? (
              <option key={index} value={equipo.id}>
                {equipo.name}
              </option>
              ): null ): nada}
              
            </select>
            </div>
            <div className="col-auto" style={{  marginRight: "60px", marginTop: "40px", width: "30%"}}>
            <label htmlFor="recipient-name" className="col-form-label">Estado:</label>
            <select className="form-select" aria-label="Default select example"
            value={newEquipo.estado}
            name={newEquipo.name}
            onChange={event => setNewEquipo({ estado: event.target.value,
              serial: newEquipo.serial,
              modelo: newEquipo.modelo,
              descrip: newEquipo.descrip, foto: newEquipo.foto, color: newEquipo.color,
              fechaCompra: newEquipo.fechaCompra, precio: newEquipo.precio, usuario: newEquipo.usuario,
              marca: newEquipo.marca, equipo: newEquipo.equipo
            })}
            required
            >
              <option value="">Selecciona el estado...</option>
              {estados1 != null ? estados1.map((equipo, index) => equipo!=null ? (
              <option key={index} value={equipo.id}>
                {equipo.name}
              </option>
              ): null): nada}
              
            </select>
            </div>
            <div className="col-auto" style={{  marginRight: "60px", marginTop: "40px", width: "30%"}}>
            <label htmlFor="recipient-name" className="col-form-label">Equipo:</label>
            <select className="form-select" aria-label="Default select example"
            value={newEquipo.equipo}
            name={newEquipo.name}
            onChange={event => setNewEquipo({ equipo: event.target.value,
              serial: newEquipo.serial,
              modelo: newEquipo.modelo,
              descrip: newEquipo.descrip, foto: newEquipo.foto, color: newEquipo.color,
              fechaCompra: newEquipo.fechaCompra, precio: newEquipo.precio, usuario: newEquipo.usuario,
              marca: newEquipo.marca, estado: newEquipo.estado
            })}
            required
            >
              <option value="">Selecciona el equipo...</option>
              {equipos != null ? equipos.map((equipo, index) => equipo!=null ? (
              <option key={index} value={equipo.id}>
                {equipo.name}
              </option>
              ): null): nada}
              
            </select>
            </div>
          <div className="modal-footer">
        <button type="button" onClick={refrescarNew} className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        {
          loading ? 

          (<button class="btn btn-primary" type="button" disabled>
          <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          Loading...
        </button>)
        :
          (
        <button type="submit" disabled={(!newEquipo.serial) || (!newEquipo.modelo) || 
              (!newEquipo.descrip) || (!newEquipo.foto) || (!newEquipo.color)
              || (!newEquipo.fechaCompra) || (!newEquipo.precio) || (!newEquipo.usuario) ||
              (!newEquipo.marca) || (!newEquipo.estado) || (!newEquipo.equipo)} className="btn btn-primary" data-bs-dismiss="modal">Enviar</button>
       ) }
      </div>
        </form>
      </div>
      
    </div>
  </div>
</div>
{/* aqui termina el modal de crear equipo */}

{/* modal para editar equipo*/}
<div className="modal fade" id="exampleModal15" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-fullscreen">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Edita un inventario</h1>
        <button type="button" onClick={refrescarEdit} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <form onSubmit={editarEquipos} className="row g-3">
          <div className="col-auto" style={{  marginRight: "60px", marginTop: "40px", width: "30%"}}>
            <label htmlFor="recipient-name" className="col-form-label">Serial:</label>
            <input 
            type="text"
            className="form-control"
            id="recipient-name1"
            
            value={newEditarEquipo.serial==="" ? equipoRecuperado.serial : newEditarEquipo.serial}
            name={equipoRecuperado.name}
            onChange={event => setNewEditarEquipo({ 
              serial: event.target.value==="" ? equipoRecuperado.serial : event.target.value,
              precio: newEditarEquipo.precio==="" ? equipoRecuperado.precio : newEditarEquipo.precio,
              modelo: newEditarEquipo.modelo==="" ? equipoRecuperado.modelo : newEditarEquipo.modelo,
              descrip: newEditarEquipo.descrip==="" ? equipoRecuperado.descrip : newEditarEquipo.descrip,
              foto: newEditarEquipo.foto==="" ? equipoRecuperado.foto : newEditarEquipo.foto,
              color: newEditarEquipo.color==="" ? equipoRecuperado.color : newEditarEquipo.color,
              fechaCompra: newEditarEquipo.fechaCompra==="" ? equipoRecuperado.fechaCompra : newEditarEquipo.fechaCompra,
              
              usuario: newEditarEquipo.usuario==="" ? equipoRecuperado.usuario : newEditarEquipo.usuario,
              marca: newEditarEquipo.marca==="" ? equipoRecuperado.marca : newEditarEquipo.marca,
              estado: newEditarEquipo.estado==="" ? equipoRecuperado.estado : newEditarEquipo.estado,
              equipo: newEditarEquipo.equipo==="" ? equipoRecuperado.equipo : newEditarEquipo.equipo
             })}
            />
          </div>
          <div className="col-auto" style={{  marginRight: "60px", marginTop: "40px", width: "30%"}}>
            <label htmlFor="recipient-name" className="col-form-label">Modelo:</label>
            <input 
            type="text"
            className="form-control"
            id="recipient-email2"
            
            value={newEditarEquipo.modelo==="" ? equipoRecuperado.modelo : newEditarEquipo.modelo}
            name={equipoRecuperado.email}
            onChange={event => setNewEditarEquipo({ 
              modelo: event.target.value==="" ? equipoRecuperado.modelo : event.target.value,
              serial: newEditarEquipo.serial==="" ? equipoRecuperado.serial : newEditarEquipo.serial,
              precio: newEditarEquipo.precio==="" ? equipoRecuperado.precio : newEditarEquipo.precio,
              descrip: newEditarEquipo.descrip==="" ? equipoRecuperado.descrip : newEditarEquipo.descrip,
              foto: newEditarEquipo.foto==="" ? equipoRecuperado.foto : newEditarEquipo.foto,
              color: newEditarEquipo.color==="" ? equipoRecuperado.color : newEditarEquipo.color,
              fechaCompra: newEditarEquipo.fechaCompra==="" ? equipoRecuperado.fechaCompra : newEditarEquipo.fechaCompra,
              
              usuario: newEditarEquipo.usuario==="" ? equipoRecuperado.usuario : newEditarEquipo.usuario,
              marca: newEditarEquipo.marca==="" ? equipoRecuperado.marca : newEditarEquipo.marca,
              estado: newEditarEquipo.estado==="" ? equipoRecuperado.estado : newEditarEquipo.estado,
              equipo: newEditarEquipo.equipo==="" ? equipoRecuperado.equipo : newEditarEquipo.equipo
             })}
            />
          </div>
          <div className="col-auto" style={{  marginRight: "60px", marginTop: "40px", width: "30%"}}>
            <label htmlFor="recipient-name" className="col-form-label">Descrición:</label>
            <input 
            type="text"
            className="form-control"
            id="recipient-name3"
            
            value={newEditarEquipo.descrip==="" ? equipoRecuperado.descrip : newEditarEquipo.descrip}
            name={equipoRecuperado.name}
            onChange={event => setNewEditarEquipo({ 
              descrip: event.target.value==="" ? equipoRecuperado.descrip : event.target.value,
              serial: newEditarEquipo.serial==="" ? equipoRecuperado.serial : newEditarEquipo.serial,
              modelo: newEditarEquipo.modelo==="" ? equipoRecuperado.modelo : newEditarEquipo.modelo,
              precio: newEditarEquipo.precio==="" ? equipoRecuperado.precio : newEditarEquipo.precio,
              foto: newEditarEquipo.foto==="" ? equipoRecuperado.foto : newEditarEquipo.foto,
              color: newEditarEquipo.color==="" ? equipoRecuperado.color : newEditarEquipo.color,
              fechaCompra: newEditarEquipo.fechaCompra==="" ? equipoRecuperado.fechaCompra : newEditarEquipo.fechaCompra,
              
              usuario: newEditarEquipo.usuario==="" ? equipoRecuperado.usuario : newEditarEquipo.usuario,
              marca: newEditarEquipo.marca==="" ? equipoRecuperado.marca : newEditarEquipo.marca,
              estado: newEditarEquipo.estado==="" ? equipoRecuperado.estado : newEditarEquipo.estado,
              equipo: newEditarEquipo.equipo==="" ? equipoRecuperado.equipo : newEditarEquipo.equipo
             })}
            />
          </div>
          <div className="col-auto" style={{  marginRight: "60px", marginTop: "40px", width: "30%"}}>
            <label htmlFor="recipient-name" className="col-form-label">Foto:</label>
            <input 
            type="text"
            className="form-control"
            id="recipient-name4"
            
            value={newEditarEquipo.foto==="" ? equipoRecuperado.foto : newEditarEquipo.foto}
            name={equipoRecuperado.name}
            onChange={event => setNewEditarEquipo({ 
              foto: event.target.value==="" ? equipoRecuperado.foto : event.target.value,
              serial: newEditarEquipo.serial==="" ? equipoRecuperado.serial : newEditarEquipo.serial,
              modelo: newEditarEquipo.modelo==="" ? equipoRecuperado.modelo : newEditarEquipo.modelo,
              descrip: newEditarEquipo.descrip==="" ? equipoRecuperado.descrip : newEditarEquipo.descrip,
              precio: newEditarEquipo.precio==="" ? equipoRecuperado.precio : newEditarEquipo.precio,
              color: newEditarEquipo.color==="" ? equipoRecuperado.color : newEditarEquipo.color,
              fechaCompra: newEditarEquipo.fechaCompra==="" ? equipoRecuperado.fechaCompra : newEditarEquipo.fechaCompra,
              
              usuario: newEditarEquipo.usuario==="" ? equipoRecuperado.usuario : newEditarEquipo.usuario,
              marca: newEditarEquipo.marca==="" ? equipoRecuperado.marca : newEditarEquipo.marca,
              estado: newEditarEquipo.estado==="" ? equipoRecuperado.estado : newEditarEquipo.estado,
              equipo: newEditarEquipo.equipo==="" ? equipoRecuperado.equipo : newEditarEquipo.equipo
             })}
            />
          </div>
          <div className="col-auto" style={{  marginRight: "60px", marginTop: "40px", width: "30%"}}>
            <label htmlFor="recipient-name" className="col-form-label">Color:</label>
            <input 
            type="text"
            className="form-control"
            id="recipient-name5"
            
            value={newEditarEquipo.color==="" ? equipoRecuperado.color : newEditarEquipo.color}
            name={equipoRecuperado.name}
            onChange={event => setNewEditarEquipo({ 
              color: event.target.value==="" ? equipoRecuperado.color : event.target.value,
              serial: newEditarEquipo.serial==="" ? equipoRecuperado.serial : newEditarEquipo.serial,
              modelo: newEditarEquipo.modelo==="" ? equipoRecuperado.modelo : newEditarEquipo.modelo,
              descrip: newEditarEquipo.descrip==="" ? equipoRecuperado.descrip : newEditarEquipo.descrip,
              foto: newEditarEquipo.foto==="" ? equipoRecuperado.foto : newEditarEquipo.foto,
              precio: newEditarEquipo.precio==="" ? equipoRecuperado.precio : newEditarEquipo.precio,
              fechaCompra: newEditarEquipo.fechaCompra==="" ? equipoRecuperado.fechaCompra : newEditarEquipo.fechaCompra,
              
              usuario: newEditarEquipo.usuario==="" ? equipoRecuperado.usuario : newEditarEquipo.usuario,
              marca: newEditarEquipo.marca==="" ? equipoRecuperado.marca : newEditarEquipo.marca,
              estado: newEditarEquipo.estado==="" ? equipoRecuperado.estado : newEditarEquipo.estado,
              equipo: newEditarEquipo.equipo==="" ? equipoRecuperado.equipo : newEditarEquipo.equipo
             })}
            />
          </div>
          <div className="col-auto" style={{  marginRight: "60px", marginTop: "40px", width: "30%"}}>

          <label htmlFor="recipient-name" className="col-form-label">Fecha-Compra:</label>
            <input
            type="date"
            className="form-control"
            
            value={newEditarEquipo.fechaCompra==="" ? equipoRecuperado.fechaCompra : dayjs(newEditarEquipo.fechaCompra).format("YYYY-MM-DD")}
            
            onChange={event =>  setNewEditarEquipo({
              fechaCompra: event.target.value==="" ? equipoRecuperado.fechaCompra : dayjs(event.target.value).add(0,"day"),
              serial: newEditarEquipo.serial==="" ? equipoRecuperado.serial : newEditarEquipo.serial,
              modelo: newEditarEquipo.modelo==="" ? equipoRecuperado.modelo : newEditarEquipo.modelo,
              descrip: newEditarEquipo.descrip==="" ? equipoRecuperado.descrip : newEditarEquipo.descrip,
              foto: newEditarEquipo.foto==="" ? equipoRecuperado.foto : newEditarEquipo.foto,
              color: newEditarEquipo.color==="" ? equipoRecuperado.color : newEditarEquipo.color,
              precio: newEditarEquipo.precio==="" ? equipoRecuperado.precio : newEditarEquipo.precio,
              
              usuario: newEditarEquipo.usuario==="" ? equipoRecuperado.usuario : newEditarEquipo.usuario,
              marca: newEditarEquipo.marca==="" ? equipoRecuperado.marca : newEditarEquipo.marca,
              estado: newEditarEquipo.estado==="" ? equipoRecuperado.estado : newEditarEquipo.estado,
              equipo: newEditarEquipo.equipo==="" ? equipoRecuperado.equipo : newEditarEquipo.equipo
            })}
            ></input>
            
          </div>
          <div className="col-auto" style={{  marginRight: "60px", marginTop: "40px", width: "30%"}}>
            <label htmlFor="recipient-name" className="col-form-label">Precio:</label>
            <input 
            type="text"
            className="form-control"
            id="recipient-name8"
            
            value={newEditarEquipo.precio==="" ? equipoRecuperado.precio : newEditarEquipo.precio}
            name={equipoRecuperado.name}
            onChange={event => isNaN(event.target.value) ? handleKeyPress : setNewEditarEquipo({ 
              precio: event.target.value==="" ? equipoRecuperado.precio : event.target.value,
              serial: newEditarEquipo.serial==="" ? equipoRecuperado.serial : newEditarEquipo.serial,
              modelo: newEditarEquipo.modelo==="" ? equipoRecuperado.modelo : newEditarEquipo.modelo,
              descrip: newEditarEquipo.descrip==="" ? equipoRecuperado.descrip : newEditarEquipo.descrip,
              foto: newEditarEquipo.foto==="" ? equipoRecuperado.foto : newEditarEquipo.foto,
              color: newEditarEquipo.color==="" ? equipoRecuperado.color : newEditarEquipo.color,
              fechaCompra: newEditarEquipo.fechaCompra==="" ? equipoRecuperado.fechaCompra : newEditarEquipo.fechaCompra,
              
              usuario: newEditarEquipo.usuario==="" ? equipoRecuperado.usuario : newEditarEquipo.usuario,
              marca: newEditarEquipo.marca==="" ? equipoRecuperado.marca : newEditarEquipo.marca,
              estado: newEditarEquipo.estado==="" ? equipoRecuperado.estado : newEditarEquipo.estado,
              equipo: newEditarEquipo.equipo==="" ? equipoRecuperado.equipo : newEditarEquipo.equipo
             })}
            />
          </div>
          <div className="col-auto" style={{  marginRight: "60px", marginTop: "40px", width: "30%"}}>
            <label htmlFor="recipient-name" className="col-form-label">Usuario:</label>
            <select className="form-select" aria-label="Default select example"
            required
            value={newEditarEquipo.usuario==="" ? equipoRecuperado.usuario : newEditarEquipo.usuario}
            //name={}
            onChange={event => {setNewEditarEquipo({ usuario: event.target.value,
              serial: newEditarEquipo.serial==="" ? equipoRecuperado.serial : newEditarEquipo.serial,
              modelo: newEditarEquipo.modelo==="" ? equipoRecuperado.modelo : newEditarEquipo.modelo,
              descrip: newEditarEquipo.descrip==="" ? equipoRecuperado.descrip : newEditarEquipo.descrip,
              foto: newEditarEquipo.foto==="" ? equipoRecuperado.foto : newEditarEquipo.foto,
              color: newEditarEquipo.color==="" ? equipoRecuperado.color : newEditarEquipo.color,
              fechaCompra: newEditarEquipo.fechaCompra==="" ? equipoRecuperado.fechaCompra : newEditarEquipo.fechaCompra,
              precio: newEditarEquipo.precio==="" ? equipoRecuperado.precio : newEditarEquipo.precio,
              
              marca: newEditarEquipo.marca==="" ? equipoRecuperado.marca : newEditarEquipo.marca,
              estado: newEditarEquipo.estado==="" ? equipoRecuperado.estado : newEditarEquipo.estado,
              equipo: newEditarEquipo.equipo==="" ? equipoRecuperado.equipo : newEditarEquipo.equipo
            })
            
          }}
            
            >
              <option value="">Selecciona el usuario...</option>
              {usuarios != null ? usuarios.map((equipo, index) => equipo!=null ? (
              <option key={index} value={equipo.id} name={equipo.id}>
                {equipo.name}
              </option>
              ): null): nada}
              
            </select>
            </div>
            <div className="col-auto" style={{  marginRight: "60px", marginTop: "40px", width: "30%"}}>
            <label htmlFor="recipient-name" className="col-form-label">Marca:</label>
            <select className="form-select" aria-label="Default select example"
            value={newEditarEquipo.marca==="" ? equipoRecuperado.marca : newEditarEquipo.marca}
            //name={newEquipo.name}
            onChange={event => setNewEditarEquipo({ marca: event.target.value,
              serial: newEditarEquipo.serial==="" ? equipoRecuperado.serial : newEditarEquipo.serial,
              modelo: newEditarEquipo.modelo==="" ? equipoRecuperado.modelo : newEditarEquipo.modelo,
              descrip: newEditarEquipo.descrip==="" ? equipoRecuperado.descrip : newEditarEquipo.descrip,
              foto: newEditarEquipo.foto==="" ? equipoRecuperado.foto : newEditarEquipo.foto,
              color: newEditarEquipo.color==="" ? equipoRecuperado.color : newEditarEquipo.color,
              fechaCompra: newEditarEquipo.fechaCompra==="" ? equipoRecuperado.fechaCompra : newEditarEquipo.fechaCompra,
              precio: newEditarEquipo.precio==="" ? equipoRecuperado.precio : newEditarEquipo.precio,
              usuario: newEditarEquipo.usuario==="" ? equipoRecuperado.usuario : newEditarEquipo.usuario,
              
              estado: newEditarEquipo.estado==="" ? equipoRecuperado.estado : newEditarEquipo.estado,
              equipo: newEditarEquipo.equipo==="" ? equipoRecuperado.equipo : newEditarEquipo.equipo
            })}
            required
            >
              <option value="">Selecciona la marca...</option>
              {marcas != null ? marcas.map((equipo, index) => equipo!=null ? (
              <option key={index} value={equipo.id}>
                {equipo.name}
              </option>
              ): null ): nada}
              
            </select>
            </div>
            <div className="col-auto" style={{  marginRight: "60px", marginTop: "40px", width: "30%"}}>
            <label htmlFor="recipient-name" className="col-form-label">Estado:</label>
            <select className="form-select" aria-label="Default select example"
            value={newEditarEquipo.estado==="" ? equipoRecuperado.estado : newEditarEquipo.estado}
            name={newEquipo.name}
            onChange={event => setNewEditarEquipo({ estado: event.target.value,
              serial: newEditarEquipo.serial==="" ? equipoRecuperado.serial : newEditarEquipo.serial,
              modelo: newEditarEquipo.modelo==="" ? equipoRecuperado.modelo : newEditarEquipo.modelo,
              descrip: newEditarEquipo.descrip==="" ? equipoRecuperado.descrip : newEditarEquipo.descrip,
              foto: newEditarEquipo.foto==="" ? equipoRecuperado.foto : newEditarEquipo.foto,
              color: newEditarEquipo.color==="" ? equipoRecuperado.color : newEditarEquipo.color,
              fechaCompra: newEditarEquipo.fechaCompra==="" ? equipoRecuperado.fechaCompra : newEditarEquipo.fechaCompra,
              precio: newEditarEquipo.precio==="" ? equipoRecuperado.precio : newEditarEquipo.precio,
              usuario: newEditarEquipo.usuario==="" ? equipoRecuperado.usuario : newEditarEquipo.usuario,
              marca: newEditarEquipo.marca==="" ? equipoRecuperado.marca : newEditarEquipo.marca,
              equipo: newEditarEquipo.equipo==="" ? equipoRecuperado.equipo : newEditarEquipo.equipo
            })}
            required
            >
              <option value="">Selecciona el estado...</option>
              {estados1 != null ? estados1.map((equipo, index) => equipo!=null ? (
              <option key={index} value={equipo.id}>
                {equipo.name}
              </option>
              ): null): nada}
              
            </select>
            </div>
            
            <div className="col-auto" style={{  marginRight: "60px", marginTop: "40px", width: "30%"}}>
            <label htmlFor="recipient-name" className="col-form-label">Equipo:</label>
            <select className="form-select" aria-label="Default select example"
            value={newEditarEquipo.equipo==="" ? equipoRecuperado.equipo : newEditarEquipo.equipo}
            name={newEquipo.name}
            onChange={event => setNewEditarEquipo({ 
              equipo: event.target.value,
              serial: newEditarEquipo.serial==="" ? equipoRecuperado.serial : newEditarEquipo.serial,
              modelo: newEditarEquipo.modelo==="" ? equipoRecuperado.modelo : newEditarEquipo.modelo,
              descrip: newEditarEquipo.descrip==="" ? equipoRecuperado.descrip : newEditarEquipo.descrip,
              foto: newEditarEquipo.foto==="" ? equipoRecuperado.foto : newEditarEquipo.foto,
              color: newEditarEquipo.color==="" ? equipoRecuperado.color : newEditarEquipo.color,
              fechaCompra: newEditarEquipo.fechaCompra==="" ? equipoRecuperado.fechaCompra : newEditarEquipo.fechaCompra,
              precio: newEditarEquipo.precio==="" ? equipoRecuperado.precio : newEditarEquipo.precio,
              usuario: newEditarEquipo.usuario==="" ? equipoRecuperado.usuario : newEditarEquipo.usuario,
              marca: newEditarEquipo.marca==="" ? equipoRecuperado.marca : newEditarEquipo.marca,
              estado: newEditarEquipo.estado==="" ? equipoRecuperado.estado : newEditarEquipo.estado
            })}
            required
            >
              <option value="">Selecciona el equipo...</option>
              {equipos != null ? equipos.map((equipo, index) => equipo!=null ? (
              <option key={index} value={equipo.id}>
                {equipo.name}
              </option>
              ): null): nada}
              
            </select>
            </div>
            
          
          <div className="modal-footer">
        <button type="button" onClick={refrescarEdit} className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>

        { 
        loading ? 
        (<button className="btn btn-primary" type="button" disabled>
        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        Loading...
      </button>) :
        (<button type="submit" disabled={(!newEditarEquipo.serial) || (!newEditarEquipo.modelo) || 
              (!newEditarEquipo.descrip) || (!newEditarEquipo.foto) || (!newEditarEquipo.color)
              || ((!newEditarEquipo.fechaCompra) && isDate(newEditarEquipo.fechaCompra))
              || (!newEditarEquipo.precio) || (!newEditarEquipo.usuario) ||
              (!newEditarEquipo.marca) || (!newEditarEquipo.estado) || (!newEditarEquipo.equipo)} className="btn btn-primary" data-bs-dismiss="modal">Enviar</button>
              
        )
        //!isNaN(new Date(newEditarEquipo.fechaCompra).getTime())
        }
      </div>
      
      
      
        </form>
      </div>
      
    </div>
  </div>
</div>
{/* Aqui termina el modal de editar equipo */}
{
  token.rol!=="Docente" ? (
    <button 
          
          type="button" 
          className="btn btn-outline-primary"
          data-bs-toggle="modal" 
          data-bs-target="#exampleModal" 
          data-bs-whatever="@mdo"
        >
          Agregar
        </button>
  ) : 
  (
    <button 
          
          disabled
          type="button" 
          className="btn btn-outline-primary"
          data-bs-toggle="modal" 
          data-bs-target="#exampleModal" 
          data-bs-whatever="@mdo"
        >
          Agregar
        </button>
  )

}

       
            <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Serial</th>
          <th scope="col">Modelo</th>
          <th scope="col">Descripción</th>
          <th scope="col">Foto</th>
          <th scope="col">Color</th>
          <th scope="col">Fecha-Compra</th>
          <th scope="col">Precio</th>
          <th scope="col">Usuario</th>
          <th scope="col">Marca</th>
          <th scope="col">Estado</th>
          <th scope="col">Equipo</th>
          <th scope="col"></th>
        </tr>
      </thead>
  <tbody className="table-group-divider">
    {
      equipos1 != null ? equipos1.map((tipoequipos, index) => {
        return(
          <tr key={tipoequipos.id}>
      <th scope="row">{index+1}</th>
      <td>{tipoequipos.serial}</td>
      <td>{tipoequipos.modelo}</td>
      <td>{tipoequipos.descrip}</td>
      <td>{tipoequipos.foto}</td>
      <td>{tipoequipos.color}</td>
      <td>{dayjs(tipoequipos.fechaCompra).add(0, "day").format("YYYY-MM-DD")}</td>
      <td>{tipoequipos.precio}</td>
      <td>{tipoequipos.usuario.name ? tipoequipos.usuario.name : "Inactivo"}</td>
      <td>{tipoequipos.marca.name ? tipoequipos.marca.name : "Inactivo"}</td>
      <td>{tipoequipos.estado.name ? tipoequipos.estado.name : "Inactivo"}</td>
      <td>{tipoequipos.equipo.name ? tipoequipos.equipo.name : "Inactivo"}</td>
      <td>{
        token.rol!=="Docente" ?
        (
          <button type="button" className="btn btn-success"
      data-bs-toggle="modal" 
      data-bs-target="#exampleModal15" 
      data-bs-whatever="@mdo"
      id={tipoequipos.id}
      value={tipoequipos.id}
      data-serial={tipoequipos.serial}
      data-modelo={tipoequipos.modelo}
      data-descrip={tipoequipos.descrip}
      data-foto={tipoequipos.foto}
      data-color={tipoequipos.color}
      data-fechacompra={tipoequipos.fechaCompra}
      data-precio={tipoequipos.precio}
      data-usuario={tipoequipos.usuario.id ? tipoequipos.usuario.id : "Inactivo"}
      data-marca={tipoequipos.marca.id ? tipoequipos.marca.id : "Inactivo"}
      data-estado={tipoequipos.estado.id ? tipoequipos.estado.id : "Inactivo"}
      data-equipo={tipoequipos.equipo.id ? tipoequipos.equipo.id : "Inactivo"}
      //name={tipoequipos.name}

      style={{marginTop: "5px"}}
      onClick={idImport}
      >Editar</button>
        ) :
        (
          <button disabled type="button" className="btn btn-success"
      data-bs-toggle="modal" 
      data-bs-target="#exampleModal15" 
      data-bs-whatever="@mdo"
      id={tipoequipos.id}
      value={tipoequipos.id}
      data-serial={tipoequipos.serial}
      data-modelo={tipoequipos.modelo}
      data-descrip={tipoequipos.descrip}
      data-foto={tipoequipos.foto}
      data-color={tipoequipos.color}
      data-fechacompra={tipoequipos.fechaCompra}
      data-precio={tipoequipos.precio}
      data-usuario={tipoequipos.usuario.id ? tipoequipos.usuario.id : "Inactivo"}
      data-marca={tipoequipos.marca.id ? tipoequipos.marca.id : "Inactivo"}
      data-estado={tipoequipos.estado.id ? tipoequipos.estado.id : "Inactivo"}
      data-equipo={tipoequipos.equipo.id ? tipoequipos.equipo.id : "Inactivo"}
      //name={tipoequipos.name}

      style={{marginTop: "5px"}}
      onClick={idImport}
      >Editar</button>
        )
        }
      {" "}
      {token.rol!=="Docente" ? 
    (
      <button type="button" className="btn btn-danger"
      style={{marginTop: "5px"}}
      onClick={eliminar} value={tipoequipos.id}
      >Eliminar</button>
    ) :
    (<button disabled type="button" className="btn btn-danger"
    style={{marginTop: "5px"}}
    onClick={eliminar} value={tipoequipos.id}
    >Eliminar</button>)
    }
      </td>
    </tr>
        )
      }): <Spinner></Spinner> }
  
  </tbody>
</table>
</div>
      
            

      </>
  )
}

import React, {useEffect , useState } from "react";
import { editarTipoEquipo } from "../../servicios/TipoEquipo";
import UseList from "./UseList";
function UseEdit(props) {
    const [identificador, setIdentificador] = useState("")
    const [equipoRecuperado, setEquipoRecuperado] = useState("")
    const [equipoRecuperado1, setEquipoRecuperado1] = useState(props.id)
    const [equipoRecuperado2, setEquipoRecuperado2] = useState()
    const [newEditarEquipo, setNewEditarEquipo] = useState({
      name: "",
      estado: ""
    })
   
    const rutas = "tipoequipos"
    

    const editarEquipos = async (event) => {
        event.preventDefault();
        console.log(newEditarEquipo)
        
        console.log(equipoRecuperado2)
        console.log(equipoRecuperado1)
        
       await editarTipoEquipo(identificador, rutas, newEditarEquipo)
       
       
        setNewEditarEquipo({estado: "", name: ""})

        (<UseList></UseList>)
        
       // listarEquipos()
  
       // setNewEditarEquipo({name: "",
       //estado: true})
      }
  
      const idImport = (event) => {
        console.log(event.target.value)
        console.log(event.target.name)
        //let idDefi = event.target.value
        //return idDefi
        
        setEquipoRecuperado1(event.target.value)
        setEquipoRecuperado(event.target.name)
        setIdentificador(event.target.value)
        
        console.log(identificador)
        
        
      }

      const daticos = (pr) => {

        setIdentificador(pr)
        return console.log(identificador)
      }

      const refrescarEdit = () => {
        //window.location.reload();
        
        setNewEditarEquipo({estado: "", name: ""})
        setEquipoRecuperado("")
      }
/*
      useEffect(() => {

        
        console.log(identificador);
        
        setIdentificador(identificador)
      }, [identificador]);
*/
    return (  <>

<div className="modal fade" id="exampleModal15" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Edita un Tipo de Equipo</h1>
        <button type="button" onClick={refrescarEdit} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <form onSubmit={editarEquipos}>
          <div className="mb-3">
            <label htmlFor="recipient-name" className="col-form-label">Nombre:</label>
            <input 
            type="text"
            className="form-control"
            id="recipient-name"
            
            value={newEditarEquipo.name==="" ?  equipoRecuperado : newEditarEquipo.name}
            name={equipoRecuperado}
            placeholder={equipoRecuperado}
            onChange={event => setNewEditarEquipo({ 
              name: event.target.value==="" ? equipoRecuperado : event.target.value,
              estado: newEditarEquipo.estado
             })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="recipient-name" className="col-form-label">Estado:</label>
            <select className="form-select" aria-label="Default select example"
            value={newEditarEquipo.estado}
            name={newEditarEquipo.name}
            onChange={event => setNewEditarEquipo({ estado: event.target.value,
              name: newEditarEquipo.name==="" ? equipoRecuperado : newEditarEquipo.name
            })}
            required={true}
            >
              <option value="">Selecciona el estado...</option>
              <option value={true}
              
              >Activo</option>
              <option value={false}
             
              >Inactivo</option>
              
            </select>
  
          </div>
          <div className="modal-footer">
        <button type="button" onClick={refrescarEdit} className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        <button type="submit" disabled={!newEditarEquipo.estado} className="btn btn-primary" data-bs-dismiss="modal">Enviar</button>
      </div>
        </form>
      </div>
      
    </div>
  </div>
</div>


    <button type="button" className="btn btn-success"
      data-bs-toggle="modal" 
      data-bs-target="#exampleModal15" 
      data-bs-whatever="@mdo"
      value={props.id}
      name={props.nombre}
      
      onClick={idImport}
      >Editar</button>
    </>);
}

export default UseEdit;
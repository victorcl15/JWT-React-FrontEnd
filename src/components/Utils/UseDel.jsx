import React, {useState} from "react"
import { eliminarTipoEquipo } from "../../servicios/TipoEquipo";
import UseList from "./UseList";

function UseDel({tipoequiposId}) {

    const rutas = "tipoequipos"

    const eliminar = async (event) => {
        event.preventDefault();
        await eliminarTipoEquipo(rutas ,event.target.value)
        console.log(event.target.value)
        (<UseList></UseList>)
        //listarEquipos()
      }
    return (<>
        <button type="button" className="btn btn-danger"
      onClick={eliminar} value={tipoequiposId}
      >Eliminar</button>
    
    </>);
}

export default UseDel;
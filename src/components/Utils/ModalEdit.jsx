import React, { useEffect, useState } from "react";
function ModalEdit(
    {
        title,
        refrescarEdit,
        editarEquipos,
        newEditarEquipo,
        equipoRecuperado,
        handleSetEditarEquipoNombre,
        handleSetEditarEquipoEstado
    }
) {
    return ( 
        <div className="modal fade" id="exampleModal15" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Edita un {title}</h1>
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
            
            value={newEditarEquipo.name==="" ? equipoRecuperado : newEditarEquipo.name}
            name={equipoRecuperado}
            onChange={handleSetEditarEquipoNombre}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="recipient-name" className="col-form-label">Estado:</label>
            <select className="form-select" aria-label="Default select example"
            value={newEditarEquipo.estado}
            name={newEditarEquipo.name}
            onChange={handleSetEditarEquipoEstado}
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
     );
}

export default ModalEdit;
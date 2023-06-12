<div className="centrar" style={{marginLeft: "50px", marginRight: "50px", marginBottom: "50px", marginTop: "50px"}}>
{/* modal para crear equipo */}

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Crear Nuevo Tipo de Equipo</h1>
        <button type="button" onClick={refrescarNew} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="recipient-name" className="col-form-label">Nombre:</label>
            <input 
            type="text"
            placeholder="Escribe un equipo"
            className="form-control"
            id="recipient-name"
            value={newEquipo.name}
            onChange={event => setNewEquipo({ name: event.target.value })}
            />
          </div>
          <div className="modal-footer">
        <button type="button" onClick={refrescarNew} className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        <button type="submit" disabled={!newEquipo.name} className="btn btn-primary" data-bs-dismiss="modal">Enviar</button>
      </div>
        </form>
      </div>
      
    </div>
  </div>
</div>
{/* aqui termina el modal de crear equipo */}

{/* modal para editar equipo*/}
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
            
            value={newEditarEquipo.name==="" ? equipoRecuperado : newEditarEquipo.name}
            name={equipoRecuperado}
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
{/* Aqui termina el modal de editar equipo */}

<button 
          
          type="button" 
          className="btn btn-outline-primary"
          data-bs-toggle="modal" 
          data-bs-target="#exampleModal" 
          data-bs-whatever="@mdo"
        >
          Agregar
        </button>
            <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Estado</th>
          <th scope="col">Fecha</th>
          <th scope="col">Fecha-Actualizada</th>
          <th scope="col"></th>
        </tr>
      </thead>
  <tbody className="table-group-divider">
    {
      equipos1 != null ? equipos1.map((tipoequipos, index) => {
        return(
          <tr key={tipoequipos.id}>
      <th scope="row">{index+1}</th>
      <td>{tipoequipos.name}</td>
      <td>{tipoequipos.estado ? valido : invalido}</td>
      <td>{tipoequipos.date}</td>
      <td>{tipoequipos.dateUp}</td>
      <td><button type="button" className="btn btn-success"
      data-bs-toggle="modal" 
      data-bs-target="#exampleModal15" 
      data-bs-whatever="@mdo"
      value={tipoequipos.id}
      name={tipoequipos.name}
      
      onClick={idImport}
      >Editar</button>
      {" "}
      <button type="button" className="btn btn-danger"
      onClick={eliminar} value={tipoequipos.id}
      >Eliminar</button></td>
    </tr>
        )
      }): nada }
  
  </tbody>
</table>
</div>


---------





{/* modal para crear equipo */}

<div className="modal fade show" id="exampleModalFullscreen" tabIndex="-1" aria-labelledby="exampleModalFullscreenLabel" style={{display: "block"}} aria-modal="true" role="dialog">
  <div className="modal-dialog modal-fullscreen">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-4" id="exampleModalFullscreenLabel">Full screen modal</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        ...
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
{/* aqui termina el modal de crear equipo */}




//listarequipos
<button 
          
          type="button" 
          className="btn btn-outline-primary"
          data-bs-toggle="modal" 
          data-bs-target="#exampleModal" 
          data-bs-whatever="@mdo"
        >
          Agregar
        </button>
            <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Estado</th>
          <th scope="col">Fecha</th>
          <th scope="col">Fecha-Actualizada</th>
          <th scope="col"></th>
        </tr>
      </thead>
  <tbody className="table-group-divider">
    {
      equipos1 != null ? equipos1.map((tipoequipos, index) => {
        return(
          <tr key={tipoequipos.id}>
      <th scope="row">{index+1}</th>
      <td>{tipoequipos.name}</td>
      <td>{tipoequipos.estado ? valido : invalido}</td>
      <td>{tipoequipos.date}</td>
      <td>{tipoequipos.dateUp}</td>
      <td><button type="button" className="btn btn-success"
      data-bs-toggle="modal" 
      data-bs-target="#exampleModal15" 
      data-bs-whatever="@mdo"
      value={tipoequipos.id}
      name={tipoequipos.name}
      
      onClick={idImport}
      >Editar</button>
      {" "}
      <button type="button" className="btn btn-danger"
      onClick={eliminar} value={tipoequipos.id}
      >Eliminar</button></td>
    </tr>
        )
      }): nada }
  
  </tbody>
</table>
//aqui termina listarequipos



//recuperar de fechaCompra
<label htmlFor="recipient-name" className="col-form-label">Fecha-Compra:</label>
            <input 
            type="text"
            placeholder="Escribe un email"
            className="form-control"
            id="recipient-email17"
            required
            value={newEquipo.fechaCompra}
            onChange={event => setNewEquipo({ fechaCompra: event.target.value,
              serial: newEquipo.serial,
              modelo: newEquipo.modelo,
              descrip: newEquipo.descrip, foto: newEquipo.foto, color: newEquipo.color,
              precio: newEquipo.precio, usuario: newEquipo.usuario,
              marca: newEquipo.marca, estado: newEquipo.estado, equipo: newEquipo.equipo
            })}
            />

            //newEditarinventario-FechaCompra

            <label htmlFor="recipient-name" className="col-form-label">Fecha-Compra:</label>
            <input 
            type="text"
            className="form-control"
            id="recipient-name7"
            
            value={newEditarEquipo.fechaCompra==="" ? equipoRecuperado.fechaCompra : newEditarEquipo.fechaCompra}
            name={equipoRecuperado.name}
            onChange={event => setNewEditarEquipo({ 
              fechaCompra: event.target.value==="" ? equipoRecuperado.fechaCompra : event.target.value,
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
            />
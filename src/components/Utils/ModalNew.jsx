function ModalNew({
    title,
    refrescarNew,
  handleSubmit,
  handleSetEquipoNew,
  newEquipo,
}) {
    return ( 
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Crear Nuevo {title}</h1>
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
            onChange={handleSetEquipoNew}
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
     );
}

export default ModalNew;
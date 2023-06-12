import { axiosConfig } from "../configuration/axiosConfig";

//obtener equipos

const getTipoEquipos = (rutas, token) => {
  return axiosConfig.get(`${rutas}/mostrar`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    }
  })
}

const createTipoEquipo = (rutas , data = {}, token) => {
  return axiosConfig.post(`${rutas}`, data, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    }
  })
}

const editarTipoEquipo = (id, rutas, data = {}) => {
  return axiosConfig.put(`${rutas}/${id}`, data, {
    headers: {
      "Content-Type": "application/json"
    }
  })
}

const eliminarTipoEquipo = (rutas ,id) => {
  return axiosConfig.delete(`${rutas}/${id}`, {
    headers: {
      "Content-Type": "application/json"
    }
  })
}

export {
  getTipoEquipos, createTipoEquipo, editarTipoEquipo, eliminarTipoEquipo
}
import v from "../../imagenes/v.jpg"
import foto2 from "../../imagenes/foto2.png"
import { Link, NavLink, useLocation } from "react-router-dom";
import { useState, useContext } from "react";
import TokenContext from "../Utils/Context"

function Encabezado() {
  const {token, setToken} = useContext(TokenContext)
  /*
  const location = useLocation()
  const [sitio, setSitio] = useState("")
  const [sitio2, setSitio2] = useState("")
  
  const handleClick = (sitio2) => {
    

    if (sitio2==="/equipo/"){
      
      
      return setSitio("tipoequipos")
      
      
    }else if(sitio2==="/estado"){
      
      return setSitio("estadoequipos")
    }else if(location.pathname==="/usuario"){
      console.log(sitio)
      return setSitio("usuarios")
    }else if(location.pathname==="/marca"){
      return setSitio("marcas")
    }else if(location.pathname==="/inventario"){
      return setSitio("inventarios")
    }else {
      console.log("NO ENTRE A NADA")
      console.log(sitio2)
    }
    console.log(sitio)
  }
*/
    return ( 
        <header className="p-3 text-bg-dark" style={{width: "100%"}}>
    <div className="container">
      <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <a href="#" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
          <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use></use></svg>
          <img className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap" src={foto2}></img>
        </a>

        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li><NavLink to="/" className="nav-link nav-item px-2 text-secondary">Home</NavLink>
          </li>
          
          <li><NavLink to="/equipo/"
           className="nav-link nav-item px-2 text-white activeClass">
            Equipo
            </NavLink></li>
          <li><NavLink 
          
          to="/estado"
          className="nav-link nav-item px-2 text-white"
            >
            Estado-Equipo
            </NavLink></li>
          <li><NavLink to="/usuario" className="nav-link px-2 text-white">Usuario</NavLink></li>
          <li><NavLink to="/marca" className="nav-link px-2 text-white">Marca</NavLink></li>
          <li><NavLink to="/inventario" className="nav-link px-2 text-white">Inventario</NavLink></li>
        </ul>

        <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
          <input type="search" className="form-control form-control-dark text-bg-dark" placeholder="Search..." aria-label="Search"/>
        </form>

        <div className="text-end">
          <button type="button" className="btn btn-outline-light me-2">{token.name}</button>
          <button type="button" className="btn btn-warning"
              onClick={() => setToken(null)}
          >Sign-Out</button>
        </div>
      </div>
      
    </div>
  </header>
     );
}

export default Encabezado;
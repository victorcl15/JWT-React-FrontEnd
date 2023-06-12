import React, {useEffect, useState, useContext} from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import logo from './logo.svg';
import './App.css';

import Inicio from  "./components/Inicio"
import Equipo from './components/Equipo';

import Estado from './components/Estado';
import Encabezado from './components/IU/Encabezado';
import Usuario from './components/Usuario';
import Marca from './components/Marca';
import Inventario from './components/Inventario';
import NotFound from './components/Utils/NotFound';
import Login from './components/Login';
//import {TokenContextProvider} from './components/Utils/Context';
import TokenContext from "./components/Utils/Context"

function App() {

 

  const {token} = useContext(TokenContext)
  
  //let todo = ""
  /*
   const todo = fetch("http://localhost:80/api/equipos").then(res =>  res.json()).then(respon => {
    respon.map(f => console.log(f)
    
    )
   })

*/

  return (
    <div>
     

     {token ? (<BrowserRouter>
      
        
      <Encabezado></Encabezado>
        <Routes>
          <Route path="/" element={<Inicio></Inicio>}></Route>
          <Route path="/inicio" element={<Inicio></Inicio>}></Route>
          <Route path="/equipo/" element={<Equipo></Equipo>}></Route>
          <Route path="/estado" element={<Estado/>}></Route>
          <Route path="/usuario" element={<Usuario/>}></Route>
          <Route path="/marca" element={<Marca/>}></Route>
          <Route path="/inventario" element={<Inventario/>}></Route>
          <Route path="*" element={<NotFound></NotFound>}></Route>
        </Routes>
        
      </BrowserRouter>) : <Login></Login>}
      
     
     
    </div>
  );
}

export default App;

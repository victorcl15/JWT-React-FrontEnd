import React, { useEffect, useState, useContext } from "react";
import loginService from "../servicios/login"
import { useLoginToken } from "./Utils/useLoginToken";
import TokenContext from "./Utils/Context"
import DV from "../imagenes/VD.jpg"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [user, setUser] = useState(null)
  const {user, getUserToken} = useLoginToken()
  const {token, setToken} = useContext(TokenContext)
  

  //const {access_token} = user;

  const handleSubmit = async(event) => {
        event.preventDefault() 

        try{

        getUserToken({email, password})
        /*
        const user = await loginService.login({
            email,
            password
  })
  */



 // setUser(user)
  setEmail("")
  setPassword("")
        
        console.log("this es submittt")
}catch(e){
    console.log(e)
}
  }

  const loginForm = () => {



    return (

      <div className="d-flex flex-column align-items-center">
   

  <form onSubmit={handleSubmit}>
    <img className="mb-4" src={DV} alt="" width="200" height="147"/>
    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

    <div className="form-floating">
      <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"
      value={email}
      onChange={(event) => setEmail(event.target.value)}
      />
      <label for="floatingInput">Email address</label>
    </div>
    <div className="form-floating">
      <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
      value={password}
      onChange={(event) => setPassword(event.target.value)}
      />
      <label for="floatingPassword">Password</label>
    </div>

    <div className="form-check text-start my-3">
      <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault"/>
      <label className="form-check-label" for="flexCheckDefault">
        Remember me
      </label>
    </div>
    <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>
    <p className="mt-5 mb-3 text-body-secondary">© 2017–2023</p>
  </form>


    </div>
    )
  }

  return (
    <>
      {
        token !== null ?  <>Hi</> : loginForm()


      }
    
    </>
  );

 
};

export default Login;


import React, { useEffect, useState, useMemo, useRef, useContext } from "react";
import loginService from "../../servicios/login"
import TokenContext from "./Context"


export function useLoginToken (){

    const [user, setUser] = useState(null)
    //const userToken = useRef(user)
   const {setToken, userToken} = useContext(TokenContext)


      const getUserToken = useMemo(() => {
        return async({email, password}) => {
     
    
          try{
  
            
            
            
            const user = await loginService.login({
                email,
                password
      })
      
          setUser(user)
          userToken.current = user
         setToken(user)
          console.log(user)
          }catch{
           
          } finally{
          
          }
      }
       
  
      },[])
  
/*
      const sortedMovies = useMemo(() => { 
        console.log("memoSortedMovies")
       return movies ?  sort
      ? [...movies].sort((a,b) => a.title.localeCompare(b.title))
      : movies : console.log("no hay movies")
  }, [sort, movies])
    
      */
  
      return {user, getUserToken, userToken}
    }



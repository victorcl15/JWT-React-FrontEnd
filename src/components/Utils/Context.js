
import React, { useState, useRef } from "react";

const Context = React.createContext({})

export function TokenContextProvider ({children}){
    const [token, setToken] = useState(null)
    const userToken = useRef(null)

    return <Context.Provider value={{token, setToken, userToken}}> 
        {children}
    </Context.Provider>
}


export default Context

import axios from "axios"

const baseURL = "http://localhost:80/auth"

const login = async credentials => {
    const {data} = await axios.post(baseURL, credentials)


    
    return data
}

export default {login}
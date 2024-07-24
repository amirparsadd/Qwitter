import axios from "axios"
import endpoints from "../data/endpoints"

export async function checkAuthStatus(){
  try {
    const result = await axios.get(
      endpoints.API_AUTHSTATUS,
      { responseType: "json" }
    )
  
    if(result.status == 200){
      return result.data
    }else {
      return
    }
  } catch (err) {
    return
  }
}

export async function authenticate(username: string, password: string) {
  try {
    const result = await axios.post(
      endpoints.API_AUTH, 
      { username, password },
      { headers: { "Content-Type": "application/json" }, responseType: "json" }
    )

    if(result.status = 400){
      
    }
  } catch (err) {
    return
  }
}
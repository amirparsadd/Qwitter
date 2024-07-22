import axios from "axios"

export async function checkAuthStatus(){
  try {
    const result = await axios.get("http://localhost:8080/api/auth/status", { responseType: "json" })
  
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
  
}
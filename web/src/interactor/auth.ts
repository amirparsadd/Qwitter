import endpoints from "../data/endpoints"
import { get, post } from "./requests"
import { generateError } from "../utils/errors"

export async function checkAuthStatus(){
  const result = await get(endpoints.API_AUTHSTATUS)

  if(!result) return
  if(result.error) return false

  return true
}

export async function getAuthData(){
  const result = await get(endpoints.API_AUTHSTATUS)

  if(!result) return
  if(result.error) return false

  return result
}

export async function authenticate(username: string, password: string) {
  const result = await post(endpoints.API_AUTH, { username, password })

  if(!result) return false
  if(result.error) return generateError(result.status, result.data.error)

  return true
}
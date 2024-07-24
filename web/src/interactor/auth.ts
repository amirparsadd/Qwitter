import endpoints from "../data/endpoints"
import { get, post } from "./requests"
import status from "../data/status"
import errors from "../data/errors"
import { generateError } from "../utils/errors"

export async function checkAuthStatus(){
  const result = await get(endpoints.API_AUTHSTATUS)

  if(!result) return
  if(result.error) return false

  return true
}

export async function authenticate(username: string, password: string) {
  const result = await post(endpoints.API_AUTH, { username, password })

  if(!result) return

  if(result.error) {
    return generateError(result.status, result.data.error)
  }
}
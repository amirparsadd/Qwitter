import axios from "axios"
import status from "../data/status"
import { extractError } from "../utils/errorExtractor"


export type BodySupported = string | number | KV_String_BODYSUPPORTED
export interface KV_String_BODYSUPPORTED {
  [key: string]: BodySupported
}

export async function get(endpoint: string){
  try {
    const result = await axios.get(endpoint, { responseType: "json" })
    if(status.success[result.status]) return result.data
    
    return generateRawError(result.status, result.data)
  } catch (err) {
    console.error(err)
  }
}

//* FUCK PASSPORT.JS
export async function post(endpoint: string, body: KV_String_BODYSUPPORTED | undefined) {
  try {
    const result = await axios.post(
      endpoint, 
      body,
      { headers: { "Content-Type": "application/json" }, responseType: "json" }
    )

    return status.success[result.status] ? result.data : generateRawError(result.status, result.data)
  } catch (err) {
    console.error(err)
    
    if(!axios.isAxiosError(err)) return

    const isNetworkError = err.code == "ERR_NETWORK"
    if(isNetworkError) return

    return generateRawError(err.response?.status, err.code == "ERR_BAD_REQUEST" ? err.response?.data : extractError(err.response?.data))
  } 
}

export async function deleteRequest(endpoint: string) {
  try {
    const result = await axios.delete(endpoint)
    if(status.success[result.status]) return result.data

    return generateRawError(result.status, result.data)
  } catch(err) {
    console.error(err)
    
    if(!axios.isAxiosError(err)) return

    const isNetworkError = err.code == "ERR_NETWORK"
    if(isNetworkError) return

    return generateRawError(err.response?.status, err.code == "ERR_BAD_REQUEST" ? err.response?.data : extractError(err.response?.data))
  }
}

function generateRawError(status: number | undefined, data: any){
  return {
    error: true,
    status: status,
    data: data
  }
}
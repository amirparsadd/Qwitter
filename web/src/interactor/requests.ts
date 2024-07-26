import axios from "axios"
import status from "../data/status"
import { extractError } from "../utils/errorExtractor"

export interface KV_String_BODYSUPPORTED {
  [key: string]: any
}

export async function get(endpoint: string){
  try {
    const result = await axios.get(
      endpoint,
      { responseType: "json" }
    )
  
    if(status.success[result.status]){
      return result.data
    }else {
      return {
        error: true,
        status: result.status,
        data: result.data
      }
    }
  } catch (err) {
    console.error(err)
    return
  }
}

export type BodySupported = string | number | KV_String_BODYSUPPORTED

//* FUCK PASSPORT.JS
export async function post(endpoint: string, body: KV_String_BODYSUPPORTED | undefined) {
  try {
    const result = await axios.post(
      endpoint, 
      body,
      { headers: { "Content-Type": "application/json" }, responseType: "json" }
    )

    if(status.success[result.status]){
      return result.data
    }else {
      return {
        error: true,
        status: result.status,
        data: result.data
      }
    }
  } catch (err) {
    console.error(err)
    if(axios.isAxiosError(err)){
      if(err.code == "ERR_NETWORK"){
        return
      }
      if(err.code == "ERR_BAD_REQUEST"){
        return {
          error: true,
          status: err.response?.status,
          data: err.response?.data
        }
      }
      return {
        error: true,
        status: err.response?.status,
        data: extractError(err.response?.data)
      }
    }
  } 
}
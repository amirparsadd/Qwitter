import axios from "axios"
import status from "../data/status"

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
    return
  } 
}
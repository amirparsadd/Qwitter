import { get, post } from "./requests"
import endpoints from "../data/endpoints"

export async function getPosts(batch: number){
  try{
    const result = await get(endpoints.API_POSTS_GET(batch))
  
    console.log(result) // FIXME Remove Debug
    return result
  } catch(err){
    return
  }
}

export async function createPost(content: string) {
  const result = await post(endpoints.API_POSTS_POST, { content })

  if(!result || result.error) return false

  return true
}
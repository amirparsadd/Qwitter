const API = "http://localhost:8080/api/"

export default {
  API_AUTHSTATUS: API + "auth/status",
  API_AUTH: API + "auth",
  API_POSTS_GET: (batch: number) => {
    return API + "posts/" + batch
  },
  API_POSTS_POST: API + "posts/"
}
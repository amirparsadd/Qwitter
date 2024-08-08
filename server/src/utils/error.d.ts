interface ServerError {
  status?: HttpStatusCode,
  error: string,
  path: string
}
interface IServerError {
  status: number,
  error: string,
  path: string
}

interface IServerErrorGeneratorOptions {
  msg: string,
  path: string
}
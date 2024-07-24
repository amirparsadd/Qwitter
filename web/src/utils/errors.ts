import errors from "../data/errors"
import statusCodes from "../data/status"

export function generateError(status: number, error: string){
  return {
    statusText: statusCodes.error[status],
    message: errors[error]
  }
}
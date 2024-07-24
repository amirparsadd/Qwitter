export interface KV_String_String {
  [key: string]: string
}

const data: KV_String_String = {
  ERR_UNEXPECTED                  : "An unexpected error occured!",
  ERR_UNAUTHORIZED                : "Your account is unauthorized.",

  ERR_BATCH_NUMERIC               : "The batch value must be numeric.",
  ERR_BATCH_INTEGER               : "The batch value must not be floating point.",

  ERR_CONTENT_STRING              : "The content value must be a string.",
  ERR_CONTENT_EMPTY               : "The content value must not be empty.",
  ERR_CONTENT_LEN_MIN10_MAX500    : "The content value's length must be between 10-500",

  ERR_USERNAME_STRING             : "The username value must be a string.",
  ERR_USERNAME_EMPTY              : "The username value must not be empty.",
  ERR_USERNAME_LEN_MIN3_MAX16     : "The username value's length must be between 3-16",
  
  ERR_PASSWORD_STRING             : "The password value must be a string.",
  ERR_PASSWORD_EMPTY              : "The password value must not be empty.",
  ERR_PASSWORD_LEN_MIN6_MAX16     : "The password value's length must be between 6-24",
  ERR_PASSWORD_WRONG              : "The password value is wrong.",
  
  ERR_USER_NOTFOUND               : "The specified user was not found.",

  ERR_ID_STRING                   : "The password value must be a string.",
  ERR_ID_LEN24                    : "The password value's length must be exactly 24 characters",
}

export default data
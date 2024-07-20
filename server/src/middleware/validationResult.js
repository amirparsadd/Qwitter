( req, res, next ) => {
  const result = validationResult(req)
  if(!result.isEmpty()){
    return res.status(400).json(generateErrorJSON(result))
  }
  next()
}
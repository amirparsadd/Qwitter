const { Router } = require("express")
const { param } = require("express-validator")

const router = Router()

router.get("/:batch",
  param()
  .optional()

  .isNumeric()
  .withMessage("Must Be Numeric")

  .isInt()
  .withMessage("Must Be An Integer"),
  ( req, res ) => {

})

module.exports = router
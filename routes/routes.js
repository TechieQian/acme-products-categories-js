const express = require("express")
const router = express.Router()


router.get('/', (req,res) => res.render('index.html'))


module.exports = function (io) {
  return router
}

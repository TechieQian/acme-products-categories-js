const express = require("express")
const router = express.Router()
const db = require("../db.js")


router.get('/', (req,res) => res.render('index.html', {"categories" : db.getCategoryNames()}))

router.get('/categories/:category/*', function(req,res) {
  console.log("hit the cat get route")
  res.render('products.html', {name : req.params.category })
})

module.exports = function (io) {

  router.post('/categories', function(req,res) {
    db.createCategory(req.body["category-name"])
    res.redirect('/')
  })
  return router
}

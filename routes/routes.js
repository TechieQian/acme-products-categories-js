const express = require("express")
const router = express.Router()
const db = require("../db.js")

router.get('/', (req,res) => res.render('index.html', {"categories" : db.getCategoryNames()}))

router.get('/categories/:category/*', function(req,res) {
  res.render('products.html', {name : req.params.category, categories : db.getCategoryNames(), products : db.getProductsByCategory(req.params.category)})
})

module.exports = function (io) { // I was gonna implement socket on this one too but eh... 

  router.post('/categories', function(req,res) {
    db.createCategory(req.body["category-name"])
    res.redirect('/categories/'+req.body["category-name"]+'/products')
  })

  router.post('/categories/:category/*', function(req,res) {
    db.createProduct(req.params.category, req.body)
    res.redirect('/categories/' + req.params.category + '/products')
  })

  router.delete('/categories/:category/:productId', function(req,res) {
    db.deleteProduct(req.params.category, +req.params.productId)
    res.redirect('/categories/' + req.params.category + '/products')
  })

  router.delete('/categories/:category/', function(req,res) {
    db.deleteCategory(req.params.category)
    res.redirect('/')
  })

  return router
}

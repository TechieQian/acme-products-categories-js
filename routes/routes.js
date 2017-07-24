const express = require("express")
const router = express.Router()
const db = require("../db.js")

router.get('/', (req,res) => res.render('index.html', {"categories" : db.getCategoryNames()}))

router.get('/categories/:category/*', function(req,res) {
  res.render('products.html', {name : req.params.category, categories : db.getCategoryNames(), products : db.getProductsByCategory(req.params.category)})
})

module.exports = function (io) { // I was gonna implement socket on this one too but eh...

  router.post('/categories', function(req,res) {
    let categoryName = req.body["category-name"].trim()
    if (categoryName && !~db.getCategoryNames().indexOf(categoryName)) {
      db.createCategory(categoryName)
      res.redirect('/categories/'+categoryName+'/products')
    }
    res.redirect('/')
  })

  router.post('/categories/:category/*', function(req,res) {
    if (req.body["name"]) {
      db.createProduct(req.params.category, req.body)
    }
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

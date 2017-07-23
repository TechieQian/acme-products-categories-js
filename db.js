var data = {
  "Bar Category": [
    {
      "name": "bar 1",
      "id": 1
    },
    {
      "name": "bar 2",
      "id": 2
    },
    {
      "name": "bar 1",
      "id": 3
    }
  ],
  "Foo Category": [
    {
      "name": "Fufu",
      "id": 1
    },
    {
      "name": "Fubu",
      "id": 2
    },
    {
      "name": "",
      "id": 3
    }
  ],
  "": []
}

module.exports = {
  getCategoryNames : function() {
    return Object.keys(data)
  },
  getProductsByCategory : function(input) {
    for (var category in data) {
      if (category == input) {
        return data[category]
      }
    }
  },
  createProduct : function (category, product) {
    data[category].push(product)
  },
  deleteProduct : function(category, name) {
    data[category] = data[category].filter( (prod) => prod.name != name)
  },
  updateProduct : function(category, product) {
    data[category].forEach(
      function(prod,idx,arr) {
        if (prod.name == product.name) {
          arr[idx] = product
        }
      }, this
    )
  },
  deleteCategory : function(categoryName) {
    delete data[categoryName]
  },
  createCategory : function(categoryName) {
    data[categoryName] = []
  }
}

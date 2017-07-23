const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const morgan = require("morgan")
const server = app.listen(port, () => `Listening on ${port}`)
const socket = require('socket.io')
const io = socket.listen(server) // Was planning to do this. Perhaps later.
const route = require("./routes/routes")
const swig = require('swig')
const bodyParser = require('body-parser')

//Debug
app.use('/', morgan('dev'))

//Render
app.set('view engine', 'html')
app.engine('html', swig.renderFile)
swig.setDefaults({ cache : false});

//Body Parser
app.use(bodyParser.urlencoded({ extended: false }))

//Override Post to deleteProduct
app.use(require('method-override')('_method'))

//Router
app.use('/', route(io))

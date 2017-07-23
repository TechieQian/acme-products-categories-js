const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const morgan = require("morgan")
const server = app.listen(port, () => `Listening on ${port}`)
const socket = require('socket.io')
const io = socket.listen(server)
const route = require("./routes/routes")
const swig = require('swig')
const bodyParser = require('body-parser')
//Debug
app.use('/', morgan('dev'))

//Render
app.set('view engine', 'html')
app.engine('html', swig.renderFile)
swig.setDefaults({ cache : false});

//

//Router
app.use('/', route(io))

app.get('/', (req,res) => res.send("hi2u"))

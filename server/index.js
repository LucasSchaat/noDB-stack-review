require('dotenv').config()
const express = require ('express')
const app = express()
const massive = require('massive')
const cors = require ('cors')
const {SERVER_PORT, CONNECTION_STRING} = process.env
const ctrl = require('./controllers/controller')

app.use(express.json())
app.use(cors())

massive(CONNECTION_STRING)
.then(db => {
    app.set('db', db)
    console.log('db connected')
    app.listen(SERVER_PORT, () => console.log(`Server listening on ${SERVER_PORT}`))
})

app.get('/api/employees', ctrl.getEmployees)
app.put('/api/employees/:id', ctrl.editEmployee)
app.post('/api/employees', ctrl.addEmployee)
app.delete('/api/employees/:id', ctrl.deleteEmployee)

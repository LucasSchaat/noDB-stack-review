// OLD CODE
// const employees = require('../data.json')
// let id = 21

module.exports = {
    getEmployees: async (req, res) => {
        const db = req.app.get('db')

        db.get_employees()
        .then(response => res.status(200).send(response))
        .catch(err => {
            res.status(500).send({errorMessage: 'Something broke'})
            console.log(err)
        })

        // OLD CODE
        // res.status(200).send(employees);
    },

    editEmployee: (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params
        const {first, last, email, gender} = req.body

        db.edit_employee([id, first, last, email, gender])
        .then(response => res.status(200).send(response))
        .catch(err => {
            res.status(500).send({errorMessage: 'Something broke'})
            console.log(err)
        })

        // OLD CODE
        // const {id} = req.params
        // const index = employees.findIndex(person => person.id === +id)
        // employees.splice(index, 1, req.body)
        // console.log(employees)
        // res.status(200).send(employees)
    },

    addEmployee: (req, res) => {
        const db = req.app.get('db')
        const {first, last, email, gender} = req.body

        db.add_employee([first, last, email, gender])
        .then(data => res.status(200).send(data))
        .catch(err => {
            res.status(500).send({errorMessage: 'Something broke'})
            console.log(err)
        })

        
        // OLD CODE
        // console.log('req.body', req.body)
        // const {first, lastName, email, gender} = req.body
        // const newEmployee = {
        //     id,
        //     first,
        //     lastName,
        //     email,
        //     gender
        // }
        // id++
        // employees.push(newEmployee)
        // res.status(200).send(employees)
    },

    deleteEmployee: (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params

        db.delete_employee(id)
        .then(data => res.status(200).send(data))
        .catch(err => {
            res.status(500).send({errorMessage: 'Something broke'})
            console.log(err)
        })

        // OLD CODE
        // const {id} = req.params
        // const index = employees.findIndex(person => person.id === +id)
        // employees.splice(index, 1)
        // console.log(employees)
        // res.status(200).send(employees)
    }
}
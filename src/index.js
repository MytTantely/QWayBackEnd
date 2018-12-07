const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000

const BASE_URL = `/api/v1`;

const CB = require('../src/model/couchbaseUtil');

// app.use(bodyParser.urlencoded({extended: false}))
// app.use(bodyParser.json())

app.get(`${BASE_URL}/companies/`, (req, res) => {

    let query = 'SELECT * FROM QWayDB';
    CB.getAll(query)
        .then(rows => res.send(rows.map(val => val.QWayDB)))
        .catch(err => console.log(err));

})

app.get(`${BASE_URL}/company/:id`, (req, res) => {

    CB.get(`COMPANY::${req.params.id}`)
        .then(result => {
            let data = {
                status: 'success',
                data: result.value,
                cas: result.cas
            }

            res.send(data)
        })
        .catch(err => console.log(err));

})

// app.post(`${BASE_URL}/companies`, (req, res) => {
//     console.log('POST IS CALLED')
//     console.log(req.body)
//     res.status = 200
//     res.send('All good!')
// })


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
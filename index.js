const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const winston = require('winston')
const expressWinston = require('express-winston')
require('winston-daily-rotate-file');

const serviceId = Math.floor(Math.random() * 900) + 100
const servicesUUID = require('uuid').v4()

console.log = require('./config/logger')
app.use(expressWinston.logger(require('./config/expressLogger')))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

let requestId = 0
app.use('/now', function(req,res) {
    res.send({
        serviceId : serviceId,
        servicesUUID : servicesUUID,
        requestId : requestId++,
        method : req.method,
        query : req.query,
        body : req.body,
    })
})

app.use('/', function (req, res) {
    let resTime = (Math.floor(Math.random() * 5) + 0) * 500
    setTimeout(()=>{
        res.send({
            serviceId : serviceId,
            servicesUUID : servicesUUID,
            requestId : requestId++,
            method : req.method,
            query : req.query,
            body : req.body,
            resTime
        })
    }, resTime)  
})

app.listen(process.env.PORT || 8080,()=>{
    console.log(`Server run on PORT : ${process.env.PORT || 8080}`)
})
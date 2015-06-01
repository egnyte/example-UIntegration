var express = require('express')
var cors = require('cors')
var path = require('path')
var bodyParser = require('body-parser')
var definition = require('./definition')
var app = express()

app.use(cors())
app.options('*', cors())

app.use(bodyParser.json())

var router = express.Router();

router.get('/definition.json', function (req, res) {
    res.sendFile(path.resolve(__dirname, './definition.json'))
})
router.use('/staticapp', express.static(__dirname + "/public"))


var sessions = {};

router.post('/service', function (req, res) {
    var randId = "S" + Math.random().toFixed(5)
    sessions[randId] = req.body
    console.log("[%s] got post", randId, req.body)
    res.status(200).json({
        redirect: definition.serviceURL + "/" + randId
    })
})

router.get('/service/:id', function (req, res) {
    if (!sessions[req.params.id]) {
        res.status(500).end("Unrecognized redirect id: %s", req.params.id);
    } else {
        res.set('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(sessions[req.params.id], null, 4));
    }
})
router.get('/service', function (req, res) {
    res.status(400).send('You were supposed to make a POST request')
})

app.use("/exampleuint", router)


app.listen(10003);
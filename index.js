var express = require('express')
var cors = require('cors')
var path = require('path')
var bodyParser = require('body-parser')

var app = express()

app.use(cors())
app.options('*', cors())

app.use(bodyParser.json())

var router = express.Router();

router.use('/definition.json', function (req, res) {
    res.sendFile(path.resolve(__dirname, './definition.json'));
})
router.use('/staticapp', express.static(__dirname + "/public"))

router.post('/service', function (req, res) {
    console.log("got post", req.body)
    res.status(200).json({
        redirect: "http://xkcd.com"
    })
})

router.get('/service', function (req, res) {
    res.status(400).send('You were supposed to make a POST request')
})

app.use("/exampleuint", router);


app.listen(10003);
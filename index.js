var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')

var app = express()

app.use(cors())
app.options('*', cors())

app.use(bodyParser.json())

var router = express.Router();

router.use('/definition.json', function (req, res) {
    res.sendFile('definition.json');
})
router.use('/staticapp', express.static(__dirname + "/public"))

router.post('/service', function (req, res) {
    console.log("got post", req.body)
    res.status(200).json({
        redirect: "http://xkcd.com"
    })
})

app.use("/exampleuint", router);


app.listen(10003);
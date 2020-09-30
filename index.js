const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid');


const FULL_APP_HOSTNAME =  'https://integrations-staging.qa-egnyte.com';

//Create an instance of a HTTP server
const app = express();


app.use('/exampleuint/health', function(req,res){
    res.end('ok')
});

//Serve the static files
app.use('/exampleuint/staticapp', express.static(__dirname + '/public'));

//this variable will pretend to be a database
const ongoingInvocations = {};

//Parse all incoming requests as JSON if content-type says so
app.use('/exampleuint/service',bodyParser.json());

//handle Step1 of invocation process - POST with access token and details
app.post('/exampleuint/service', function (req, res) {
    const randomInvocationId = uuid.v4(); //JavaScript tip: Math.random() is not good enough for security purposes. use a proper UUID generator instead
    const invocationInput = req.body; //This is what documentation also calls invocationInput
    //save all incoming information in some back-end storage
    ongoingInvocations[randomInvocationId] = invocationInput;
    console.log('got post', randomInvocationId, invocationInput);

    //respond with a URL to Step2 with the unique ID that identifies the input and credentials sent in step1
    res.status(200).json({
        redirect: FULL_APP_HOSTNAME + '/exampleuint/service/' + randomInvocationId
    });
});

//handle Step2 of invocation process - use the ID in url to put invocationInput in session or pin ID to session...
app.get('/exampleuint/service/:id', function (req, res) {
    if (!ongoingInvocations[req.params.id]) {
        res.status(500).end('This invocation id does not work anymore: ' + req.params.id);
    } else {
        //here you would use the credentials and data to do the interesting part
        //instead, this app just returns it so you can see what was sent
        res.set('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(ongoingInvocations[req.params.id], null, 4));

        //The id should be usable only once. After data and credentials get used, it needs to be invalidated
        //if you need to keep using the data from step1 read more about the flow in https://developers.egnyte.com/docs/read/UI_Integration_Framework
        //but remember that Egnyte credentials should not be sent to the browser in cookies or persisted in localStorage
        //it's recommended that you create a session and save them there.
        delete ongoingInvocations[req.params.id];
    }
});

//make the http pserver listen to requests on a port
app.listen(8080);

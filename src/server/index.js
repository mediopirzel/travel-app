// Setup empty JS object to act as endpoint for all routes
myTrips = [];
currentTrip = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/*Dependencies */
const bodyParser = require('body-parser');

/* Dates */
const moment = require('moment');


/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));


// Setup Server
const port = 8081;
const server = app.listen(port, ()=> {console.log(`server running on localhost ${port}`) });
console.log('moment');
console.log(moment());

//post route, filling projectdata enpoint object
app.post('/addData', fillCurrentTrip);

function fillCurrentTrip(req,res) {
    //assign all elements of the revided object to a temp object.
    Object.assign(currentTrip, req.body);
    res.send(currentTrip);
    //console.log('Inside fillProjectData)');
    //console.log(currentTrip);
}

// get route, sending project data for updating UI
app.get('/getCurrent', sendCurrent);

function sendCurrent(req,res){
    res.send(currentTrip);
    //console.log('Inside sendContent:');
    //console.log(currentTrip);
}

// get route, sending project data for updating UI
app.get('/getTrips', sendTrips);

function sendTrips(req,res){
    res.send(myTrips);
    //console.log('Inside sendContent:');
    //console.log(currentTrip);
}

app.get('/save',  saveCurrent);
function saveCurrent(req,res){
    //push current trip
    myTrips.push(currentTrip)
    //clean current Trip
    currentTrip = {};
    res.send(myTrips);
    //console.log('after push');
    console.log(myTrips);
}

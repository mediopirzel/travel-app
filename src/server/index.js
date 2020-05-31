// Setup empty JS object to act as endpoint for all routes
let myTrips = [];
let currentTrip = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/*Dependencies */
const bodyParser = require('body-parser');

/* Dates */
const moment = require('moment');

//Environment Variables
const dotenv = require('dotenv');
dotenv.config();


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

//post route, filling projectdata enpoint object
app.post('/addData', fillCurrentTrip);

function fillCurrentTrip(req,res) {
    //assign all elements of the recided object to a temp object.
    if(currentTrip.imageUrl){
        //first delete previous trip
        currentTrip = {} 
    }

    Object.assign(currentTrip, req.body);
    res.send(currentTrip);
}


//copy a saved trip to current trip
app.get('/copyTrip/trip/:idTrip', copySendTrip);

function copySendTrip(req,res){
    const requestedTrip = req.params.idTrip;
    Object.assign(currentTrip, myTrips[requestedTrip]);
    //add identifier if need it
    currentTrip.idTrip = requestedTrip

    res.send(currentTrip);
}


//delete current trip
app.get('/delete/trip/:idTrip', deleteTrip);

function deleteTrip(req,res){
    const requestedTrip = req.params.idTrip;
    myTrips.splice(requestedTrip, 1)
    res.send(currentTrip);

}



// sends current trip
app.get('/getCurrent', sendCurrent);

function sendCurrent(req,res){
    res.send(currentTrip);
}

// sends all saved trips
app.get('/getTrips', sendTrips);

function sendTrips(req,res){
    res.send(myTrips);
    
}

//add current trip to saved trips
app.get('/save',  saveCurrent);
function saveCurrent(req,res){
    myTrips.push(currentTrip)
    //clean current trip
    currentTrip = {};
    res.send(myTrips);
}

// Express server test
app.get('/test', (req, res) => {
    res.status(200).send('Server Running!')
})

module.exports = app

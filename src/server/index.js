// Setup empty JS object to act as endpoint for all routes
myTrips = [];
currentTrip = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/*Dependencies */
const bodyParser = require('body-parser');

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
    
    currentTrip['countryName'] = req.body.countryName;
    currentTrip['lat'] = req.body.lat;
    currentTrip['lng'] = req.body.lng;

    res.send(currentTrip);
    
    console.log('Inside fillProjectData)');
    console.log(currentTrip);
}

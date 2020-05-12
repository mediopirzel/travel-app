// Setup empty JS object to act as endpoint for all routes
projectData = {};

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
app.use(express.static('website'));


// Setup Server
const port = 8000;
const server = app.listen(port, ()=> {console.log(`server running on localhost ${port}`) });



// get route, sending project data for updating UI
app.get('/add', sendContent);

function sendContent(req,res){
    res.send(projectData);
    //console.log('Inside sendContent()');
    //console.log(projectData);
}

//post route, filling projectdata enpoint object
app.post('/addData', fillProjectData);

function fillProjectData(req,res) {
    projectData['temp'] = req.body.temp;
    projectData['date'] = req.body.date;
    projectData['feel'] = req.body.feel;
    res.send(projectData);
    //console.log('Inside fillProjectData)');
    //console.log(projectData);
}


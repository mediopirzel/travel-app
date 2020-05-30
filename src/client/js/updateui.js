import moment from 'moment';
const bodyTag = document.querySelector('body');
const currentTag = document.querySelector('.current-trip');
const tripsTag  = document.querySelector('.my-trips');  

const menuSearch =  document.querySelector('.menu-search');
const menuMyTrips =  document.querySelector('.menu-my-trips');

const formLabel = document.querySelector('.main-search').querySelector('h3');


menuSearch.addEventListener('click', (event) =>{
    event.preventDefault();
    bodyTag.setAttribute('class', 'search-view');
    Client.cleanForm()
})

menuMyTrips.addEventListener('click', (event) =>{
    event.preventDefault();
    bodyTag.setAttribute('class', 'trips-view');
    Client.showSavedTrips();
})

tripsTag.addEventListener('click', function (event) {
    event.preventDefault();
    if (event.target.nodeName === 'A') {  // ← verifies target is desired element

        let trip = event.target.getAttribute("trip-index")
        console.log(`el id de trip es: ${trip }`);
        Client.saveCurrentTrip(`http://localhost:8081/copyTrip/trip/${trip}`)
        .then(
            (savedData)=>{
                Client.showCurrentTrip()
            }
            
        )
    }
});

const showStatus = (message)=> {
    formLabel.textContent = message;
}

const cleanForm = ()=> {
    document.getElementById('destination-field').value = '';
    document.getElementById('date-field').value = moment().format('YYYY-MM-DD');
    showStatus('Please enter your destination and date you plan to travel.')
}
cleanForm();



const showSavedTrips = async () => {
    //console.log('painting all trips')
    const req = await fetch('http://localhost:8081/getTrips');
    bodyTag.setAttribute('class', 'trips-view');
    try{
        const trips = await req.json();
        tripsTag.innerHTML = '';

        if(trips =='') {
            tripsTag.innerHTML = '<h2>No saved trips available.</h2>';

            return
        }

        for (const [i, value] of trips.entries()) {
        //for (let trip of trips) {
            //console.log(trip);

            console.log('%d: %s', i, value);

            const htmlTextToAdd =  
            `
            <div class="saved-trip"  style="background-image: linear-gradient(0deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.5) 100%),url(${value.imageUrl})">
                <div class="country">${value.destinationCountry}</div>
                <h3>${value.destination}</h3>
                <div class="departure">Departing on ${value.departure}</div>
                <a href="" trip-index="${i}"></a>
            </div>
            `;
            tripsTag.insertAdjacentHTML('afterbegin', htmlTextToAdd);

        }



    } catch(error){ 
        console.log('error', error);
    }
    

}


const showCurrentTrip = async () => {
    //console.log('painting current trip')
    const req = await fetch('http://localhost:8081/getCurrent');
    bodyTag.setAttribute('class', 'current-view');
    try{
        const allData = await req.json();
        console.log ('showCurrentTrip:');
        console.log(allData);

        let weatherClass = '';

        // sometimes min and max temp. are empty
        if(allData.maxTemp && allData.minTemp){
            weatherClass = 'show-forecast'
        } else {
            weatherClass = 'show-current' 
        }

        let tripButton = '';
        if(allData.idTrip){
            tripButton = `<a href="#" class="delete-trip" trip-index="${allData.idTrip}">delete trip</a>`;
        
        } else {
            tripButton = `<a href="#" class="save-trip">save trip</a>`;


        }


        currentTag.innerHTML  =
        `
        <div class="destination-wrapper">
            
            <div class="country">${allData.destinationCountry}</div>
            <h3>${allData.destination}</h3>
            <div class="departure">Departing on ${allData.departure}</div>
        </div>
        <div class="buttons-wrapper">${tripButton}</div>
        <div class="trip-info-wrapper">
            <div class="days-remaining-wrapper">
            <div class="icon"></div>
            <div class="days-remaining">${allData.daysRemaining}</div>
            <div class="legend">days remaining</div>
            </div>
            <div class="coordinates-wrapper">
            <div class="icon"></div>
            <div class="coordinates">
                <div>lat:${allData.lat} </div>
                <div>lng:${allData.lng} </div>
            </div>
            <div class="legend">coordinates</div>
            </div>

            <div class="weather-wrapper ${weatherClass}">
                <div class="weather-icon icon-${allData.icon}"></div>
                <div class="temp-wrapper">
                <span class="temp">${allData.temp}</span>
                <span class="min-temp">${allData.minTemp}</span>
                <span class="max-temp">${allData.maxTemp}</span>
                </div>
                <div class="weather-description">${allData.description}</div>
            </div>
        </div>
        <div class="destination-image" style="background-image:linear-gradient(0deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.5) 100%),url(${allData.imageUrl})"></div>

        `;


        if(allData.idTrip){
        
            const deleteTrip = document.querySelector('.delete-trip');
            deleteTrip.addEventListener('click', (event) =>{
                event.preventDefault();
                bodyTag.setAttribute('class', 'trips-view');

                let trip = event.target.getAttribute("trip-index");
                console.log( `el idTrip es ${trip}`)
                
                Client.deleteCurrentTrip(`http://localhost:8081/delete/trip/${trip}`)
                .then(
                    (savedData)=>{
                        Client.showSavedTrips()
                    }
                
                )

            })
        
        
        } else {

            const saveTrip = document.querySelector('.save-trip');
            saveTrip.addEventListener('click', (event) =>{
                event.preventDefault();
                bodyTag.setAttribute('class', 'trips-view');
                Client.saveCurrentTrip('http://localhost:8081/save')
                .then(
                    (savedData)=>{
                        Client.showSavedTrips()
                    }
                
                )
            })


        }


    } catch(error){ 
        console.log('error', error);
    }
    

}


const copyOneTrip = async (url='', id='') =>{ 
    const request = await fetch(url);
    try {
    // Transform into JSON
    const allData = await request.json()
    }
    catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
  };


const saveCurrentTrip = async (url='') =>{ 
    const request = await fetch(url);
    try {
    // Transform into JSON
    const allData = await request.json()
    //console.log('resposta desde saveCurrentTrip');
    //console.log(allData);

    }
    catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
  };

  const deleteCurrentTrip = async (url='') =>{ 
    const request = await fetch(url);
    try {
    // Transform into JSON
    const allData = await request.json()
    //console.log('resposta desde deleteCurrentTrip');
    //console.log(allData);

    }
    catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
  };

export {showCurrentTrip,
    cleanForm,
    saveCurrentTrip,
    showSavedTrips,
    copyOneTrip,
    deleteCurrentTrip,
    showStatus}
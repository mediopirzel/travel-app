const bodyTag = document.querySelector('body');
const currentTag = document.querySelector('.current-trip');
const tripsTag  = document.querySelector('.my-trips');  

const menuSearch =  document.querySelector('.menu-search');
const menuMyTrips =  document.querySelector('.menu-my-trips');



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

        Client.saveCurrentTrip(`http://localhost:8081/copyTrip/trip/${trip}`)
        .then(
            (savedData)=>{
                console.log('savedData')
                console.log(savedData);
            }
        
        )
    }
});



const cleanForm = ()=> {
    document.getElementById('destination-field').value = '';
    document.getElementById('date-field').value = '2020-05-29';
}


const showSavedTrips = async () => {
    //console.log('painting all trips')
    const req = await fetch('http://localhost:8081/getTrips');
    bodyTag.setAttribute('class', 'trips-view');
    try{
        const trips = await req.json();
        
        tripsTag.innerHTML = '';



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
        //console.log ('ok, all date recived');
        //console.log(allData);

        let weatherClass = '';

        if(allData.maxTemp && allData.minTemp){
            weatherClass = 'show-forecast'
        } else {
            weatherClass = 'show-current' 
        }


        currentTag.innerHTML  =
        `
        <div class="destination-wrapper">
            
            <div class="country">${allData.destinationCountry}</div>
            <h3>${allData.destination}</h3>
            <div class="departure">Departing on ${allData.departure}</div>
        </div>
        <div class="buttons-wrapper">
            <a href="#" class="save-trip">save trip</a>
        </div>
        <div class="trip-info-wrapper">
            <div class="days-remaining-wrapper">
            <div class="days-remaining">${allData.daysRemaining}</div>
            <span>days remaining</span>
            </div>
            <div class="coordinates-wrapper">
            <div class="coordinates">
                <span>lat:${allData.lat} </span>
                <span>lng:${allData.lng} </span>
            </div>
            <span>coordinates</span>
            </div>

            <div class="weather-wrapper ${weatherClass}">
                <div class="weather-icon icon-${allData.icon}">icon</div>
                <div class="temp-wrapper>
                <span class="temp">${allData.temp}</span>
                <span class="min-temp">${allData.minTemp}</span>
                <span class="max-temp">${allData.maxTemp}</span>
                </div>
                <div class="weather-description">${allData.description}</div>
            </div>
        </div>
        <div class="destination-image" style="background-image:linear-gradient(0deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.5) 100%),url(${allData.imageUrl})"></div>

        `;

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
    }
    catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
  };

export {showCurrentTrip,cleanForm,saveCurrentTrip,showSavedTrips,copyOneTrip}
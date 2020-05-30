// Get Data from API
const geoNamesURL = `http://api.geonames.org/searchJSON?maxRows=10&username=${process.env.GEONAMES_USERNAME}&q=`;
const weatherbitCurrentURL = `https://api.weatherbit.io/v2.0/current?key=${process.env.WEATHERBIT_API_KEY}`
const weatherbitForecastURL = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHERBIT_API_KEY}`
const pixabayURL = `https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&image_type=photo&orientation=horizontal&per_page=3&q=`;


async function geoNamesAPI (destination= '') {
    let url = geoNamesURL + destination;
    const req = await fetch(url)
    try{
        const recived = req.json();
        console.log(`getting lat and lon coordinates from geonames`)
        console.log(recived);
        return(recived)
        

    } catch(error){
        Client.showStatus('We can\'t find your destination')
        //console.log('error', error);
    }
}

async function weatherbitAPI (type='', lat='', lon='', days='') {

    let url =''
    if(type=='forecast'){
        url = `${weatherbitForecastURL}&lat=${lat}&lon=${lon}&days=${days}`;
    } else {
        url = `${weatherbitCurrentURL}&lat=${lat}&lon=${lon}`;
        
    }

    const req = await fetch(url)
    try{
        const recived = req.json();
        console.log(`getting weather forecast from weatherbit`)
        //console.log(recived);
        return(recived);

    } catch(error){
        //console.log('error', error);
    }
}

//TODO COUNTRY DESTINATION
async function pixabayAPI (destination= '', country= '' ) {
    let url = pixabayURL + destination;

    const req = await fetch(url)
    try{
        const recived = req.json();
        console.log(`getting images from pixabay`)
        //console.log(recived);
        return(recived);

    } catch(error){
        //console.log('error', error);
        
    }
}

export {
    pixabayAPI,
    geoNamesAPI,
    weatherbitAPI
}
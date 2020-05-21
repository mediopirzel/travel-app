// Get Data from API
const tempURLgeoNames = 'http://api.geonames.org/searchJSON?maxRows=10&username=xaviersoler&q=';
const tempURLweatherbitCurrent = 'https://api.weatherbit.io/v2.0/current?key=d58226ff5a814dfe9b64a24e0dac1fe1'
const tempURLweatherbitForecast = 'https://api.weatherbit.io/v2.0/forecast/daily?key=d58226ff5a814dfe9b64a24e0dac1fe1'
const tempURLpixabay = 'https://pixabay.com/api/?key=1160014-f74a9dea679f553345e2af90f&image_type=photo&category=places&orientation=horizontal&per_page=3&q=';


async function geoNamesAPI (destination= '') {
    let url = tempURLgeoNames + destination;
    const req = await fetch(url)
    try{
        const recived = req.json();
        console.log(`geonames for ${ destination }`)
        console.log(recived);
        return(recived)
        

    } catch(error){
        console.log('error', error);
    }
}

async function weatherbitAPI (type='', lat='', lon='', days='') {
    if(type=='forecast'){
        let url = `${tempURLweatherbitForecast}&lat=${lat}&lon=${lon}&days=${days}`;
    } else {
        let url = `${tempURLweatherbitCurrent}&lat=${lat}&lon=${lon}`;
    }
    

    const req = await fetch(url)
    try{
        const recived = req.json();
        console.log(`weatherbitAPI for ${lat} & ${lon}`);
        console.log(recived);
        return(recived);

    } catch(error){
        console.log('error', error);
    }
}

async function pixabayAPI (destination= '' ) {
    let url = tempURLpixabay + destination;

    const req = await fetch(url)
    try{
        const recived = req.json();
        console.log(`pixabay for ${ destination }`)
        console.log(recived);
        return(recived);

    } catch(error){
        console.log('error', error);
    }
}

export {
    pixabayAPI,
    geoNamesAPI,
    weatherbitAPI
}
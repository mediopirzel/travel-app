// Get Data from API
const tempURLgeoNames = 'http://api.geonames.org/searchJSON?maxRows=10&username=xaviersoler&q=';
const tempURLweatherbit = 'https://api.weatherbit.io/v2.0/current?key=d58226ff5a814dfe9b64a24e0dac1fe1&lat=38.123&lon=-78.543'
const tempURLpixabay = 'https://pixabay.com/api/?key=1160014-f74a9dea679f553345e2af90f&q=barcelona&image_type=photo&category=places&orientation=horizontal&per_page=3';


async function geoNamesAPI (destination= '') {
    const url = tempURLgeoNames + destination;


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

async function weatherbitAPI (url= tempURLweatherbit) {
    const req = await fetch(url)
    try{
        const recived = req.json();
        console.log(recived);
        return(recived);

    } catch(error){
        console.log('error', error);
    }
}

async function pixabayAPI (url= tempURLpixabay ) {
    const req = await fetch(url)
    try{
        const recived = req.json();
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
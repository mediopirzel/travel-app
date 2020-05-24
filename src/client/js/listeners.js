const mainButton = document.getElementById('generate');


mainButton.addEventListener('click', (event) =>{
    event.preventDefault();
    //encode destination name for url
    const destination = encodeURIComponent(document.getElementById('destination-field').value);
    const departure = document.getElementById('date-field').value;
 
    //console.log(destination);

    const verifyedDate = Client.checkDate(departure);

        if(!verifyedDate){
            console.log('date is not correct');
            return

        } 

        //save country destination if there are no pictures for destination
        let destinationCountry = '';

        //Post Dates to current trip object
        Client.postData('http://localhost:8081/addData', {
            daysRemaining: verifyedDate.daysRemaining, 
            departure: verifyedDate.departure 
        })

        //Call Geonames API for getting lat and long
        Client.geoNamesAPI(destination)
        .then(
            (geonameData) =>{ 
                const myData = geonameData.geonames[0];
    
                if(myData){
                    //for pixabay if there is no destination picture
                    destinationCountry = myData.countryName
                    //save to  endpoint current Trip
                    Client.postData('http://localhost:8081/addData', {
                        destinationCountry: destinationCountry, 
                        destination: myData.toponymName, 
                        lat: myData.lat, 
                        lng: myData.lng});
                    return myData;
    
                } else {
                    console.log('error on geonames');
                }
    
            }
    
        ).then(
            (geonameData) =>{
                //If departure day is between 7 and 16 days, show forecast weather for departure date (project restriction).
                //If it is more than 16 days, show forecast weather for 17th day (weatherbit restriction).
                
                if(verifyedDate.daysRemaining >= 7){
                    return Client.weatherbitAPI('forecast', geonameData.lat, geonameData.lng, verifyedDate.daysRemaining);
                //If departure date is between 0 and 7 days show current weather
                } else {
                    return Client.weatherbitAPI('current', geonameData.lat, geonameData.lng);
                }

            }

   
        ).then(
            (weatherData) =>{
                    //current weather or forecast is always last element of data array.
                    const myWeather = weatherData.data.slice(-1)[0];
                    Client.postData('http://localhost:8081/addData', {
                        temp: myWeather.app_temp, 
                        maxTemp: myWeather.app_max_temp, 
                        minTemp: myWeather.app_min_temp, 
                        icon: myWeather.weather.icon,
                        description: myWeather.weather.description
                    });

            }
        ).then(
            () =>{
                return Client.pixabayAPI(destination, encodeURIComponent(destinationCountry))
            }

        ).then(
            (pixabayData)=>{
                const myPixabay = pixabayData.hits[0];
                if(myPixabay){
                    return Client.postData('http://localhost:8081/addData', { imageUrl : myPixabay.largeImageURL});
                }

            }
        ).then(
            (cuenca)=>{
                Client.showCurrentTrip()
            }
        )


})




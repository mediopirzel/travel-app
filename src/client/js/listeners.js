const mainButton = document.getElementById('generate');
mainButton.addEventListener('click', (e) =>{
    //encode destination name for url
    const destination = encodeURIComponent(document.getElementById('destination-field').value);
    const departure = document.getElementById('date-field').value;
    //console.log(destination);

    const verifyedDate = Client.checkDate(departure);

    if(verifyedDate){
        Client.geoNamesAPI(destination)
        .then(
            (geonameData) =>{ 
                //console.log(data.geonames[0]);
                const myData = geonameData.geonames[0];
    
                if(myData){
                    //save to temp endpoint
                    Client.postData('http://localhost:8081/addData', {countryName: myData.countryName, name: myData.name, lat: myData.lat, lng: myData.lng});
                    return myData;
    
                } else {
                    console.log('error on geonames');
                }
    
            }
    
        ).then(
            (geonameData) =>{
                console.log('verified day is:');
                console.log(verifyedDate);
                if(verifyedDate.daysRemaining >= 7){
                    console.log('es mes de 7')
                    Client.weatherbitAPI('forecast',geonameData.lat,geonameData.lng, verifyedDate.departure );
                } else {
                    console.log('es menys de 7')
                    Client.weatherbitAPI('current',geonameData.lat,geonameData.lng );
                }

                
            }
        )



    } else {
        console.log('date is not correct');
    }

/*
    
    .then(
        (geonameData) =>{ 
            //console.log(data.geonames[0]);
            const myData = geonameData.geonames[0];

            if(myData){
                //save to temp endpoint
                Client.postData('http://localhost:8081/addData', {countryName: myData.countryName, name: myData.name, lat: myData.lat, lng: myData.lng});

                Client.weatherbitAPI(myData.lat,myData.lng);
                return myData;

            } else {
                console.log('error on geonames');
            }

        }

    ).then(
        (data)=>{
            console.log('escup la data segon then')
            console.log(`${data.lat} & ${data.lng}`);
            //Client.weatherbitAPI(lat,lng)
        }

    )



        
    Client.pixabayAPI(destination)

    .then(
        (data) =>{ 
            
            const myData = data.hits[0];
            if(myData){          
                //save to temp endpoint
                Client.postData('http://localhost:8081/addData', {largeImageURL: myData.largeImageURL});
                //Client;  

            } else {
                console.log('error on pixabay');
            }

        }
    )
            
*/

    //Client.weatherbitAPI();
   // Client.pixabayAPI();

})




const mainButton = document.getElementById('generate');



mainButton.addEventListener('click', (e) =>{
    const destination = encodeURIComponent(document.getElementById('destination-field').value);
    console.log(destination);
    //Client.testFunction(event);
    Client.geoNamesAPI(destination)
    .then(
        (data) =>{ 
            //posting data recived to endpoint
            //console.log(data.geonames[0]);
            const myData = data.geonames[0];

            if(myData){
                console.log('hay data');
                console.log(myData.lng);
                console.log(myData.lat);
                console.log(myData.name);
                console.log(myData.countryName);
                Client.postData('http://localhost:8081/addData', {countryName: myData.countryName, name: myData.name, lat: myData.lat, lng: myData.lng});

            } else {
                console.log('error on geonames');
            }

            }
    )


    //Client.weatherbitAPI();
   // Client.pixabayAPI();

})




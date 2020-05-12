const postData = async (url = '', data = {})=> {
    console.log(`I'm the client: `)
    console.log(data);
    myObject = {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
   }

    const response = await fetch(url, myObject)
      try {
          const newData = await response.json();
          console.log(`Inside Try`)
          console.log(newData);
          //return newData;
      } catch(error){
          console.log('error', error);
      }

};


postData('/addData', {temp:'004', feel:'ok', date: 'my date'});

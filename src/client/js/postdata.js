//POST DATA 

async function postData (url='', data = {}) {
    console.log('begininig postData');
    console.log(data)
    const res = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header        
      });
    try{
        const newData = await res.json();
        console.log (`Ì'm the postData function on try step:`);
        console.log(newData);
        return newData;

    } catch(error) {
        console.log('error pum', error);
    }
}


export {postData}
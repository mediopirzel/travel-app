import moment from 'moment';
const todayDate = moment().startOf('day');

function checkDate (date) {
    //console.log(date);

    //let validDate = moment(date, "YYYY-MM-DD", true).isValid();
    let validDate = moment(date, "YYYY-MM-DD").isValid();
    if(!validDate){
        return false;
    }

    const departure = moment(date);

    let daysRemaining = departure.diff(todayDate, 'days');
    //console.log(daysRemaining);
    if(daysRemaining >= 0) {
        const dataDays = {
                'departure' :  moment(departure).format('dddd, MMMM Do YYYY'),
                'daysRemaining' : daysRemaining
        }
        //console.log(dataDays);
        return dataDays;
        
    } else {
        return false; 
    }

    
}

export {
    checkDate
}
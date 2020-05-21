import moment from 'moment';
const todayDate = moment();

function checkDate (date) {
    //console.log(date);

    let validDate = moment(date, "YYYY-MM-DD", true).isValid();

    if(validDate){
        const departure = moment(date);

        let daysRemaining = departure.diff(todayDate, 'days');
        console.log(daysRemaining);
        if(daysRemaining >= 0) {
            const dataDays = {
                    'departure' :  moment(departure).format('YYYY-MM-DD'),
                    'daysRemaining' : daysRemaining
            }
            //console.log(dataDays);
            return dataDays;
            
        } else {
            return false; 
        }

    } else {
        return false;
    }

    
}

export {
    checkDate
}
import moment from 'moment'


export function dateFormatter(date){
    let now = moment().hours(23)
    let dateToFormat= moment(date)


    let result = now.diff(dateToFormat,'hour')

    if(result <24){
         return dateToFormat.format('LT')
    }else if(result >=24&& result <48){
        return dateToFormat.calendar().slice(0,9)
    }else if(result>=48  && result < 168){
        return dateToFormat.format('dddd')
    }else{
        return dateToFormat.format('l')
    }
    
}
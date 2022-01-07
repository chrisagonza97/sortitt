import moment from 'moment'
moment().format()
const Time ={
    utcToDate(utc) {
       const date = new Date(utc*1000).toLocaleDateString('en-US')
       //console.log(date)
       return date
    },
    utcToAgo(utc){
        const ago = moment.unix(utc).fromNow();
        return ago
    }
    
}

export default Time;
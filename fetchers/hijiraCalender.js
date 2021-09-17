var fetch =  require("node-fetch");

function hijiraCalender() {
let date = new Date();
let year = date.getFullYear()
let day = date.getDate()
let month = date.getMonth()

if(day <= 9) {
  day.toString()
  day = '0'+day+''
}
if(month <= 9) {
  month++
  month.toString()
  month = '0'+month+''
}

var link = `http://api.aladhan.com/v1/gToH?date=${day}-${month}-${year}`

    return fetch(link).then(res => res.json()).then(data => {
        let hijri = `Date: ${data.data.hijri.date}
Today: ${data.data.hijri.weekday.en}        
Month: ${data.data.hijri.month.en}`
        return hijri
}
    )}

module.exports = {hijiraCalender}
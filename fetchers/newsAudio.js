const fs = require('fs');
const request = require('request')

  // new Date object
  let date = new Date();
  let year = date.getFullYear()
  let day =  date.getDate()
  let month = date.getMonth()
  let hour = date.getHours()
  if(day <= 9) {
    day.toString()
    day = '0'+day+''
  }
  if(month <= 9) {
    month++
    month.toString()
    month = '0'+month+''
  }
  
  var linkHatsi = `https://av.voanews.com/clips/VHA/${year}/${month}/${day}/${year}${month}${day}-203000-VHA066-program_48k.mp3`
  var linkSafe = `https://av.voanews.com/clips/VHA/${year}/${month}/${day}/${year}${month}${day}-050000-VHA066-program_48k.mp3`

function newsAudio(link, time) {

 
request
  .get(link)
  .on('error', function(err) {
    console.log(err)
  })
  .pipe(fs.createWriteStream(`./news/voa${time}.mp3`));

console.log(linkHatsi)
 console.log(linkSafe)
}

//newsAudio()
setInterval(() => {
   if (hour == 6) newsAudio(linkSafe,'Safe')
   if (hour == 21) newsAudio(linkHatsi,'Hantsi')
}, 3600000);

module.exports = {newsAudio}
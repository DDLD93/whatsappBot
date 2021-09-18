var fetch =  require("node-fetch");
const fs = require('fs');
const request = require('request')

function fetchVOA(link) {
  request
  .get(link)
  .on('error', function(err) {
    console.log(err)
  })
  .pipe(fs.createWriteStream(`./news/voa.mp3`));
}

function newsAudio() {
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
 console.log(linkHatsi)
 console.log(linkSafe)
if (hour > 6 && hour < 21) {
  fetchVOA(linkSafe)
}else{
  fetchVOA(linkHatsi)
}
}
//newsAudio()
setInterval(() => {
  newsAudio()
}, 1000 * 60 * 360);

module.exports = {newsAudio}
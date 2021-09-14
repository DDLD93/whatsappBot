var fetch =  require("node-fetch");
const fs = require('fs');
const request = require('request')

function newsAudio() {
  // new Date object
let date = new Date();
let year = date.getFullYear()
let day = 9
let month = date.getMonth()
let hour = date.getHours()
if(day <= 9) day = '0'+day

console.log(day)

  request
  .get(`https://av.voanews.com/clips/VHA/${year}/${month++}/${day}${year}${month++}${day}-203000-VHA066-program_48k.mp3`)
  .on('error', function(err) {
    // handle error
  })
  .pipe(fs.createWriteStream(`../news/${year}-${month++}-${day}.mp3`));
}


newsAudio()
module.exports = {newsAudio}
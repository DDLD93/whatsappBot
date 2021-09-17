var fetch =  require("node-fetch");
const fs = require('fs');
const request = require('request')

function newsAudio() {
  // new Date object
let date = new Date();
let year = date.getFullYear()
let day = date.getDate()
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
var link = `https://av.voanews.com/clips/VHA/${year}/${month}/${day}/${year}${month}${day}-050000-VHA066-program_48k.mp3`
var linkG = 'https://av.voanews.com/clips/VHA/2021/09/13/20210913-203000-VHA066-program_48k.mp3'
console.log(link)
console.log(linkG)


  request
  .get(link)
  .on('error', function(err) {
    console.log(err)
  })
  .pipe(fs.createWriteStream(`./news/voa.mp3`));
}

module.exports = {newsAudio}
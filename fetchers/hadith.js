var fetch =  require("node-fetch");



 function randomHadith() {
   //daily hadiths
return fetch("https://api.sunnah.com/v1/hadiths/random", {
    method: 'GET',
    headers: {
        'X-API-KEY': 'SqD712P3E82xnwOAEOkGd5JZH8s9wRR24TqNFzjk',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
}}).then(res => res.json())
.then(data => {
   return hadith = data.hadith[0].body;
   
}
   
).catch(err => console.log(err)) 
}

module.exports = {randomHadith}
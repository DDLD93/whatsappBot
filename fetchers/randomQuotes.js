var fetch =  require("node-fetch");


function randomQuotes() {
    return fetch("https://api.quotable.io/random")
    .then(res => res.json())
     .then(data => `${data.content}

Author: ${data.author}`)   

}
module.exports = {randomQuotes}
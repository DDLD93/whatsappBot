var fetch =  require("node-fetch");

function AllahNames(params) {
    let number = params.toString()
    return fetch(` http://api.aladhan.com/asmaAlHusna/${number}`)
    .then(res => res.json())
    .then(data => {
        if(!data) {
            return 'There seems to be an Error unable to fullfil your request '
        }else{

            let msg=`Name: ${data.data[0].transliteration}  (${data.data[0].name})
Meaning: ${data.data[0].en.meaning}`
            return msg
        }
    })
}

module.exports = {AllahNames}
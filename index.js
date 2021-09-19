const {randomHadith} = require('./fetchers/hadith');
const {randomQuotes} = require('./fetchers/randomQuotes');
const {newsAudio} = require('./fetchers/newsAudio')
const {hijiraCalender} = require('./fetchers/hijiraCalender')
const {AllahNames} = require('./fetchers/namesALLAH')
var fetch =  require("node-fetch");
const qrcode = require('qrcode-terminal');
var http = require('http');

const fs = require('fs');
const {Client, MessageMedia} = require('whatsapp-web.js');


const SESSION_FILE_PATH = './session.json';
// Load the session data if it has been previously saved
let sessionData;
if(fs.existsSync(SESSION_FILE_PATH)) {
    sessionData = require(SESSION_FILE_PATH);
    console.log('file session found')
}

//Use the saved values
const client = new Client({
    session: sessionData
});

const menu = `Reply with an Emoji
👊. Random Quotes in English
😍. Random Hadith
💃. Listen to morning news Hausa
😛. Listen to evening news Hausa
😎. Get Todays date Hijra Calender
😇. Names of Allah`

var nameOfALLAH = false

client.on('message',message => {
    let msg = message.body;
    
if(isNaN(msg)) {
    console.log('am a number')
    switch (msg) {
        // Exit
        case 'Exit' || 'exit' || 'EXIT':
            message.reply('You have exited from this service')
            message.reply(`Remember you can always get back on by Typing the keyword "MENU"`)
            message.reply(menu)
            break;
        // Random English quote    
        case '👊':
            randomQuotes().then(msg => message.reply(msg))    
            break;
        // Random Hadith generator    
        case '😍':
            randomHadith().then(hadith => message.reply(hadith)) 
            break;
        // Hausa news audio Shirin safe  
        case '💃':
            let media1 = MessageMedia.fromFilePath('./news/voaSafe.mp3');
            message.reply('Fetching news from Voice of America.... Please wait...')
            return	message.reply(media1)
            break;   
        // Hausa news audion shirin Hantsi     
        case '😛':
            let media2 = MessageMedia.fromFilePath('./news/voaHantsi.mp3');
            message.reply('Fetching news from Voice of America.... Please wait...')
            return	message.reply(media2)
            break
        // Hijara calender    
        case "😎":
            return hijiraCalender().then(msg =>{
                    message.reply(msg)})
            break
        // Names of Allah    
        case '😇':
            return message.reply('Enter a number between 1 - 99')
            break
        case 'list' ||'List' || 'LIST':
            message.reply(menu)
            break
        case 'List':
            message.reply(menu)
            break
        case 'LIST':
            message.reply(menu)
            break                       
        default:
           
            break;
    }
}else{
    if (msg > 99 || msg < 1) {
       return message.reply('Enter a number between 1 - 99')
    }
    AllahNames(msg).then(res => message.reply(res))
}

})
client.on('ready', () => {
    console.log('Client is ready!');
});
console.log(menu)
client.initialize();
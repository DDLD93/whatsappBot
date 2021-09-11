const qrcode = require('qrcode-terminal');



const fs = require('fs');
const {Client} = require('whatsapp-web.js');


// Path where the session data will be stored
const SESSION_FILE_PATH = './session.json';

// Load the session data if it has been previously saved
let sessionData;
if(fs.existsSync(SESSION_FILE_PATH)) {
    sessionData = require(SESSION_FILE_PATH);
    console.log('file session found')
}

// Use the saved values
const client = new Client({
    session: sessionData
});
// client.on('qr', qr => {
//     qrcode.generate(qr, {small: true});
// });
client.on('ready', () => {
    console.log('Client is ready!');
});
//Save session values to the file upon successful auth
// client.on('authenticated', (session) => {
//     sessionData = session;
//     fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
//         if (err) {
//             console.error(err);
//         }else{
//             console.log('authenticated')
//         }
//     });
// });

const menu = [
['Featured'],
['Religion',
    ['islam',
        ['Hijira Calender',()=>console.log('hijira calender')],
        ['Hadith of the day',()=>console.log('hijira calender')],
        ['The Holy Quran', () => console.log('Holy Quran')]
    ]
],
['News',
    ['Hausa',()=>console.log('hijira calender')],
    ['English',()=>console.log('hijira calender')]
],    
    
['Currency',()=>console.log('hijira calender')],
['Daily Quotes',
    ['Hausa',()=>console.log('hijira calender')],
    ['English',()=>console.log('hijira calender')]
],    
['Suggestion'],
['About']
]

// client.on('qr', qr => {
//     qrcode.generate(qr, {small: true});
// });

const paths = {
//main menu    
    root:`Welcome to DDLD WhatsApp service
Please select any of the options 1 - 7    
1.${menu[0][0]}
2.${menu[1][0]}
3.${menu[2][0]}
4.${menu[3][0]}
5.${menu[4][0]}
6.${menu[5][0]}
7.${menu[6][0]}`,

    Featured: `Featured:
1.${menu[4][2][0]} - Daily Quotes
2.${menu[1][1][2][0]}
3.${menu[1][1][3][0]}
4.${menu[4][1][0]} - Daily Quotes`,
// option 2 is selected from the main menu
    Religion: 
`Religion:
1.${menu[1][1][0]}`,
    //option 1  is selected in 
        islam: `Islam:
1.${menu[1][1][1][0]}
2.${menu[1][1][2][0]}
3.${menu[1][1][3][0]}`,
                    
    
    news: `News Laguage:
1.${menu[2][1][0]}
2.${menu[2][2][0]}`     ,
        english: `1.${menu[0][0]}`,
        hausa: `2.${menu[0][0]}`,

currency: `Getting FX Rates NGN/*......`,

    dailyQuotes: `Daily Quotes Language:
1.${menu[4][1][0]}
2.${menu[4][2][0]}`,

    suggestion: `How do you think this services can be improve, 
What would you want see added or removed`,

    About:
`Author: Umar Adamu
Phone: +2347055793353
Socials: https://twiiter.com/0mar_jay`
}
// console.log(paths.Featured)
var pathFinder = 'root'
client.on('message', message => {
    //Pathing
    if(pathFinder == 'root') {
        switch(Number(message.body)) {
            case 1:
                pathFinder= 'Featured'
                return	message.reply(paths.Featured)
              break;
            case 2:
                pathFinder= 'Religion'
                return	message.reply(paths.Religion)
              break;
            case 3:
                pathFinder= 'News'
                return	message.reply(paths.news)
               break;
            case 4:
                return	message.reply(paths.currency)
               break;       
            case 5:
                pathFinder= 'DailyQuotes'
                return	message.reply(paths.dailyQuotes)
               break; 
            case 6:
                return	message.reply(paths.suggestion)
               break;
            case 7:
                return	message.reply(paths.About)
               break;           
            default:
                pathFinder= 'root'
                return	message.reply(paths.root)
          }
        }else if(pathFinder== 'Featured') {
            switch(Number(message.body)) {
                case 1:
                    return	message.reply('Fetching today quotes')
                  break;
                case 2:
                    return	message.reply('Fetching Hadith of Day')
                  break;
                case 3:
                    return	message.reply('Launching Pocket Quran')
                   break;
                case 4:
                    return	message.reply('Fetching today quotes- Hausa')
                   break;          
                default:
                    pathFinder= 'root'
                    return	message.reply(paths.root)
              }
        }else if(pathFinder == 'Religion') {
            switch(Number(message.body)) {
                case 1:
                    pathFinder= 'Islam'
                    return	message.reply(paths.islam)
                  break;
                case 2:
                    return	message.reply(paths.Religion)
                  break;       
                default:
                    pathFinder= 'root'
                    return	message.reply(paths.root)
              }    
        }else if(pathFinder == 'Islam') {
            switch(Number(message.body)) {
                case 1:
                    return	message.reply('Hijira Calender')
                  break;
                case 2:
                    return	message.reply('Fetching Hadith of Day')
                  break;  
                case 3:
                    return	message.reply('Launching Pocket Quran')
                  break;          
                default:
                    pathFinder= 'root'
                    return	message.reply(paths.root)
              }  
        }else if(pathFinder == 'News') {
            switch(Number(message.body)) {
                case 1:
                    return	message.reply('Getting data from BBC hausa')
                  break;
                case 2:
                    return	message.reply('Getting data from BBC English')
                  break;       
                default:
                    pathFinder= 'root'
                    return	message.reply(paths.root)
              }    
        }else if(pathFinder == 'DailyQuotes') {
            switch(Number(message.body)) {
                case 1:
                    return	message.reply("Daily Quotes Hausa")
                  break;
                case 2:
                    return	message.reply("Daily Quotes English")
                  break;       
                default:
                    pathFinder= 'root'
                    return	message.reply(paths.root)
              }    
        }
        
});
// client.on('authenticated', (session) => {
//     fs.writeFile('./session.json', session, 'utf8', function (err) {
//         if (err) {
//             return console.log(err);
//         }
    
//         console.log("The file was saved!");
//     }); 
//     // console.log(session)
//     // Save the session object however you prefer.
//     // Convert it to json, save it to a file, store it in a database...
// });


client.initialize();
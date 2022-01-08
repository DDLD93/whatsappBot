const quran = require('quran')
function AlQuran() {
    quran.get(1,function(err,verses) {
        if (!err) {
          console.log('Chapter 1: ' + verses.join(' ** '));
        }
      });
}
AlQuran()
module.exports = {AlQuran}
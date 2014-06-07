var fs = require("fs"),
    request = require('request'),
    cheerio = require('cheerio'),
    moment = require('moment');

var matches = {
  age: moment().add(1, 'hour'),
  data: require('../datasets/world-cup.json')
};

var getMatches = function (callback) {
  var isAfter = moment().isAfter(matches.age); // Has it been 1 hour since last "scrape" ?
  if (!isAfter) {
    matches.age = moment().add(1, 'hour');
    // Update dataset
    request('http://es.fifa.com/worldcup/matches/', function (error, response, body) {
      var newMatches = [];
      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(body);
        $('div.mu.fixture').each(function(i,e) {
          try {
            $(e).find('.mu-i-datetime').find('span').remove(); // Remove "Hora Local"
            var m = {
                date: moment($(e).find('.mu-i-datetime').text().trim(), 'DD MMM. AAAA - HH:mm').format(), // This date is parsed with the server Timezone, so be careful
                group:$(e).find('div.mu-i-group').text(),
                matchnum: $(e).find('div.mu-i-matchnum').text(),
                stadium: $(e).find('div.mu-i-stadium').text(),
                venue:$(e).find('div.mu-i-venue').text(),
                home: $(e).find('div.t.home span.t-nText').text(),
                homeflag: $(e).find('div.t.home img').attr('src'),
                away: $(e).find('div.t.away span.t-nText').text(),
                awayflag: $(e).find('div.t.away img').attr('src'),
            };
            newMatches.push(m);
          } catch(err) {
            callback(new Error(), undefined);
          }
        });

        // Save to filesystem for future uses
        fs.writeFile(__dirname + '/../datasets/world-cup.json', JSON.stringify(newMatches, null, 2), function (err, data) {
          callback(null, newMatches);
        });

      } else {
        callback(new Error(), undefined);
      }
    });
  } else {
   callback(null, matches.data);
  }
};

module.exports = getMatches;
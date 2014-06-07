var fs = require("fs"),
    request = require('request'),
    cheerio = require('cheerio'),
    moment = require('moment');

var matches = {
  age: moment().add(1, 'hour'),
  data: require('../datasets/world-cup.json') || []
};

var getMatches = function (callback) {
  var isAfter = moment().isAfter(matches.age); // Has it been 1 hour since last "scrape" ?
  if (isAfter) {
    matches.age = moment().add(1, 'hour');
    // Update dataset
    request('http://es.fifa.com/worldcup/matches/', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(body);
        $('div.mu.fixture').each(function(i,e) {
          try {
            var m = {
                day: $(e).find('div.mu-i-date').html(),
                timeUTC: $(e).find('.s-date-HHmm').data('timeutc'),
                timeUNIX: moment($(e).find('.mu-i-datetime'), 'DD MMM. AAAA - HH:mm').format('X'),
                group:$(e).find('div.mu-i-group').html(),
                matchnum: $(e).find('div.mu-i-matchnum').html(),
                stadium: $(e).find('div.mu-i-stadium').html(),
                venue:$(e).find('div.mu-i-venue').html(),
                home: $(e).find('div.t.home span.t-nText').html(),
                homeflag: $(e).find('div.t.home img').attr('src'),
                away: $(e).find('div.t.away span.t-nText').html(),
                awayflag: $(e).find('div.t.away img').attr('src'),
            };
            matches.data.push(m);
          } catch(err) {
            callback(err, matches.data);
          }
        });

        // Save to filesystem for future uses
        fs.writeFile(__dirname + '/../datasets/world-cup.json', JSON.stringify(matches.data, null, 2), function (err, data) {
          callback(null, matches.data);
        });

      } else {
        callback(new Error('Error requesting data'), matches.data);
      }
    });
  } else {
   callback(null, matches.data);
  }
};

module.exports = getMatches;
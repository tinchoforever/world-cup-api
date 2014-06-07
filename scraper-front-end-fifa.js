// This script will scrape all matches from
// http://www.fifa.com/worldcup/matches/ 

var matches = [];
$('div.mu.fixture').each(function(i,e) { 
	try {
		var m = {
		    day: $(e).find('div.mu-i-date').html(),
		    timeUTC: $(e).find('.s-date-HHmm').data('timeutc'),
		    group:$(e).find('div.mu-i-group').html(),
		    matchnum: $(e).find('div.mu-i-matchnum').html(),
		    stadium: $(e).find('div.mu-i-stadium').html(),
		    venue:$(e).find('div.mu-i-venue').html(),
		    home: $(e).find('div.t.home span.t-nText').html(),
		    homeflag: $(e).find('div.t.home img').attr('src'),
		    away: $(e).find('div.t.away span.t-nText').html(),
		    awayflag: $(e).find('div.t.away img').attr('src'),
		};

		matches.push(m);
	}
	catch(e){
		console.log(e);
	}

});

var matches = require("../../services/matches"),
    moment = require('moment'),
    _ = require('underscore');

// Helper
var nextMatch = function(date, matches) {
    var startTime = +date;
    var nearestMatch, nearestDiff = Infinity;
    for( var i = 0, n = matches.length;  i < n;  ++i ) {
        var diff = +moment(matches[i].date).format('X') - startTime;
        if( diff > 0  &&  diff < nearestDiff ) {
            nearestDiff = diff;
            nearestMatch = matches[i];
        }
    }
    return nearestMatch;
};

exports.all = function(req, res){
  matches(function (err, matches) {
    if(err) {
      res.status(500);
      res.json({
        error: err
      });
    } else {
      res.json(matches);
    }
  });
};

exports.upcoming = function(req, res){
  var date;
  if (req.query.date) {
    date = moment(+req.query.date);
  } else {
    date = moment();
  }
  matches(function (err, matches) {
    if(err) {
      res.status(500);
      res.json({
        error: err
      });
    } else {
      res.json(nextMatch(date.format('X'), matches));
    }
  });
};

exports.upcomingTeam = function(req, res){
  var date, team, filteredMatches;
  if (req.query.date) {
    date = moment(+req.query.date);
  } else {
    date = moment();
  }

  if (req.params.team) {
    team = req.params.team;

    matches(function (err, matches) {
      if(err) {
        res.status(500);
        res.json({
          error: err
        });
      } else {
        // Filter Matches by team.
        filteredMatches = _.where(matches, {home: team}).concat(_.where(matches, {away: team}));
        // Return closest match to date   
        res.json(nextMatch(date.format('X'), filteredMatches));
      }
    });
  } else {
    res.status(500);
    res.json({error: "You need to add a team"});
  }
};

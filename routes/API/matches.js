var matches = require("../../services/matches");

exports.all = function(req, res){
  matches(function (err, matches) {
    if(!err) {
      res.json(matches);
    } else {
      res.status(500);
      res.json({
        error: err
      });
    }
  });
};


exports.upcoming = function(req,res){
  matches(function (err, matches) {
    if(!err) {
      matches.sort(function (a ,b) {
        if(a.timeUNIX > b.timeUNIX)
            return 1;
        if(a.timeUNIX < b.timeUNIX)
            return -1;
        return 0;
      });
      res.json(matches[0]);
    } else {
      res.status(500);
      res.json({
        error: err
      });
    }
  });
};

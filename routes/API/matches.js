var matchesService = require("../../services/matches-json");

exports.all = function(request,response){
  console.log(matchesService.matches);
  response.json(matchesService.matches);
  response.end();  
};


exports.upcoming = function(request,response){
  console.log(matchesService.matches[0]);
  response.json(matchesService.matches[0]);
  response.end();
};

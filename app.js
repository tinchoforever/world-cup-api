
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  ,	matchesAPI = require('./routes/API/matches')
  , http = require('http')
  , path = require('path');

var app =  express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

//[GET]  	 /api/v1/matches/all
app.get('/api/v1/matches/all', matchesAPI.all);
//[GET]  	 /api/v1/matches/upcoming
app.get('/api/v1/matches/upcoming', matchesAPI.upcoming)
//[GET] 	 /api/v1/matches/{TEAM}
//app.get('/api/v1/matches/{TEAM}', matchesAPI.upcoming)

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

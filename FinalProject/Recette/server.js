var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

app.set('port', (process.env.PORT || 3001));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

//support parsing of application/json type post data
// app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
// app.use(bodyParser.urlencoded({extended:false}));

//static path
// app.use(express.static(path.join(__dirname, 'public')));


app.get('/test', function(req,res){
	res.send('Hello world');
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});

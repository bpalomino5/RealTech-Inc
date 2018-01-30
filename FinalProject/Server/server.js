var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

//support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({extended:false}));
//static path
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req,res){
	res.send('Hello world');
});

app.listen( 3000, function() {
	console.log('Server started, port: 3000');
});

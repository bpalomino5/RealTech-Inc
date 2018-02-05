var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mysql = require('mysql');

var app = express();

app.set('port', (process.env.PORT || 3001));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

	var con = mysql.createPool({
	  host: 'us-cdbr-iron-east-05.cleardb.net',
	  user: 'bd3873c3be4cfe',
	  password: '50713e21',
	  database: 'heroku_c7d7094d02a13d7'
	});
}

//support parsing of application/json type post data
// app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
// app.use(bodyParser.urlencoded({extended:false}));

//static path
//serving static path for images stored on server
app.use('/images', express.static(path.join(__dirname, 'images')))

// const con = mysql.createConnection({
//   //setup up like this b/c of brew, need to change
//   host: 'localhost',
//   user: 'root',
//   password: 'root',
//   database: 'Recette'
// });

var con = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'Recette'
});

// var con = mysql.createPool({
//   host: 'us-cdbr-iron-east-05.cleardb.net',
//   user: 'bd3873c3be4cfe',
//   password: '50713e21',
//   database: 'heroku_c7d7094d02a13d7'
// });


function getRecipes(callback) {
	var recipes = [];
	con.query('SELECT * FROM recipes', (err,rows) => {
	  if(err) throw err;

	  // console.log('Data received from Db:\n');
	  rows.forEach( (row) => {
	  	recipes.push({
				name: row.name,
				image: row.image_location
			});
	  });
	  callback(recipes);
	});
};

app.get('/getRecipes', function(req,res){
	getRecipes(function(recipes){
		res.send({recipes: recipes});
	});
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
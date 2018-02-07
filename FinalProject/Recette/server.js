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
else {
	//else running local development use local server for now
	// var con = mysql.createPool({
	//   host: 'localhost',
	//   user: 'root',
	//   password: 'root',
	//   database: 'sitepoint'
	// });

	//will be using hosted db from now on, not local
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


function getRecipeByID(ID, callback) {
	var recipeInfo = {};
	var sql = 'SELECT name, prep_time, cooking_time, origin_id, style_id, image_location, rating FROM recipes where recipes.recipe_id = ' + ID; // ID receieved from User Request, concatenate with sql command
	con.query( sql, (err, rows) => {
		if (err) throw err;
			callback(rows[0]);	//returns the only one row
	});
};

function getRecipes(callback) {
	var recipes = [];
	con.query('SELECT * FROM recipes LIMIT 0, 29', (err,rows) => {
		if(err) throw err;

		// console.log('Data received from Db:\n');
		rows.forEach( (row) => {
	  		recipes.push({
				name: row.name,
				image: row.image_location // may need to change to row.image;
			});
	 	});
		callback(recipes);
	});
};

app.get('/getRecipeByID', function(req,res){
	// res.send({params:req.query.id});
	getRecipeByID(req.query.id, function(recipeInfo){
		res.send({recipeInfo: recipeInfo});
	});
});

app.get('/getRecipes', function(req,res){
	getRecipes(function(recipes){
		res.send({recipes: recipes});
	});
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
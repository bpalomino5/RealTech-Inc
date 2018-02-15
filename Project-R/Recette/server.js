var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mysql = require('mysql');

var serverFunctions = require('./serverFunctions.js')
var db = require('./DBPoolConnection.js')
var connectionPool = db.getPool();

var app = express();

app.set('port', (process.env.PORT || 3001));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

//support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({extended:false}));

//serving static path for images stored on server
app.use('/images', express.static(path.join(__dirname, 'images')))

//Select ingredient_id, quantity from has_ingredients where recipe_id=1

// function getRecipeByID(ID, callback) {
// 	// var recipeInfo = {};
// 	var sql = 'SELECT name, prep_time, cooking_time, style_id, image_location, instruction FROM recipes where recipes.recipe_id = ' + ID; // ID receieved from User Request, concatenate with sql command
// 	connectionPool.query( sql, (err, rows) => {
// 		if (err) throw err;
// 		callback(rows[0]);	//returns the only one row
// 	});
// };

// function getRecipes(callback) {
// 	var recipes = [];
// 	connectionPool.query('SELECT recipe_id, name, image_location FROM recipes LIMIT 0, 29', (err,rows) => {
// 		if(err) throw err;
// 		rows.forEach( (row) => {
// 	  		recipes.push({
// 	  		id: row.recipe_id,
// 				title: row.name,
// 				image: row.image_location // may need to change to row.image;
// 			});
// 	 	});
// 		callback(recipes);
// 	});
// };

app.get('/getRecipeByID', function(req,res){
	serverFunctions.getRecipeByID(req.query.id, function(recipeInfo){
		res.json({recipeInfo: recipeInfo});
	})
	// getRecipeByID(req.query.id, function(recipeInfo){
		// res.send({recipeInfo: recipeInfo});
	// });
});

app.get('/getRecipes', function(req,res){
	serverFunctions.getRecipes(function(recipes){
		res.json({recipes: recipes});
	})
	// getRecipes(function(recipes){
	// 	res.send({recipes: recipes});
	// });
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
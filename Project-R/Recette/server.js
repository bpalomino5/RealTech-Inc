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

function getRecipeByID(ID, callback) {
 	var recipeInfo = {};
 	var sql = 'SELECT name, prep_time, cooking_time, style_id, image_location, instruction FROM recipes where recipes.recipe_id = ' + ID; // ID receieved from User Request, concatenate with sql command
 	connectionPool.query( sql, (err, rows) => {
 		if (err) throw err;
		//recipeInfo = {rows[0], getIngredients(ID)};
		//recipeInfo.push({
		//	info: rows[0],
		//	ingredients: getIngredients(ID),
		//});
		callback(rows[0]);	 //returns the only one row
	});
 };

function getIngredients(ID, callback) {
	var ingredients = [];
	connectionPool.query('SELECT ingredient_id, quantity, unit_id FROM has_ingredients where has_ingredients.recipe_id = ' + ID, (err, rows) => {
		if (err) throw err;
		rows.forEach( (row) => {
			ingredients.push({
				name: getIngredientName(row.ingredient_id),
				quantity: row.quantity,
				units: getUnitName(row.unit_id)
			});
		});
		callback(ingredients);
	});
};

function getIngredientName(ID, callback) {
	connectionPool.query('SELECT name FROM ingredients where ingredients.ingredient_id = ' + ID, (err, rows) => {
		if(err) throw err;
		callback(rows.name);
	});
};

function getUnitName(ID, callback) {
	connectionPool.query('SELECT name FROM unit where unit.unit_id = ' + ID, (err, rows) => {
		if(err) throw err;
		callback(rows.name);
	});
};

function getRecipes(callback) {
 	var recipes = [];
 	connectionPool.query('SELECT recipe_id, name, image_location FROM recipes LIMIT 0, 29', (err,rows) => {
 		if(err) throw err;
 		rows.forEach( (row) => {
 	  		recipes.push({
 	  			id: row.recipe_id,
 				title: row.name,
 				image: row.image_location // may need to change to row.image;
 			});
 	 	});
 		callback(recipes);
 	});
};

app.get('/getRecipeByID', function(req,res){
	getRecipeByID(req.query.id, function(recipeInfo){
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

app.get('/createUser', function(req,res){
	createUser(req.query.user_name, req.query.user_password, req.query.user_email, function(status){
		res.send({status: status});
	});
});

function createUser(user_name, user_password, user_email, callback) {
	var existingUser = false;
	connectionPool.query('SELECT username FROM user_data', (err, rows) => {
		if(err) throw err;
		rows.forEach( (row) => {
			if(row.username == user_name)
			{
				existingUser = true;
				callback(0, "User already exists.");
			}
		});
	});

	if (!existingUser)
	{
		connectionPool.query('INSERT INTO user_data (username, password, email) VALUES (user_name, user_password, user_email)', function(err, result) {
			if (err) throw err;
			callback(1, "User was added.");
		});
	}
};

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
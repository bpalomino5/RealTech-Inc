var db = require('./DBPoolConnection.js')
var connectionPool = db.getPool();
var bcrypt = require('bcrypt');

module.exports = {
	getRecipes:function(callback) {
		var recipes = [];
		connectionPool.query('SELECT recipe_id, name, image_location FROM recipes LIMIT 0, 29', (err,rows) => {
			if(err)
				throw err;

			rows.forEach( (row) => {
		  	recipes.push({
		  		id: row.recipe_id,
					title: row.name,
					image: row.image_location // may need to change to row.image;
				});
		 	});
			callback(recipes);
		});
	},
	getRecipeByID:function(ID, callback) {
		var sql = 'SELECT name, prep_time, cooking_time, style_id, image_location, instruction FROM recipes where recipes.recipe_id = ' + ID; // ID receieved from User Request, concatenate with sql command
		connectionPool.query( sql, (err, rows) => {
			if (err) throw err;
			callback(rows[0]);	//returns the only one row
		});
	},
	getIngredients:function(ID, callback) {
		var ingredients = [];	
		var sql = 'SELECT has_ingredients.quantity, ingredients.name FROM has_ingredients inner join ingredients on has_ingredients.ingredient_id=ingredients.ingredient_id where has_ingredients.recipe_id ='+ ID;
		connectionPool.query(sql, (err, rows) => {
			if (err) throw err;
			rows.forEach( (row) => {
				ingredients.push({
					name: row.name,
					quantity: row.quantity
				});
			});
			callback(ingredients);
		})
	},
	createUser:function(user_name, user_password, user_email, callback) {
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
			var hash = bcrypt.hashSync(user_password, 10);
 			connectionPool.query('INSERT INTO user_data (username, password, email) VALUES (user_name, hash, user_email)', function(err, result) {
 				if (err) throw err;
 				callback(1, "User was added.");
 			});
 		}
	},
	getComments:function(ID, callback){
		var comments = [];
		var sql = 'SELECT recipe_comments.text, user_data.first_name FROM recipe_comments inner join user_data on recipe_comments.user_id=user_data.user_id where recipe_comments.recipe_id = ' + ID;
		connectionPool.query(sql, (err, rows) => {
			if(err) throw err;
			rows.forEach( (row) => {
				comments.push({
					user: row.first_name,
					comment: row.text
				});
			});
		});
	},
	addComment:function(user, message, recipe, callback){
		connectionPool.query('INSERT INTO recipe_comments (user_id, recipe_id, text) VALUES (user, recipe, message)', function(err, result) {
			if(err) throw err;
			callback(1, "Message was added.");
		});
	},
}
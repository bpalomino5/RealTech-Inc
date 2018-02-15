var db = require('./DBPoolConnection.js')
var connectionPool = db.getPool();

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
	getIngredients:function(ID,callback) {
		var ingredients = [];	
		var sql = 'Select has_ingredients.quantity, ingredients.name From has_ingredients inner join ingredients on has_ingredients.ingredient_id=ingredients.ingredient_id where has_ingredients.recipe_id ='+ ID;
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
}
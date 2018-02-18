var db = require('./DBPoolConnection.js')
var connectionPool = db.getPool();
var bcrypt = require('bcrypt');

module.exports = {
	getUserData:function(rec, user_id, callback){
		var getUserData = "Select * from user_data where user_id = " + user_id;
		connectionPool.query(getUserData, function(err, result){
			if(err){
				module.exports.printError("getUserData","SQL Query Error: getting user data based on user_id",err, {user_id:user_id})
				callback("An interal error occured")
			}
			else{
				if(result.length === 0){
					if(rec){
						module.exports.printError("getUserData","Parameter Error: invalid user_id",null,{user_id:user_id})
					}
					callback(false, 'Invalid User ID')
				}
				else{
					callback(false,false,result[0])
				}
			}
		})
	},
	login:function(data, callback){
		var query = "Select * from user_data where user_data.username = '" + data.user_name + "'";
		connectionPool.query(query, function(err, results){
			if(err){
				module.exports.printError("login", "SQL Query Error: could not find user", err, data)
				callback("An Internal Error Occured")
			}
			if(results.length==0){
				module.exports.printError("login", "Parameter Error: invalid username",null,data)
				callback(false, "Invalid username");
			}
			bcrypt.compare(data.user_password, results[0].password, function(password_err,result){
				if(password_err){
					module.exports.printError("login","Bcrypt Error: error comparing passwords",password_err,data)
					callback("An Internal Error Occured")
				}
				else if(result == false){
					module.exports.printError("login","Parameter Error: invalid password",null,data)
					callback(false, 'invalid password')
				}
				else{
					callback(false,false)
				}
			})
		})
	},
	addComment:function(data,callback){
		module.exports.getTime(function(time){
			var query_insert_comment = "INSERT INTO recipe_comments (user_id, recipe_id, text) VALUES ("+ data.user_id +","+ data.recipe_id +",'"+data.message+"')";
			connectionPool.query(query_insert_comment,function(err, results){
				if(err){
					module.exports.printError("addComment","SQL Query Error: inserting new comment",err,{timestamp:time,data:data})
					callback("An Internal Error Occured")
				}
				else
					callback(false)
			})
		})
	},
	getRecipes:function(callback) {
		var recipes = [];
		connectionPool.query('SELECT recipe_id, name, image_location FROM recipes LIMIT 0, 29', (err,rows) => {
			if(err)
				module.exports.printError("getRecipes", "SQL Query Error: could not get recipes", err, {})

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
			if (err)
				module.exports.printError("getRecipeByID", "SQL Query Error: could not get recipes by id", err, {ID:ID})

			callback(rows[0]);	//returns the only one row
		});
	},
	getIngredients:function(ID, callback) {
		var ingredients = [];	
		var sql = 'SELECT has_ingredients.quantity, unit.unit_name, ingredients.name FROM has_ingredients INNER JOIN ingredients ON has_ingredients.ingredient_id=ingredients.ingredient_id inner join unit on has_ingredients.unit_id=unit.unit_id WHERE has_ingredients.recipe_id ='+ ID;
		connectionPool.query(sql, (err, rows) => {
			if (err) throw err;
			rows.forEach( (row) => {
				if(parseInt(row.quantity)>1) row.unit_name=row.unit_name.concat('s');
				
				ingredients.push({
					name: row.name,
					quantity: row.quantity,
					unit_name: row.unit_name
				});
			});
			callback(ingredients);
		})
	},
	createUser:function(user_name, user_password, user_email, firstname, lastname, callback) {
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
			bcrypt.hash(user_password, 10, function(err, hash) {
				connectionPool.query('INSERT INTO user_data (username, password, email, first_name, last_name) VALUES (user_name, hash, user_email, firstname, lastname)', function(err, result) {
 					if (err) throw err;
 					callback(1, "User was added.");
 				});
			});
 		}
	},
	updateBio:function(bio, session_id, callback) {
		var user = 0;
		connectionPool.query('SELECT * FROM user_data', function(err, rows) {
			rows.forEach( (row) => {
				bcrypt.compare(row.username, session_id, function(err, res) {
					user = row.user_id;
				});
			});
		});
		
		connectionPool.query('UPDATE user_data SET biography = ' + bio + ' WHERE user_id =' + user, function (err, result) {
			if (err) throw err;
			callback(1, "User bio updated.");
		});
	},
	getComments:function(ID, callback){
		var comments = [];
		var sql = 'SELECT recipe_comments.text, user_data.first_name FROM recipe_comments INNER JOIN user_data ON recipe_comments.user_id=user_data.user_id WHERE recipe_comments.recipe_id ='+ ID;
		connectionPool.query(sql, (err, rows) => {
			if(err) 
				module.exports.printError("getComments", "SQL Query Error: getting comments",err,{ID:ID})

			rows.forEach( (row) => {
				comments.push({
					user: row.first_name,
					comment: row.text
				});
			});
			callback(comments);
		});
	},
	getTime:function(callback){
		callback(Math.round((new Date()).getTime() / 1000))
	},
	printError:function(f_name, description, err, data){
		console.log()
		module.exports.getTime(function(time){
			console.log(time)
			console.log(f_name)
			console.log(description)
			// console.log(err)
			console.log(data)
		})
	},
}
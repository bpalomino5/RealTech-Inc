var db = require('./DBPoolConnection.js')
var connectionPool = db.getPool();
var bcrypt = require('bcrypt');

module.exports = {
	checkUsername:function(user_name, callback){
		var query = "Select * from user_data where user_data.username = '" + user_name + "'";
		connectionPool.query(query, function(err, results){
			if(err){
				module.exports.printError("login", "SQL Query Error: selecting user from user_data", err, {user_name:user_name})
				callback("An Internal Error Occured")
			}
			if(results.length !=0){
				callback(false, "Username is taken");
			}
			else
				callback(false,false)
		})
	},
	createUser:function(data,callback){
		bcrypt.hash(data.user_password, 10, function(password_err,hash){
			if(password_err){
				module.exports.printError("createUser","Bcrypt Error: error hashing password",password_err,data)
				callback("An Internal Error Occured")
			}
			//store hash in db
			var query = "INSERT INTO user_data (username, password, email, first_name, last_name) VALUES ('" + data.user_name + "','" + hash + "','" + data.user_email + "','" + data.firstname + "','" + data.lastname + "')";
			connectionPool.query(query, function(err,result){
				if(err){
					module.exports.printError("createUser", "SQL Query Error: could not add user", err, data)
					callback('Could not add user')
				}
				else{
					callback(false,false)
				}
			})
		});
	},
	getUserData:function(user_id, callback){
		var query = "Select * from is_loggedin where user_id = " + user_id;
		connectionPool.query(query, function(err, results){
			if(err){
				module.exports.printError("getUserData", "SQL Query Error: could not get data from is_loggedin",err,{user_id:user_id})
				callback("An Internal Error Occured")
			}
			if(results.length==0){
				module.exports.printError("getUserData", "Internal Error: querying for userdata without being logged in",err,{user_id:user_id})
				callback(false,"User is not logged in")
			}
			else
				callback(false,false,results[0])
		})
	},
	checkLogins(user_id, callback){
		var query = "Select * from is_loggedin where user_id = " + user_id;
		connectionPool.query(query, function(err, results){
			if(err){
				module.exports.printError("checkLogins", "SQL Query Error: could not get data from is_loggedin",err,{user_id:user_id})
				callback("An Internal Error Occured")
			}
			if(results.length != 0){
				callback(false,"User is already logged in")
			}
			else
				callback(false,false)
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
					callback(false,false, results[0].user_id)
				}
			})
		})
	},
	logout:function(data, callback){
		var query = "SELECT * FROM is_loggedin WHERE user_token = " + data.user_token;
		connectionPool.query(query, function(err, results){
			if(err){
				module.exports.printError("logout", "SQL Query Error", err, data)
				callback("An Internal Error Occured")
			}
			else if(results.length==0){
				module.exports.printError("logout", "Parameter Error: invalid user token", null, data)
				callback(false, 'invalid user token')
			}
			else {
				callback(false, false)
			}
		})
	},
	removeUserToken:function(data, callback){
		var query = "DELETE FROM is_loggedin WHERE user_token = " + data.user_token;
		connectionPool.query(query, function(err, results){
			if (err) {
				module.exports.printError("removeUserToken","SQL Query Error", err, data)
				callback("An internal Error Occured")
			}
			else {
				callback(false, false)
			}
		});
	},
	storeLoginToken:function(data, callback){
		var query = "INSERT INTO is_loggedin (user_id, user_token) VALUES (" + data.user_id + ",'"+ data.user_token + "')";
		connectionPool.query(query, function(err, results){
			if(err){
				module.exports.printError("storeLoginToken","SQL Query Error: could not insert token into is_loggedin",err,data)
				callback("An internal Error Occured")
			}
			else
				callback(false,false)
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
					callback(false,false)
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
	updateBio:function(data, callback) {
		var query = "UPDATE user_data SET biography = " + data.biography + " WHERE user_id = " + data.user_id;
		connectionPool.query(query, function(err, result){
			if (err) {
				module.exports.printError("updateBio","SQL Query Error",err,data)
				callback("An Internal Error Occured")
			} 
			else 
				callback(false, false)
		})
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
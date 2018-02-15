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


app.get('/getRecipeByID', function(req,res){
	serverFunctions.getRecipeByID(req.query.id, function(recipeInfo){
		serverFunctions.getIngredients(req.query.id, function(ingredients){
			recipeInfo.ingredients = ingredients; //adding ingredients array to recipeinfo
			res.json({recipeInfo: recipeInfo});
		})
	})
});

app.get('/getRecipes', function(req,res){
	serverFunctions.getRecipes(function(recipes){
		res.json({recipes: recipes});
	})
});

//Create user should be POST i.e. app.post
// app.post('/createUser', function(req,res){
	//call functionality using serverFunctions
	//serverFunctions.createUser()
// 	createUser(req.query.user_name, req.query.user_password, req.query.user_email, function(status){
// 		res.send({status: status});
// 	});
// });

//THIS needs to be implemented in serverFunctions.js
// function createUser(user_name, user_password, user_email, callback) {
// 	var existingUser = false;
// 	connectionPool.query('SELECT username FROM user_data', (err, rows) => {
// 		if(err) throw err;
// 		rows.forEach( (row) => {
// 			if(row.username == user_name)
// 			{
// 				existingUser = true;
// 				callback(0, "User already exists.");
// 			}
// 		});
// 	});

// 	if (!existingUser)
// 	{
// 		connectionPool.query('INSERT INTO user_data (username, password, email) VALUES (user_name, user_password, user_email)', function(err, result) {
// 			if (err) throw err;
// 			callback(1, "User was added.");
// 		});
// 	}
// };

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
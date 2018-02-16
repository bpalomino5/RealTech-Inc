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

app.get('/getComments', function(req,res){
	serverFunctions.getComments(req.query.recipe_id, function(comments){
		res.json({comments: comments});
	})
});

app.post('/createUser', function(req,res){
 	serverFunctions.createUser(req.query.user_name, req.query.user_password, req.query.user_email, function(status){
 		res.send({status: status});
 	})
});

app.post('/addComment', function(req,res) {
	serverFunctions.addComment(req.query.user_id, req.query.message, req.query.recipe_id, function(status){
		res.send({status: status});
	});
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mysql = require('mysql');

var gen = require('./generalFunctions.js');
var serverFunctions = require('./serverFunctions.js');
var db = require('./DBPoolConnection.js');
var connectionPool = db.getPool();
var action = require('./actionFunctions.js');

//server continues to run if any exception occurs, will print error instead of exiting
process.on('uncaughtException', function(err){
	serverFunctions.printError("Error occured","An undefined error in runtime",err,null)
});

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

// app.post('/createUser', function(req,res){
//  	serverFunctions.createUser(req.body.user_name, req.body.user_password, req.query.user_email, req.query.firstname, req.query.lastname, function(status){
//  		res.send({status: status});
//  	})
// });

// app.post('/updateBio', function(req,res){
// 	serverFunctions.updateBio(req.query.bio, req.query.session_id, function(status){
// 		res.send({status: status});
// 	})
// });

app.post('/login', function(req,res){
	action.loginUser(req.body,res,function(message,data){
		gen.validResponse(res,message,data)
	})
});

app.post('/addComment', function(req,res) {
	gen.checkReqSpecific(req,res,function(data){
		serverFunctions.addComment(data,function(err){
			if(err){
				gen.structuralError(res, "Sorry!, An Error Occured")
			}
			else
				gen.validResponse(res, "Comment has been recorded")
		})
	})
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
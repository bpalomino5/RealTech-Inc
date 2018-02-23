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

app.get('/getIngredients', function(req,res){
	serverFunctions.getAllIngredients(function(ingredients){
		res.json({ingredients: ingredients});
	})
});

app.get('/getPreferences', function(req, res){
	serverFunctions.getPreferences(req.query.user_id, function(preferences){
		res.json({preferences:preferences});
	})
});

app.get('/getFavorites', function(req, res){
	serverFunctions.getFavorites(req.query.user_id, function(favorites){
		res.json({favorites:favorites});
	})
});

app.get('/getActivity',function(req,res){
	serverFunctions.getActivity(req.query.user_id, function(activity){
		res.json({activity:activity});
	})
});

app.get('/getUnits',function(req,res){
	serverFunctions.getUnits(function(units){
		res.json({units:units});
	})
});

app.post('/addActivity',function(req,res){
	gen.checkReqSpecific(req,res,function(data){
		action.addActivity(data, res, function(message){
			gen.validResponse(res,message)
		})
	})
});

app.post('/addPreferences', function(req, res){
	gen.checkReqSpecific(req,res,function(data){
		action.addPreferences(data, res, function(message){
			gen.validResponse(res, message)
		})
	})
});

app.post('/addFavorite', function(req, res){
	 gen.checkReqSpecific(req, res, function(data){
		action.addFavorite(data, res, function(message){
			gen.validResponse(res, message)
		})
	 })
});

app.post('/updateBio', function(req,res){
	gen.checkReqSpecific(req,res,function(data){
		action.updateBio(data, res, function(message){
			gen.validResponse(res, message)
		})
	})
});

app.post('/createUser', function(req,res){
	action.createUser(req.body, res, function(message){
		gen.validResponse(res,message)
	})
})

app.post('/login', function(req,res){
	action.loginUser(req.body,res,function(message,data){
		gen.validResponse(res,message,data)
	})
});

app.post('/logout', function(req, res){
	action.logoutUser(req.body, res, function(message){
		gen.validResponse(res,message)
	})
});

app.post('/addComment', function(req,res) {
	gen.checkReqSpecific(req,res,function(data){
		action.addComment(data,res,function(message){
			gen.validResponse(res,message)
		})
	})
});

app.post('/getUserData', function(req,res){
	gen.checkReqSpecific(req,res,function(data){
		action.getUserData(data,res,function(message,data){
			gen.validResponse(res,message,data)
		})
	})
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
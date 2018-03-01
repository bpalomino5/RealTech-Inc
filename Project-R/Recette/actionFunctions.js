var serverFunctions = require('./serverFunctions.js');
var gen = require('./generalFunctions.js');
var rs = require("randomstring");

module.exports = {
	generateUserToken:function(callback){
		callback(rs.generate({
			length: 6,
			capitalization: 'uppercase'
		}))
	},
	attemptCreateUser:function(data,res,callback){
		if(data.user_name == undefined || data.user_password == undefined || data.user_email == undefined || data.firstname == undefined || data.lastname == undefined){
			gen.structuralError(res, "Error.Base Headers/Parameters not met")
		}
		else
			callback()
	},
	createUser:function(data,res,callback){
		module.exports.attemptCreateUser(data,res,function(){
			serverFunctions.checkUsername(data.user_name, function(check_struct_err, check_simple_err){
				gen.handleErrors(res,check_struct_err,check_simple_err, function(){
					serverFunctions.checkEmail(data.user_email, function(check_struct_err, check_simple_err){
						gen.handleErrors(res,check_struct_err,check_simple_err, function(){
							serverFunctions.createUser(data, function(create_struct_err,create_simple_err){
								gen.handleErrors(res,create_struct_err,create_simple_err, function(){
									callback("User Account Created!")
								})
							})
						})
					})
				})
			})
		})
	},
	attemptLinkIngred:function(data,res,callback){
		if(data.recipe_id == undefined || data.ingredient_id == undefined){
			gen.structuralError(res,"Error.Base Headers/Parameters not met")
		}
		else
			callback()
	},	
	linkIngredients:function(data,res,callback){
		module.exports.attemptLinkIngred(data,res,function(){
			serverFunctions.linkIngredients(data,function(struct_err,simple_err){
				gen.handleErrors(res,struct_err,simple_err,function(){
					callback("Ingredient added to recipe")
				})
			})
		})

	},
	attemptLogin:function(res,data,callback){
		if(data.user_name == undefined || data.user_password == undefined){
			gen.structuralError(res, "Error.Base Headers/Parameters not met")
		}
		else
			callback()
	},
	loginUser:function(data,res,callback){
		module.exports.attemptLogin(res, data, function(){
			serverFunctions.login(data, function(struct_err,simple_err,user_id){
				gen.handleErrors(res,struct_err,simple_err, function(){
					serverFunctions.checkLogins(user_id, function(check_struct_err, check_simple_err){
						gen.handleErrors(res,check_struct_err,check_simple_err, function(){
							module.exports.generateUserToken(function(user_token){
								var resData = {user_id:user_id,user_token:user_token};
								serverFunctions.storeLoginToken(resData, function(store_struct_err,store_simple_err){
									gen.handleErrors(res,store_struct_err,store_simple_err, function(){
										callback("Login Successful", resData)
									})
								})
							})
						})
					})
				})
			})
		})
	},
	attemptLogoutUser:function(res, data, callback){
		if(data.user_token == undefined){
			gen.structuralError(res, "Error. Parameters not met")
		}
		else
			callback()
	},
	logoutUser:function(data, res, callback){
		module.exports.attemptLogoutUser(res, data, function(){
			serverFunctions.logout(data, function(struct_err, simple_err){
				gen.handleErrors(res, struct_err, simple_err, function(){
					serverFunctions.removeUserToken(data, function(store_struct_err, store_simple_err){
						gen.handleErrors(res, store_struct_err, store_simple_err, function(){
							callback("Logout Successful")
						})
					})
				})
			})
		})
	},
	attemptUpdateBio:function(data,res,callback){
		if(data.biography == undefined){
			gen.structuralError(res, "Error.Base Headers/Parameters not met")
		}
		else
			callback()
	},
	updateBio:function(data,res,callback){
		module.exports.attemptUpdateBio(data,res,function(){
			serverFunctions.updateBio(data,function(bio_struct_err,bio_simple_err){
			gen.handleErrors(res,bio_struct_err,bio_simple_err, function(){
				callback("Biography Updated.")
				})
			})
		})
	},
	attemptAddComment:function(data,res,callback){
		if(data.recipe_id == undefined || data.message == undefined){
			gen.structuralError(res, "Error.Base Headers/Parameters not met")
		}
		else
			callback()
	},
	addComment:function(data,res,callback){
		module.exports.attemptAddComment(data,res, function(){
			serverFunctions.addComment(data,function(struct_err,simple_err){
				gen.handleErrors(res,struct_err,simple_err, function(){
					callback("Comment has been added")
				})
			})
		})
	},
	attemptAddRecipe:function(data,res,callback){
		if(data.name == undefined || data.instruction == undefined){ //Might want to include more checks
			gen.structuralError(res, "Error.Base Headers/Parameters not met") 
		}
		else
			callback()
	},
	addRecipe:function(data,res,callback){
		module.exports.attemptAddRecipe(data,res,function(){
			serverFunctions.addRecipe(data,function(struct_err,simple_err){
				gen.handleErrors(res,struct_err,simple_err,function(){
					callback("Recipe has been added")
				})
			})
		})
	},
	attemptAddPreferences:function(data,res,callback){
		if(data.style_id == undefined || data.user_id == undefined)
			gen.structuralError(res, "Error. Parameters not met")
		else
			callback()
	},
	addPreferences:function(data,res,callback){
		module.exports.attemptAddPreferences(data,res,function(){
			serverFunctions.addPreferences(data,function(struct_err,simple_err){
				gen.handleErrors(res,struct_err,simple_err, function(){
					callback("Preferences have been added")
				})
			})
		})
	},
	attemptAddActivity:function(data,res,callback){
		if(data.message == undefined || data.user_id == undefined)
			gen.structuralError(res, "Error. Parameters not met")
		else
			callback()
	},
	addActivity:function(data,res,callback){
		module.exports.attemptAddActivity(data,res,function(){
			serverFunctions.addActivity(data,function(struct_err,simple_err){
				gen.handleErrors(res,struct_err,simple_err,function(){
					callback("Activity has been added")
				})
			})
		})
	},
	attemptAddFavorite:function(data,res,callback){
		if(data.user_id == undefined || data.recipe_id == undefined)
			gen.structuralError(res, "Error. Parameters not met")
		else
			callback()
	},
	addFavorite:function(data,res,callback){
		module.exports.attemptAddFavorite(data,res,function(){
			serverFunctions.addFavorite(data,function(struct_err,simple_err){
				gen.handleErrors(res,struct_err,simple_err, function(){
					callback("Favorite has been added")
				})
			})
		})
	},
	attemptAddIngredient:function(data,res,callback){
		if(data.ingredient_id == undefined || data.name == undefined)
			gen.structuralError(res,"Error. Parameters not met")
		else
			callback()
	},
	addIngredient:function(data,res,callback){
		module.exports.attemptAddIngredient(data,res,function(){
			serverFunctions.addIngredient(data,function(struct_err,simple_err){
				gen.handleErrors(res,struct_err,simple_err,function(){
					callback("Ingredient has been added")
				})
			})
		})
	},
	attemptAddStyle:function(data,res,callback){
		if(data.style_name == undefined)
			gen.structuralError(res,"Error. Parameters not met")
		else
			callback()
	},
	addStyle:function(data,res,callback){
		module.exports.attemptAddStyle(data,res,function(){
			serverFunctions.addStyle(data,function(struct_err,simple_err){
				gen.handleErrors(res,struct_err,simple_err,function(){
					callback("Style has been added")
				})
			})
		})
	},
	attemptAddUnit:function(data,res,callback){
		if(data.unit_name == undefined)
			gen.structuralError(res,"Error. Parameters not met")
		else
			callback()
	},
	addUnit:function(data,res,callback){
		module.exports.attemptAddUnit(data,res,function(){
			serverFunctions.addUnit(data,function(struct_err,simple_err){
				gen.handleErrors(res,struct_err,simple_err,function(){
					callback("Unit has been added")
				})
			})
		})
	},
	getUserData:function(data,res,callback){
		serverFunctions.getUserData(data.user_id, function(struct_err,simple_err, userData){
			gen.handleErrors(res,struct_err,simple_err, function(){
				delete userData.password;
				callback("User data request successful", userData)
			})
		})
	},
	getPublicUserData:function(data,res,callback){
		serverFunctions.getUserData(data.profile_id, function(struct_err,simple_err, userData){
			gen.handleErrors(res,struct_err,simple_err, function(){
				delete userData.password;
				callback("Public user data request successful", userData)
			})
		})
	},
	getActivity:function(data,res,callback){
		serverFunctions.getActivity(data.user_id, function(struct_err,simple_err, userActivity){
			gen.handleErrors(res,struct_err,simple_err, function(){
				callback("User ac request successful", userActivity)
			})
		})
	},
	getFavorites:function(data,res,callback){
		serverFunctions.getFavorites(data.user_id, function(struct_err,simple_err, userFavorites){
			gen.handleErrors(res,struct_err,simple_err, function(){
				callback("User's favorites request successful", userFavorites)
			})
		})
	},
};
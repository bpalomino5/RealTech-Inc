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
					serverFunctions.createUser(data, function(create_struct_err,create_simple_err){
						gen.handleErrors(res,create_struct_err,create_simple_err, function(){
							callback("User Account Created!")
						})
					})
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
		if(data.session_id == undefined){
			gen.structuralError(res, "Error. Parametes not met")
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
							callback("Logout Successful", data)
						})
					})
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
};
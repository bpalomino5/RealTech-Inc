var serverFunctions = require('./serverFunctions.js');
var gen = require('./generalFunctions.js');

module.exports = {
	attemptLogin:function(res,data,callback){
		if(data.user_name == undefined || data.user_password == undefined){
			gen.structuralError(res, "Error.Base Headers/Parameters not met")
		}
		else
			callback()
	},
	loginUser(data,res,callback){
		module.exports.attemptLogin(res, data, function(){
			serverFunctions.login(data, function(struct_err,simple_err){
				gen.handleErrors(res,struct_err,simple_err, function(){
					callback("Login Successful", {user_token:'makerealtoken'})
				})
			})
		})
	},
};
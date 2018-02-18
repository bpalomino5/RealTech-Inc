var serverFunctions = require('./serverFunctions.js');

module.exports = {
	/* Checking at User Specific Layer 
	ensures that http call is authenticated with user token
	i.e. addComment, logoff, updates, etc.
	*/
	checkReqSpecific:function(req,res,callback){
		if(req.body.user_id == undefined || req.body.user_token == undefined){
			serverFunctions.printError("checkReqSpecific","Error: Base Headers/Parameters not met",null,null)
			module.exports.structuralError(res,"Error: Base Headers/Parameters not met")
		}
		else{
			serverFunctions.getUserData(req.body.user_id, function(struct_err,simple_err,userData){
				module.exports.handleErrors(res,struct_err,simple_err,function(){
					if(req.body.user_token == userData.user_token)
						callback(req.body)
					else{
						serverFunctions.printError("checkReqSpecific","Error: User Token Invalid",null,req.body)
						module.exports.simpleError(res,"Error: User Token Invalid")
					}
				})
			})
		}
	},
	/* HTTP response when there is a structural issue with the HTTP request
	i.e. - all necessary data headers are not provided, the token is invalid
	param {Response} res - the http response variable
	param {String} message - the text to pass in
	param {JSON} data - any data to pass back
	*/
	structuralError:function(res,message="Error.Base Headers/Parameters not met",data={}){
		res.json({code: -1, message: message, data: data});
	},
	/* HTTP response when there is a simple issue with the HTTP request
	i.e. - the passed in recipe_id is incorrect
	param {Response} res - the http response variable
	param {String} message - the text to pass in
	param {JSON} data - any data to pass back
	*/
	simpleError:function(res,message="Invalid", data={}){
		res.json({code: 0, message: message, data: data});
	},
	/* HTTP response when there is a successful response to the HTTP request
	i.e. - a user comment has been recorded
	param {Response} res - the http response variable
	param {String} message - the text to pass in
	param {JSON} data - any data to pass back
	*/
	validResponse:function(res, message="Valid", data={}){
		res.json({code: 1, message: message, data: data});
	},
	/* Reponse Handler for calling appropriate response method
	param {Reponse} res - the http response variable
	param {structuralError} struct - strong error function
	param {simpleError} simple - simple error function
	param {callback} - successful route function
	*/
	handleErrors:function(res,struct,simple, callback){
		if(struct){
			module.exports.structuralError(res,struct)
		}
		else if(simple){
			module.exports.simpleError(res, simple)
		}
		else{
			callback()
		}
	},
};

var fs = require('fs');
var mysql = require('mysql');

//Connection to HerokuDB

module.exports = {
	getPool: function () {
		var creds = {};
		var data = fs.readFileSync("creds.r", 'utf-8');
		creds = JSON.parse(data);

		var connectionPool = mysql.createPool(creds);
		return connectionPool;
	},
};
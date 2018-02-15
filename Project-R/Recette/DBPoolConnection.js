var mysql = require('mysql');

//Connection to HerokuDB
var connectionPool = mysql.createPool({
	host: 'us-cdbr-iron-east-05.cleardb.net',
  user: 'bd3873c3be4cfe',
  password: '50713e21',
  database: 'heroku_c7d7094d02a13d7'
});

module.exports = {
	getPool: function () {
			return connectionPool;
	}
};
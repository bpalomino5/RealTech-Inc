var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mysql = require('mysql');

var app = express();

app.set('port', (process.env.PORT || 3001));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}
else {
	//else running local development use local server for now
	var con = mysql.createPool({
	  host: 'localhost',
	  user: 'root',
	  password: 'root',
	  database: 'Recette'
	});
}

//support parsing of application/json type post data
// app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
// app.use(bodyParser.urlencoded({extended:false}));

//static path
// app.use(express.static(path.join(__dirname, 'public')));

// const con = mysql.createConnection({
//   //setup up like this b/c of brew, need to change
//   host: 'localhost',
//   user: 'root',
//   password: 'root',
//   database: 'Recette'
// });

<<<<<<< HEAD
var con = mysql.createPool({
  host: 'us-cdbr-iron-east-05.cleardb.net',
  user: 'bd3873c3be4cfe',
  password: '50713e21',
  database: 'heroku_c7d7094d02a13d7'
});

=======
// var con = mysql.createPool({
//   host: 'us-cdbr-iron-east-05.cleardb.net',
//   user: 'bd3873c3be4cfe',
//   password: '50713e21',
//   database: 'heroku_c7d7094d02a13d7'
// });
>>>>>>> 729f0dba30c42c7e77776879c89e5dba7e75392c

// con.connect((err) => {
//   if(err){
//     console.log('Error connecting to Db');
//     return;
//   }
//   console.log('Connection established');
//  //  con.query('SELECT * FROM recipes', (err,rows) => {
// 	//   if(err) throw err;

// 	//   console.log('Data received from Db:\n');
// 	//   rows.forEach( (row) => {
// 	//     console.log(row.name);
// 	//   });
// 	// });
// });

function getRecipes(callback) {
	var recipes = [];
	con.query('SELECT * FROM recipes', (err,rows) => {
	  if(err) throw err;

	  // console.log('Data received from Db:\n');
	  rows.forEach( (row) => {
	  	recipes.push({
			name: row.name,
			image: row.image_location
		});
	  });
	  callback(recipes);
	});
};

function insertRecipe ()
{
	var sql = "INSERT INTO recipes (name, cooking_time, image_location, origin_id, prep) VALUES ("Enchiladas")";
	con.query(sql, (err, result) )
	
}

app.get

// process.on('SIGINT', function(){
// 	console.log('killing connection');
// 	con.release((err) => {
//   	// The connection is terminated gracefully
//   	// Ensures all previously enqueued queries are still
//   	// before sending a COM_QUIT packet to the MySQL server.
// 	});
// 	process.exit();
// });

app.get('/getRecipes', function(req,res){
	getRecipes(function(recipes){
		res.send({recipes: recipes});
	});
	// res.send('Hello world');
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
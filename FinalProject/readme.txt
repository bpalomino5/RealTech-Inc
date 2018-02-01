Instructions to run project so far

1) Go to root of project directory
	 $ cd Recette-Sample

2) install all libraries needed via npm
	 $ npm install
	 $ cd client && npm install

3) To run everything well (needs unix terminal to work, not windows friendly right now) at project root run:
	 $ npm start



## OLD
1) Open two terminal screens/tabs

In screen one:
2) cd Server
	 npm start

- this will start bare node js server that sends out Hello World

In screen two:
3) cd Recette-Web-App
	 node app.js

- this will fire up the node js app which uses axios http request tool to make a GET request to server
- and prints out Hello World to console

/**
 * Admin Application
 * Version 1.0
 */

/**
 * Load path and get the base path of the application
 */
var _corepath = require('path').resolve(__dirname, '../../');

/**
 * Require Dependancies
 */
var Express 	= require('express');
var Path 		= require('path');
var Config 		= require(_corepath + '/config.js');
var Database 	= require(_corepath + '/system/database.js');

/**
 * Instantiate a new server instance
 */
var Application = module.exports = Express.createServer();

/**
 * make sure the admin application is from within the admin path
 */
Application.route = '/admin';

/**
 * Configure the admin application
 */
Application.configure(function(){
	/**
	 * Set the application view directory
	 */
	Application.set('views', __dirname + '/templates/' + Config.application.theme);

	/**
	 * Use jade as a template engine
	 */
	Application.set('view engine', 'jade');

	/**
	 * Setup both internal and theme static routers
	 */
	Application.use(Express.static(Path.normalize(__dirname + '/public')));
});

Application.get("*", function(req, res, next){
	next();
})

Application.get('/admin/', function(req, res){
	res.send("Welcome to your administration panel")
})
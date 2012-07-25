/**
 * Blog Application
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
var Installer 	= require('./installer');

/**
 * Create the application for the blog
 */
var Application = module.exports = Express.createServer();

/**
 * Set the path of the application to the root of the site
 */
Application.route = '/';

/**
 * Configure the blog application
 */
Application.configure(function(){
	/**
	 * Set the application view directory
	 */
	Application.set('views', __dirname + '/themes/' + Config.application.theme);

	/**
	 * Use jade as a template engine, this maybe changed via a theme package at
	 * a later date.
	 */
	Application.set('view engine', 'jade');

	/**
	 * Setup the static path
	 */
	Application.use(Express.static(Path.normalize(__dirname + '/themes/' + Config.application.theme + "/public")));
});

Application.all('/', require('./routes/homepage'));
Application.all('/:slug', require('./routes/entity'));

/**
 * Export the application to the parent
 */
module.exports = Application;
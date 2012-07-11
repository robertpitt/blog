/**
 * 
 */

/**
 * Require Dependancies
 */
var Express 	= require('express');
var Config 		= require('../config.js');
var Database 	= require('./database.js');
var Routes 		= require('./routes/');
var Installer 	= require('./installer.js');

/**
 * Instantiate a new server instance
 */
var Application = module.exports = Express.createServer();

/**
 * Configure the server
 */
Application.configure(function(){
	/**
	 * Set the application view directory
	 */
	Application.set('views', __dirname + '/../themes/' + Config.application.theme);

	/**
	 * Use jade as a template engine, this maybe changed via a theme package at
	 * a later date.
	 */
	Application.set('view engine', 'jade');

	/**
	 * Cookie Parser is required for the sessions
	 */
	Application.use(Express.cookieParser());

	/**
	 * Body Parser is required to parse POST request
	 */
	Application.use(Express.bodyParser());

	/**
	 * Allows the server to behave like a restful api
	 */
	Application.use(Express.methodOverride());

	/**
	 * We set the public static directory from within the theme
	 */
	Application.use(Express.static(__dirname + '/../themes/' + Config.application.theme + "/public"));

	/**
	 * Use our session model as middleware
	 */
	Application.use(Express.session({
		store : Database.model("Session"),
		secret : Config.session.secret,
		key : Config.session.key
	}));

	/**
	 * Use the router for obvius reasons
	 */
	Application.use(Application.router);

	/**
	 * Use custom helpers to expose data to templates
	 */
	Application.dynamicHelpers({
		_session : function(req){return req.session;},
		_config : function(){return Config.application},
		_user : function(req){
		}
	});
});

/**
 * Configure development
 */
Application.configure('development', function(){
	Application.use(Express.errorHandler({
		dumpExceptions: true,
		showStack: true
	}));
});

/**
 * Configure production
 */
Application.configure('production', function(){
	Application.use(Express.errorHandler());
});

/**
 * Push the routes into the application
 */
for(var i = 0; i < Routes.length; i++)
{
	var method = Routes[i][0];
	var selector = Routes[i][1];
	var callback = Routes[i][2];

	/**
	 * Call the method passing in the required data
	 */
	Application[method](selector, callback);
}

/**
 * Start listening
 */
Application.listen(Config.server.port || 3000, function(){
	console.log("Blog server listening on port (%s)", Application.address().port);
});
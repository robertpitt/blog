/**
 * Nodepress
 */

/**
 * Require Dependancies
 */
var Express 	= require('express');
var Path 		= require('path');
var Config 		= require('../config.js');
var Database 	= require('./database.js');
var Routes 		= require('./routes/');
var Middleware	= require('./middleware/');
var Auth	 	= require('./auth.js');
var Installer 	= require('./installer.js');

console.log("Installation OK!");

/**
 * Load the Database plugins
 */
require('./database/plugins/');

/**
 * Instantiate a new server instance
 */
var Application = module.exports = Express.createServer();

/**
 * Configure the server
 */
Application.configure(function(){
	/**
	 * Assign the database to the application for modules, plugins etc.
	 */
	Application.Database = Database;

	/**
	 * Assign the configuration to the Application for modules, plugins etc.
	 */
	Application.Config = Config;

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
	Application.use(Express.cookieParser(Config.session.secret));

	/**
	 * Body Parser is required to parse POST request
	 */
	Application.use(Express.bodyParser());

	/**
	 * Setup both internal and theme static routers
	 */
	Application.use(Express.static(Path.normalize(__dirname + '/../public/')));
	Application.use(Express.static(Path.normalize(__dirname + '/../themes/' + Config.application.theme + "/public")));

	/**
	 * Use our session model as middleware
	 */
	Application.use(Express.session({
		store 	: Database.model("Session"),
		key 	: Config.session.key,
		secret  : Config.session.secret // Geilt Added this <- Was Missing, Blog wouldnt Start.

	}));

	/**
	 * Make sure the database is available for every connections
	 */
	Application.use(function(req, res, next){
		if(Database.connection.readyState != 1)
		{
			next("Database has not initialized", 500)
			return;
		}

		next(null, null)
	});

	/**
	 * Assign CSRF Middleware
	 */
	Application.use(Express.csrf());

	/**
	 * Bind authentication library
	 */
	Application.use(Auth.middleware());

	/**
	 * Aassign all middle ware
	 */
	Middleware.map(function(m){
		Application.use.call(Application, m());
	});

	/**
	 * Use custom helpers to expose data to templates
	 */
	Application.use(function(req, res, next){
		res.locals._session = req.session;
		res.locals._config = Config.application;
		res.locals._user = req.user;
		res.locals._csrf = req.session._csrf;
		next();
	});

	/**
	 * Use the router for obvius reasons
	 */
	Application.use(Application.router);
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
 * Start the server once the DB is connected
 */
Database.connection.on("open", function(){
	console.log("Database connected on port (%s)", Database.connection.port);

	Application.listen(Config.server.port || 3000, function(){
		console.log("Blog server listening on port (%s)", Config.server.port || 3000);
	});
});
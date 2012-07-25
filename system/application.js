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
var Database 	= require('./database.js');
var Middleware	= require('./middleware/');
var Auth	 	= require('./auth.js');

/**
 * Instantiate a new server instance
 */
var globalApplication = module.exports = Express.createServer();

/**
 * Configure the main server application
 */
globalApplication.configure(function(){
	/**
	 * Assign the database to the application for modules, plugins etc.
	 */
	globalApplication.Database = Database;

	/**
	 * Assign the configuration to the Application for modules, plugins etc.
	 */
	globalApplication.Config = Config;

	/**
	 * Cookie Parser is required for the sessions
	 */
	globalApplication.use(Express.cookieParser(Config.session.secret));

	/**
	 * Body Parser is required to parse POST request
	 */
	globalApplication.use(Express.bodyParser());

	/**
	 * Use our session model as middleware
	 */
	globalApplication.use(Express.session({
		store 	: Database.model("Session"),
		key 	: Config.session.key
	}));

	/**
	 * Assign CSRF Middleware
	 */
	globalApplication.use(Express.csrf());

	/**
	 * Bind authentication library
	 */
	globalApplication.use(Auth.middleware());

	/**
	 * Aassign all middle ware
	 */
	Middleware.map(function(m){
		globalApplication.use.call(globalApplication, m());
	});

	/**
	 * Use custom helpers to expose data to templates
	 */
	globalApplication.use(function(req, res, next){
		res.locals._session = req.session;
		res.locals._config = Config.application;
		res.locals._user = req.user;
		res.locals._csrf = req.session._csrf;
		next();
	});

	/**
	 * Use the router for obvius reasons
	 */
	globalApplication.use(globalApplication.router);
});

/**
 * Configure development
 */
globalApplication.configure('development', function(){
	globalApplication.use(Express.errorHandler({
		dumpExceptions: true,
		showStack: true
	}));
});

/**
 * Configure production
 */
globalApplication.configure('production', function(){
	globalApplication.use(Express.errorHandler());
});

require('../applications/').forEach(function(app, i){
	globalApplication.use(app.route, app);
});


/**
 * Start the server once the DB is connected
 */
Database.connection.on("open", function(){
	console.log("Database connected on port (%s)", Database.connection.port);

	globalApplication.listen(Config.server.port || 3000, function(){
		console.log("Blog server listening on port (%s)", Config.server.port || 3000);
	});
});
/**
 * 
 */

/**
 * Application Configuration
 */
exports.application = {
	base_path 	: '//nodes.robertpitt.me/',
	theme 		: "defualt"
};

/**
 * Session Configuration
 * @see https://github.com/senchalabs/connect/blob/master/lib/middleware/session.js#L46
 */
exports.session = {
	key 	: "_session_",
	secret 	: "SECRET_HASH_HERE",
	maxAge 	: 3600,
	cookie 	: {
		path 	: '/',
		secure 	: false,
		httpOnly: true,
		maxAge 	: null
	},
	proxy : false
}

/**
 * Server Configuration
 */
exports.server = {
	port 		: 3000
};

/**
 * Database (MongoDB) Configuration
 */
exports.mongo = {
	dns : 'mongodb://localhost/blog'
};
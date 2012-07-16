/**
 * NodePress
 */

/**
 * Application Settings
 */
exports.application = {};

/**
 * Basepath,  the root of your site
 * e.g. http://domain.com/blog
 * Note: Ending slash required
 */
exports.application.base_path = "//nodes.robertpitt.me/";

/**
 * Theme Folder
 */
exports.application.theme = "default";

/**
 * Session Settings
 */
exports.session = {};

/**
 * Session key, the identifier for the cookie
 */
exports.session.key = "_session_";

/**
 * Session Secret, this is required for hashing the cookie data
 */
exports.session.secret = "SECRET_HASH_HERE";

/**
 * Session MAX_AGE, how long should the cookie last before expiring
 * Note: Units are in seconds
 */
exports.session.maxAge = 3600;

/**
 * Allow the blog to run behind a proxy
 */
exports.session.proxy = false;

/**
 * Cookie Params
 */
exports.session.cookie = {
	path 	: '/',
	secure 	: false,
	httpOnly: true,
	maxAge 	: null
};

/**
 * Server Configuration
 */
exports.server = {};

/**
 * Default listening port
 */
exports.port = 3000;

/**
 * Database (MongoDB) Configuration
 */
exports.mongo = {};

/**
 * DNS of the database, examples follow
 * A: mongodb://localhost/blog
 * B: mongodb://usernameyy:password@localhost/blog
 */
exports.mongo.dns = "mongodb://localhost/blog"
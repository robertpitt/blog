/**
 * 
 */
module.exports = [];

/**
 * Load Dependancies
 */
var Database = require('../database.js');

var redrectRoot = function(req, res){
	res.redirect('/');
}

var indexHandler = function(req, res, next){
	/**
	 * Create an object that we use to set the template data to.
	 */
	var templateData = {
		layout : 'blog/layout.jade'
	};

	/**
	 * Create a new query object for the Post Collections
	 */
	var postQuery = Database.model("Post").find({});

	/**
	 * Pull in the categories
	 */
	postQuery.populate('category');

	/**
	 * Pull in the owner object, but only specified data for security
	 */
	postQuery.populate('owner', ['displayName', 'username']);

	/**
	 * pagination
	 */
	var limit = 5;
	var page = parseInt(req.param("page")) > 0 ? parseInt(req.param("page")) : 1;
	var skip = (page * limit) - limit;
	postQuery.skip(skip).limit(5);

	/**
	 * Order by published
	 */
	postQuery.sort('published', -1);

	/**
	 * Check for category
	 */
	if(req.param('category'))
	{
		/**
		 * @todo : this currently does not work, need to speak to
		 * Guillermo Ranch to see if we can search embedded documents.
		 */
		//postQuery.where('category.slug').equals(req.param('category'));
	}
	
	/**
	 * Execute the query
	 */
	postQuery.exec(function(err, result){
		if(err) throw err;

		/**
		 * Assign the results to the 
		 */
		templateData.posts = result;
		res.render("blog", templateData);
	});
}
/**
 * Compile index base routes
 */
//Redirects
module.exports.push(["get", "/page/?", redrectRoot]);
module.exports.push(["get", "/category/?", redrectRoot]);

//Actual Routes
module.exports.push(["get", "/", indexHandler]);
module.exports.push(["get", "/page/:page/?", indexHandler]);
module.exports.push(["get", "/category/:category/?", indexHandler]);
module.exports.push(["get", "/category/:category/:page/?", indexHandler]);
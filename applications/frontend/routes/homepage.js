/**
 * Nodepress
 * Blog Homepage Route
 */

/**
 * Get the base path of the system
 */
var _corepath = require('path').resolve(__dirname, '../../../');

/**
 * Require Dependancies
 */
var Database = require(_corepath + '/system/database.js');

/**
 * Export the route
 */
module.exports = function(req, res, next){
	/**
	 * Compiles and Displays the homepage
	 * paginated Posts
	 */
	Database.model("Type").find({slug : 'post'}, function(err, _type){
		if(err) throw err;

		/**
		 * Load the post by type
		 */
		var _posts = Database.model('Entity').find({'type._id' : _type._id});

		/**
		 * Populate references
		 */
		_posts.populate('author', ['displayName']).populate('terms').populate('type');
		_posts.exec(function(err, entities){
			res.render("index", {entities : entities});
		});
	});
}
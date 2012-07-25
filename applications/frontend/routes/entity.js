/**
 * Nodepress
 * Entity Veiwer
 */

/**
 * Get the base path of the system
 */
var _corepath = require('path').resolve(__dirname, '../../../');

/**
 * Require Dependancies
 */
var Database = require(_corepath + '/system/database');

/**
 * Display post method
 */
function displayPost(req, res, next, id)
{
	Database.model('Entity').findById(id).populate('author').exec(function(err, entity){
		if(err) return next(err);

		/**
		 * If a post does not exist then display 404
		 */
		if(!entity) return next(404);

		/**
		 * Render the post template
		 */
		res.render('post', {entity : entity});
	});
}
/**
 * Export the route
 */
module.exports = function(req, res, next)
{
	/**
	 * Get the params from the request
	 */
	var slug = req.param('slug', '');

	/**
	 * Fetch teh types from the database that dont have a slug
	 */
	Database.model("Type").find({slug : ''}).exec(function(err, typeDocs){
		if(err) return next(err);

		/**
		 * If we do not have any Types check the Taxonomies
		 */
		if(!typeDocs)
		{
			Database.model('Taxonomy').find({path : false}, function(err, taxonomies){
				if(err) return next(err);
				if(docs)
				{
					console.log("@ Found Taxonomy with path 0");
					taxonomies.populate('terms').where({'terms.path' : true}).exec(function(err, taxonomies){
						if(err) return next(err);

						console.log("@ Got taxonomies where terms.path = 1", taxonomies.length);
						Database.model('Entity').find({term : taxonomies.term}, function(err, posts){
							if(err) return next(err);

							console.log("@ Found a total of (%d) where slug = ");
							posts.populate('type').where({'type.slug' : ''}).exec(function(err, posts){
								if(err) return next(err);
							});
						});
					});
					return;
				}
			});
			return;
		}

		/**
		 * Check for posts that match the slug
		 */
		if(typeDocs)
		{
			Database.model('Entity').find({slug : slug}, ['_id'], function(err, post){
				if(err) return next(err);
				return post[0] ? displayPost(req, res, next, post[0]._id) : next(404);
			})
		}
	});
}
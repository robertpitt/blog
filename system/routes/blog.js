/**
 * 
 */
module.exports = [];

/**
 * Load Dependancies
 */
var Database = require('../database.js');

/**
 * Display homepage
 */
var displayHomepage = function(req, res, next){
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
		_posts.exec(function(err, docs){
			res.render("blog", {posts : docs});
		});
	});
}

/**
 * Display post
 */
function displayPost(req, res, next, postObject)
{
	console.log(">> Displaying Post (%s)", postObject._id);

	/**
	 * The post page requires the extra data so we
	 * need to populate that data before showing the results
	 */
	postObject.populate('author').exec(function(err, postObject){
		if(err) return next(err);

		res.render('blog/post', {
			post : postObject
		});
	});
}

var determineEntity = function(req, res, next)
{
	/**
	 * Get the params from the request
	 */
	var _entity = req.param('entity', '');

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
					//console.log("@ Found Taxonomy with path 0");
					taxonomies.populate('terms').where({'terms.path' : true}).exec(function(err, taxonomies){
						if(err) return next(err);

						//console.log("@ Got taxonomies where terms.path = 1", taxonomies.length);
						Database.model('Post').find({term : taxonomies.term}, function(err, posts){
							if(err) return next(err);
							//console.log("@ Found a total of (%d) where slug = ");
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
			Database.model('Post').findOne({slug : _entity}, function(err, post){
				if(err) return next(err);
				return post ? displayPost(req, res, next, post) : next(404);
			})
		}
	});
}

/**
 * Compile index base routes
 */
module.exports.push(["get", "/", displayHomepage]);
module.exports.push(["get", "/:entity", determineEntity]);
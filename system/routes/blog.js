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

var determineEntity = function(req, res, next)
{
	var _entity = req.param('entity', '');
	console.log("@ Determine Entity");

	Database.model("Type").find({slug : ''}).exec(function(err, typeDocs){
		if(err) return next(err);
		if(typeDocs)
		{
			console.log("@ Found blank type (%s)", typeDocs.length);
			/**
			 * fetch posts where slug = /*entity*
			 */
			Database.model('Entity').findOne({slug : _entity}, function(err, post){
				if(err) return next(err);
				if(post)
				{
					console.log("@ Found document (%s)", post.slug);
					next();
					return;
				}

				console.log("@ Unable to locate documents for (%s)", _entity);
				next(404);
			});
			return;
		}

		console.log("@ Checking Terms with blank type slug and Taxonomy with path 0");
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

					return;

				});

			}
		});
		req._entity = docs
	});
}

var indexHandler = function(req, res, next){
	/**
	 * Testcase
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
		})
	});
	
	/**
	 * Create a filter object to query the DB with
	 */
	var queryfilters = {};

	/**
	 * Create an object that we use to set the template data to.
	 */
	var templateData = {};

	/**
	 * Create a post ojbect
	 */
	var postQuery = Database.model("Entity").find({status: "published"}, function(){
	});
	console.log('At Entity');

	postQuery.populate('type');
	postQuery.populate('terms');
	postQuery.populate('type.taxonomies', ["slug"]);
	
	/**
	 * Pull in the owner object, but only specified data for security
	 */
	postQuery.populate('author', ['displayName', 'username']);

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
}
/**
 * Compile index base routes
 */
module.exports.push(["get", "/", indexHandler]);
module.exports.push(["get", "/:entity", determineEntity]);
module.exports.push(["get", "/*", indexHandler]);
/**
 * Installation Script
 * If this is the first time the system is executed
 */

/**
 * Load Dependancies
 */
var Database = require('./database.js');

/**
 * Fetch required models
 */
var ConfigModel 	= Database.model("Config");
var UserModel		= Database.model("User");
var EntityModel		= Database.model("Entity");
var CategoryModel	= Database.model("Category");
var TypeModel		= Database.model("Type");
var TaxonomyModel	= Database.model("Taxonomy");
var TermModel		= Database.model("Term");

/**
 * Check installation key
 */
ConfigModel.get('installed', function(err, doc){
	if(err){ throw err;}

	/**
	 * If the doc exists then the system has already been installed
	 */
	if(doc)
	{
		return;
	}

	/**
	 * Start the installation of the database
	 */
	console.log(">> Running installation operations");

	/**
	 * Create the users data
	 */
	var admin = new UserModel({
		displayName : "Adminsitrator",
		username 	: "admin",
		email 		: "admin@localhost.com",
		password 	: "changeme",
		role 		: "super"
	}).save(function(err, adminAccount){
		if(err){throw err;}
		console.log(">> Administration account created. (username: admin, password: changeme)");

		/**
		 * Create the types
		 */
		new TypeModel({name : 'Post',title : 'Post',slug : 'post',description : 'All posts',content : ''}).save(function(err,entityType){
			if(err) throw err;

			/**
			 * Create the Taxonomy
			 */
			new TaxonomyModel({
				name : 'Category',title : 'Category',slug : 'category',description : 'All Categories'
			}).save(function(err, entityTaxonomy){
				if(err) throw err;

				console.log(">> Created entity types");
				entityType.taxonomies.push(entityTaxonomy);
				entityType.save(function(err, entityType){
					console.log(">> Pushed entity taxonomy into entityType")

					/**
					 * Create the term
					 */
					new TermModel({
						name : 'Uncategorised',
						title : 'Uncategorised',
						slug : 'uncategorised',
						description : 'Uncategorised'
					}).save(function(err, entityTerm){
						if(err) throw err;

						console.log(">> Terms created")

						entityTaxonomy.terms.push(entityTerm);
						entityTaxonomy.save(function(err, entityTaxonomy){
							console.log(">> Terms pushed to Taxonomy");

							new EntityModel({
								name : "Welcome to your new blog",
								title : "Welcome to your new blog",
								content : "This is some sample content",
								slug : "welcome-to-your-new-blog",
								description : "Description for welcome to your new blog",
								terms : [entityTerm],
								type : entityType,
								status : 'published',
								author : adminAccount,
							}).save(function(err, entityObject){
								if(err) throw err;
								console.log(">> Sample entity has been created");
								ConfigModel.set('installed', 'true', function(){
									console.log(">> Installation of database has completed");
								});
							})
						});
					});
				});
			});
		});
	});
});
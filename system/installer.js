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
var ConfigModel = Database.model("Config");
var UserModel	= Database.model("User");
var PostModel	= Database.model("Post");
var CategoryModel	= Database.model("Category");

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
		 * Insert the Uncategorised category
		 */
		new CategoryModel({slug: 'uncategorised', title: 'Uncategorised'}).save(function(err, cat){
			if(err){throw err;}
			console.log(">> Categories have been created");

			/**
			 * Create the sample post
			 */
			new PostModel({
				title : "Welcome to your new blog",
				content : "This is some sample content",
				category : cat,
				owner : adminAccount
			}).save(function(err, post){
				if(err){throw err;}

				console.log(">> Sample content has been created.");
				/**
				 * 
				 */
				ConfigModel.set('installed', 'true', function(){
					console.log(">> Installation of database has completed");
				})
			})
		})
	});
});
/**
 * 
 */

/**
 * Require Dependancies
 */
var Database = require('../database.js')

/**
 * Create Users
 */
var createUsers = function(callback)
{
	/**
	 * Fetch the user object
	 */
	var User = Database.model("User");

	/**
	 * Instantiate a new admin row
	 */
	var admin = new User({
		displayName : "Adminsitrator",
		username 	: "admin",
		email 		: "admin@localhost.com",
		password 	: "changeme"
	});
	
	admin.save(callback);
}

/**
 * Create Users
 */
var createSamplePost = function(callback)
{
	callback();
}

/**
 * Export the runner function
 */
exports.run = function(callback)
{
	//Push Users
	createUsers(function(){

		//Sample Content
		createSamplePost(function(){

			//Fire callback
			callback();
		})
	})
}
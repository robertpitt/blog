/**
 * Nodepress
 * Mongoose Plugin (Paginate)
 */

/**
 * Require the Database
 */
var Database = require("../../database.js");

/**
 * Create a noop
 */
var Noop = function(){}

/**
 * Generate the plugin
 */
Database.Model.paginate = function(query, currentPage, resultsPerPage, callback)
{
	/**
	 * Noop the callback
	 */
	var callback = callback || Noop;

	/**
	 * Calculate the offset
	 */
	var offset = (currentPage * resultsPerPage) - resultsPerPage;

	/**
	 * Create the query object
	 */
	var Query = this.find(query).skip(offset).limit(resultsPerPage);

	/**
	 * Execute the query
	 */
	Query.exec(function(error, results){
		if(error) return callback(error, null, null);

		/**
		 * Get the count of entities in the database
		 */
		this.count({}, function(error, count){
			if(error) return callback(err, null, null);

			/**
			 * Now we have all required information call the callback passing
			 * the information back
			 */
			callback(null, results, Math.floor(count / resultsPerPage), count)
		})
	}.bind(this));
}
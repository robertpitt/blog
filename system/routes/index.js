/**
 * 
 */

/**
 * Require Dependancies
 */
var Fs = require('fs');

/**
 * Create an empty stack for the routes
 */
module.exports = [];

/**
 * Read the current directory filenames
 */
var routes = Fs.readdirSync(__dirname);

/**
 * Loop directory contents and load modules
 */
routes.forEach(function(cur, idx){
	if(cur == 'index.js')
	{
		return;
	}


	/**
	 * Get the stat of the file for directory testing
	 */
	var Stat = Fs.statSync(__dirname + "/" + cur);
	if(Stat.isDirectory())
	{
		return;
	}

	/**
	 * Load the route lists into a tmp container
	 */
	var tmp = require("./" + cur);

	/**
	 * Loop the routers into the exports
	 */
	for(var i = 0; i < tmp.length; i++)
	{
		module.exports.push(tmp[i]);
	}
});
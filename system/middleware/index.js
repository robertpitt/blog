/**
 * Nodepress
 */

/**
 * Require Dependancies
 */
var Fs = require('fs');

/**
 * Create an empty stack for the modules
 */
module.exports = [];

/**
 * Read the current directory filenames
 */
var middlewares = Fs.readdirSync(__dirname);

/**
 * Loop directory contents and load modules
 */
middlewares.forEach(function(cur, idx){
	if(cur == 'index.js')
	{
		return;
	}

	/**
	 * Get the stat of the file for directory testing
	 */
	var Stat = Fs.statSync(__dirname + "/" + cur);

	/**
	 * Allow for sub-folder modules
	 */
	if(Stat.isDirectory())
	{
		return;
	}

	/**
	 * Push the module into the exports
	 */
	module.exports.push(require("./" + cur));
});
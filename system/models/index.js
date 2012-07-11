/**
 * 
 */

/**
 * Require Dependancies
 */
var Fs = require('fs');

/**
 * Create an empty stack for the models
 */
module.exports = {};

/**
 * Read the current directory filenames
 */
var models = Fs.readdirSync(__dirname);

/**
 * Loop directory contents and load modules
 */
models.forEach(function(cur, idx){
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
	 * Load the model into a temp object
	 */
	var tmp = require("./" + cur);
	module.exports[tmp.modelName] = tmp;
});
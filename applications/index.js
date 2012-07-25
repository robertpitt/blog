/**
 * Application Loaders
 */

/**
 * Load Dependancies
 */
var Fs = require("fs")

/**
 * Create an export array
 */
module.exports = [];

/**
 * Scan the local directory
 */
Fs.readdirSync(__dirname).forEach(function(folder){
	/**
	 * Make sure it's not a directory
	 */
	if(!Fs.statSync(__dirname + "/" + folder).isDirectory()) return;

	/**
	 * Load the fole
	 */
	module.exports.push(require("./" + folder + "/application.js"));
});
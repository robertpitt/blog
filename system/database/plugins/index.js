/**
 * Nodepress
 * Directory Autoloader
 */

/**
 * Load Dependancies
 */
var Fs = require("fs")

/**
 * Scan the local directory
 */
Fs.readdirSync(__dirname).forEach(function(file){
	/**
	 * Skip the current file
	 */
	if(file == "index.js") return;

	/**
	 * Make sure it's not a directory
	 */
	if(Fs.statSync(__dirname + "/" + file).isDirectory()) return;

	/**
	 * Load the fole
	 */
	require("./" + file);
})
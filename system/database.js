/**
 * 
 */

/**
 * Require Dependancies
 */
var Mongoose 	= require('mongoose');
var Models 		= require('./models/');
var Config 		= require('../config.js');

/**
 * Instantiate
 */
module.exports = Mongoose.connect(Config.mongo.dns, function(err){
	if(err)
	{
		console.error("Error: (%s)", err.message);
		process.exit();
	}
});


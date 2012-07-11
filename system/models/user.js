/**
 * 
 */

/**
 * Require Dependancies
 */
var Mongoose = require('mongoose'),
	ObjectId = Mongoose.ObjectId;

/**
 * Create the Model
 */
var User = new Mongoose.Schema({
	displayName : {type : String},
	username 	: {type : String, index: { unique: true }},
	email 		: {type : String},
	password 	: {type : String},
	hash 		: {type : String}
});

/**
 * Export to Mongoose and module
 */
module.exports = Mongoose.model('User', User);
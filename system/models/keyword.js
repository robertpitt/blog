/**
 * 
 */

/**
 * Require Dependancies
 */
var Mongoose 	= require('mongoose'),
	ObjectId 	= Mongoose.Schema.ObjectId;

/**
 * Create the Model
 */
var Keyword = new Mongoose.Schema({
	keyword		: {type : String, required : true, lowercase : true}
});

/**
 * Export to Mongoose and module
 */
module.exports = Mongoose.model('Keyword', Keyword);
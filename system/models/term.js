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
var Term = new Mongoose.Schema({
	name 		: {type : String, required : true},
	plural		: {type : String},
	title 		: {type : String},
	slug 		: {type : String, required : true, lowercase: true},
	description	: {type : String},
	path 		: {type: Boolean, default : true},
	keywords 	: [{type : ObjectId, ref : 'Keyword'}],
	content 	: {type : String},
	order		: {type : Number, default : 0}
});

/**
 * Export to Mongoose and module
 */
module.exports = Mongoose.model('Term', Term);
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
var Type = new Mongoose.Schema({
	name 		: {type : String, required : true},
	title 		: {type : String, required : true},
	slug 		: {type : String, required : true, lowercase: true},
	description	: {type : String, required : true},
	keywords 	: [{type : ObjectId, ref : 'Keyword'}],
	content 	: {type : String, required : true},
	taxonomies	: [{type : ObjectId, ref : 'Taxonomies'}]
	order		: {type: Number, default : 0}
});

/**
 * Export to Mongoose and module
 */
module.exports = Mongoose.model('Type', Type);
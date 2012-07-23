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
	name 		: {type 	: String, required : true},
	title 		: {type 	: String},
	slug 		: {type 	: String, required : true, lowercase: true, unique : {index : false}},
	description	: {type 	: String},
	content 	: {type 	: String},
	order		: {type 	: Number, default : 0},
	keywords 	: [{type 	: ObjectId, ref : 'Keyword'}],
	taxonomies	: [{type 	: ObjectId, ref : 'Taxonomy'}]
});

/**
 * Export to Mongoose and module
 */
module.exports = Mongoose.model('Type', Type);
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
	content		: {type : String},
	parent		: {type : ObjectId, ref : 'Term'},
	path 		: {type: Boolean, default : true},
	properties	: [{
		key		: { type : String, required: true, unique : {index: true} },
		value	: { type : String }
	}],
	keywords 	: [{type : ObjectId, ref : 'Keyword'}],
	order		: {type : Number, default : 0}
});

/**
 * Export to Mongoose and module
 */
module.exports = Mongoose.model('Term', Term);
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
	plural		: {type 	: String},
	title 		: {type 	: String},
	slug 		: {type 	: String, required : true, lowercase: true, unique : {index : false}},
	description	: {type 	: String},
	content 	: {type 	: String},
	path 		: {type: Boolean, default : true},
	properties	: [{
		key		: { type : String, required: true, unique : {index: true} },
		value	: { type : String }
	}],
	keywords 	: [{type 	: ObjectId, ref : 'Keyword'}],
	terms		: [{type 	: ObjectId, ref : 'Terms'}],
	order		: {type 	: Number, default : 0}
});

/**
 * Export to Mongoose and module
 */
module.exports = Mongoose.model('Type', Type);
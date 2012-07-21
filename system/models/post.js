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
var Post = new Mongoose.Schema({
	name 		: {type : String, required : true},
	author 		: {type  : ObjectId, ref : 'User'},
	title 		: {type : String, required : true},
	slug 		: {type : String, required : true, lowercase: true},
	description	: {type : String, required : true},
	keywords 	: {type : String,  required : true, lowercase: true},
	content 	: {type : String, required : true},
	excerpt		: {type : String, required : false},
	status		: {type : String, enum : ['published', 'draft', 'private'], default: 'draft'},
	created 	: {type : Date, default: Date.now},
	published 	: {type : Date, default: Date.now},
	modified 	: {type : Date, default: Date.now},
	categories 	: [{type : ObjectId, ref : 'Category'}],
	comments 	: [{type : ObjectId, ref : 'Comment'}],
	views 		: {type: Number, default: 0}
});

/**
 * Export to Mongoose and module
 */
module.exports = Mongoose.model('Post', Post);
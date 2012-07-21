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
	keywords 	: [{type : ObjectId, ref : 'Keyword'}],
	content 	: {type : String, required : true},
	excerpt		: {type : String, required : false},
	status		: {type : String, enum : ['published', 'draft', 'private', 'protected'], default: 'draft'},
	password	: {type : String, required : false},
	created 	: {type : Date, default : Date.now},
	published 	: {type : Date, default : Date.now},
	modified 	: {type : Date, default : Date.now},
	parent		: {type : ObjectId, ref : 'Post'},
	type		: {type : ObjectId, ref : 'Type'},
	terms		: [{type : ObjectId, ref : 'Term'}],
	comments 	: [{type : ObjectId, ref : 'Comment'}],
	order		: {type : Number, default : 0},
	views 		: {type : Number, default : 0}
});

/**
 * Export to Mongoose and module
 */
module.exports = Mongoose.model('Post', Post);
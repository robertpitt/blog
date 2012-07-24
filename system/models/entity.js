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
var Entity = new Mongoose.Schema({
	name 		: {type : String, required : true},
	title 		: {type : String, required : true},
	slug 		: {type : String, required : true, lowercase: true},
	description	: {type : String, required : true},
	content 	: {type : String, required : true},
	author 		: {type  : ObjectId, ref : 'User'},
	keywords 	: [{type : ObjectId, ref : 'Keyword'}],
	excerpt		: {type : String},
	status		: {type : String, enum : ['published', 'draft', 'private', 'protected'], default: 'draft'},
	password	: {type : String},
	created 	: {type : Date, default : Date.now},
	modified 	: {type : Date, default : Date.now},
	published 	: {type : Date, default : ""},
	parent		: {type : ObjectId, ref : 'Post'},
	type		: {type : ObjectId, ref : 'Type'},
	taxonomies	: [{type : ObjectId, ref : 'Taxonomy'}],
	terms		: [{type : ObjectId, ref : 'Term'}],
	meta		: [{
		key		: { type : String, required: true },
		value	: { type : String } 
		}],
	comments 	: [{type : ObjectId, ref : 'Comment'}],
	order		: {type : Number, default : 0},
	views 		: {type : Number, default : 0}
});

/**
 * Export to Mongoose and module
 */
module.exports = Mongoose.model('Entity', Entity);
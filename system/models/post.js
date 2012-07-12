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
	title 		: {type : String, required : true},
	content 	: {type : String, required : true},
	published 	: {type : Date, default: Date.now},
	category 	: [{type : ObjectId, ref : 'Category'}],
	comments 	: [{type: ObjectId,	ref : 'Comment'}],
	owner 		: {type : ObjectId, ref : 'User'}
});

/**
 * Export to Mongoose and module
 */
module.exports = Mongoose.model('Post', Post);
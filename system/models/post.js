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
	author 		: {type  : ObjectId, ref : 'User'},
	title 		: {type : String, required : true},
	content 	: {type : String, required : true},
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
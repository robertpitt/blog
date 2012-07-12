/**
 * 
 */

/**
 * Require Dependancies
 */
var Mongoose 	= require('mongoose'),
	User 		= require('./user.js'),
	ObjectId 	= Mongoose.Schema.ObjectId;

/**
 * Create the Model
 */
var Comment = new Mongoose.Schema({
	title 		: {type: String},
	content 	: {type : String, required : true},
	published 	: {type : Date, default : Date.now},
	owner 		: {type: ObjectId, ref : 'User'}
});

/**
 * Export to Mongoose and module
 */
module.exports = Mongoose.model('Comment', Comment);
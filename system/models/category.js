/**
 * 
 */

/**
 * Require Dependancies
 */
var Mongoose 	= require('mongoose');

/**
 * Create the Model
 */
var Category = new Mongoose.Schema({
	slug 			: {type : String, required : true, unique : {index : true}},
	title 			: {type : String, required : true, unique : true},
	created 		: {type : Date, required : true, default : Date.now},
	last_modified 	: {type : Date, required : true, default : Date.now}
});

/**
 * Export to Mongoose and module
 */
module.exports = Mongoose.model('Category', Category);
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
	slug 	: {type : String, required : true, unique : {index : true}},
	title 	: {type : String, required : true, unique : true},
});

/**
 * Export to Mongoose and module
 */
module.exports = Mongoose.model('Category', Category);
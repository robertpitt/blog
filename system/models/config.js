/**
 * 
 */

/**
 * Require Dependancies
 */
var Mongoose = require('mongoose'),
	ObjectId = Mongoose.ObjectId;

/**
 * Create the Model
 */
var Config = new Mongoose.Schema({
    key  : {type : String, uppercase : true, trim : true, required 	: true},
    value : {type : String, default : ""}
});

/**
 * Export to Mongoose and module
 */
module.exports = Mongoose.model('Config', Config);
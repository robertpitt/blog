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
    key  	: {type : String, lowercase : true, required : true},
    value 	: {type : String, default : ""}
});

/**
 * Static Getter
 */
Config.statics.get = function(key, callback)
{
	this.findOne({key : key}, callback);
}

/**
 * Static Setter
 */
Config.statics.set = function(key, value, callback)
{
	this.update({key : key}, {value : value}, {upsert: true}, callback);
}

/**
 * Static Updater
 */
Config.statics.update = function(key, value, callback)
{
	Config.statics.set(key, value, callback);
}

/**
 * Export to Mongoose and module
 */
module.exports = Mongoose.model('Config', Config);
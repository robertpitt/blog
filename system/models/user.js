/**
 * Require Dependancies
 */
var Mongoose = require('mongoose'),
	Crypto = require('crypto')

/**
 * Helper function
 * Creates a hash from a plain-text password and salt
 */
var _createHashFromPassword = function(pt_passsword, salt)
{
	var hash = Crypto.createHash('sha256');
	hash.update(pt_passsword + salt);
	return hash.digest('hex');
}

/**
 * Create the Model
 */
var User = new Mongoose.Schema({
	displayName : {type : String, required : true},
	username 	: {type : String, index: { unique: true }},
	email 		: {type : String, required: true, validate : [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, "Email is not valid"]},
	password 	: {type : String, required : true},
	salt 		: {type : String}, /*Auto generated*/
	role 		: {type : String, enum : ['super', 'admin', 'editor', 'author', 'contributer', 'subscriber'], default: 'subscriber'}
});

/**
 * Login method
 */
User.statics.getUserByCredentials = function(username, password, callback)
{
	this.findOne({username : username}, function(err, user){
		if(err) return callback(err, null);

		/**
		 * We need to recompile the salt and check to see if it's a match
		 * @todo : is this secure enough?
		 */
		if(_createHashFromPassword(password, user.salt) == user.password)
		{
			return callback(null, user)
		}

		return callback(null, null);
	})
}


/**
 * pre-save method to generate hash
 */
User.pre('save', function (next) {
	var password = this.get("password");

	/**
	 * Only hash the account of the hash does not exists
	 */
	if(!this.salt)
	{
		/**
		 * Create a new random salt
		 */
		Crypto.randomBytes(32, function(ex, buf) {
			var salt = buf.toString('hex');

			/**
			 * Create the password from the salt
			 */
			this.set("password", _createHashFromPassword(password, salt));
			this.set("salt", salt);
			next();
		}.bind(this));
	}
})

/**
 * Export to Mongoose and module
 */
module.exports = Mongoose.model('User', User);
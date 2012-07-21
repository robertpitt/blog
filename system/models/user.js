/**
 * Require Dependancies
 */
var Mongoose = require('mongoose'),
	Crypto = require('crypto'),
	ObjectId 	= Mongoose.Schema.ObjectId;

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
	username 	: {type : String, index: { unique: true }},
	displayName : {type : String, required : true},
	email 		: {type : String, required: true, index: {unique : true}},
	password 	: {type : String, required : true},
	salt 		: {type : String},
	reg_date 	: {type : Date, default: Date.now},
	role 		: {type : String, enum : ['super', 'admin', 'editor', 'author', 'contributer', 'subscriber'], default: 'subscriber'}
});

User.methods.isAdmin = function()
{
	return ['super', 'admin'].indexOf(this.role) > -1;
}

/**
 * Login method
 */
User.statics.getUserByCredentials = function(username, password, callback)
{
	this.findOne({username : username}, function(err, user){
		if(err) return callback(err, null);

		/**
		 * Check to see if the user exists
		 */
		if(user && (_createHashFromPassword(password, user.salt) == user.password))
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
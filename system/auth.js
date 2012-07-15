/**
 * Require Dependancies
 */
var User = require('./database.js').model('User');

/**
 * User authentication module
 */
exports.middleware = function()
{
	return function(req, res, next)
	{
		/**
		 * user object should be false unless active session
		 */
		req.user = false;

		/**
		 * If there is an active session try assign the current user object
		 * to the req
		 */
		if(req.session._id)
		{
			User.findOne({_id : req.session._id}, function(err, user){
				if(err){ return next(err);}

				req.logout = function()
				{
					delete req.session._id;
				}
				
				req.user = user;
				next();
			});

			//Prevent exec
			return;
		}

		/**
		 * Assign the login method to the req for use in the routes
		 */
		req.login = function(user, password, callback)
		{
			User.getUserByCredentials(user, password, function(err, user){
				if(err) {return callback(err, null);}
				if(user)
				{
					req.session._id = user._id
					req.user = user;
					callback(null, user);
					return;
				}

				callback(null, null);
			});
		}

		/**
		 * Continue with the request
		 */
		next();
	}
}
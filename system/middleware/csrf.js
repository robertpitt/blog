/**
 * Nodepress
 */

/**
 * Load Dependancies
 */
require("crypto");

exports.csrf = function()
{
	return function(req, res, next)
	{
		/**
		 * Make sure the session is loaded
		 */		
		if(!req.session)
		{
			return next(new Error("CSRF Cannot load because session does not exists"));
		}

		/**
		 * Assign a token to the session if it does not exists
		 */
		req.session._csrf = crypto.createHash("md5").update("" + Date.getTime() + req.session.lastAccess).digest("hex");
	}
}
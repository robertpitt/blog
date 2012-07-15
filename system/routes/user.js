/**
 * Nodepress
 */
module.exports = [];

/**
 * Handles request to /user/
 * @param  {Object} req RequestObject
 * @param  {Object} res ResponseObject
 * @param  {Function} next call next in line
 */
var indexHandler = function(req, res)
{
	if(!req.user)
	{
		return res.redirect('/user/login');
	}

	res.send("Welcome to your user page");
}

/**
 * Handles request to /user/logout
 * @param  {Object} req RequestObject
 * @param  {Object} res ResponseObject
 */
var loginHandler = function(req, res)
{
	res.send("Loggin Out");
}

/**
 * Handles request to /user/logib
 * @param  {Object} req RequestObject
 * @param  {Object} res ResponseObject
 */
var loginHandler = function(req, res, next)
{
	/**
	 * Make sure the user is not already logged in
	 */
	if(req.user)
	{
		return res.redirect('/user');
	}

	/**
	 * Check to see if we have a post request
	 */
	if(req.method !== "POST")
	{
		/**
		 * Send the login page
		 */
		res.render("user/login.jade");
		return;
	}

	/**
	 * Get the params from the request
	 */
	var user = req.param("username");
	var pass = req.param("password");

	if(!user || !pass)
	{
		res.render("user/login.jade", {
			error : "Username and Password required"
		});
		return;
	}

	/**
	 * Try authenticate the user
	 */
	req.login(user, pass, function(err, user){
		if(err) throw err;

		if(!user)
		{
			res.render("user/login.jade", {
				error : "Username and Password incorrect"
			});
			return;
		}

		/**
		 * redirect them home
		 */
		res.redirect("/user/");
	})
}

module.exports.push(["get", "/user/?", indexHandler]);
module.exports.push(["all", "/user/login?", loginHandler]);
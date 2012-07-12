/**
 * 
 */

/**
 * exports should be a multi-demensional array, e.g
 */
module.exports = [];

/**
 * TODO: Remove once registration system is done
 */
var ____doAutoAdminLogin = function(req, res, next)
{
	if(req.user)
	{
		res.redirect('/admin/');
		return;
	}

	req.login("admin", "changeme", function(err, user){
		if(!user)
		{
			return res.redirect("/");
		}

		res.send("Welcome: " + user.displayName);
	})
}

/**
 * Administraion Homepage
 */
var homepage = function(req, res){

	/**
	 * Check to see if there is an active session
	 */
	if(!req.user)
	{
		res.redirect('/user/login');
		return;
	}

	/**
	 * Check to see if the user is an admin
	 */
	if(req.user.role != "super" && req.user.role != "admin")
	{
		/**
		 * Send the to right control panel
		 */
		res.redirect("/user/");
		return;
	}

	/**
	 * Welcome Admin
	 */
	res.render("admin/dashboard", {layout : "admin/layout"});

	/**
	req.login("admin", "changeme", function(err, user){
		if(!user)
		{
			return res.redirect("/");
		}

		res.send("Welcome: " + user.displayName);
	})*/
}

/**
 * Admin Homepage
 */
module.exports.push(["get", "/admin/?", homepage]);
module.exports.push(["get", "/admin/dashboard/?", homepage]);
module.exports.push(["get", "/admin/_/?", ____doAutoAdminLogin]);
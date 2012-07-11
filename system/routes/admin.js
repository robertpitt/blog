/**
 * 
 */

/**
 * exports should be a multi-demensional array, e.g
 */
module.exports = [];

/**
 * Admin Homepage
 */
module.exports.push(["get", "/admin/", function(req, res){
	res.send("Hello Admin");
}])
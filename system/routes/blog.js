/**
 * 
 */
module.exports = [];

/**
 * Admin Homepage
 */
module.exports.push(["get", "/", function(req, res){
	res.render("index.jade");
}])

module.exports.push(["get", "/b", function(req, res){
	console.log(req);
	res.render("index.jade");
}])
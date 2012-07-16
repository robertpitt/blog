/**
 * Nodepress
 * Favicon
 */

module.exports = function favicon()//Initialize
{
	/**
	 * Load the file system
	 */
	var _fs = require("fs");

	/**
	 * Create a pointer for storing the favicon
	 */
	var _favicon = false;

	/**
	 * Return the handler
	 */
	return function(req, res, next)//Per Request
	{
		if(req.path != "/favicon.ico")
		{
			next();
			return;
		}

		if(_favicon)
		{
			req.writeHead(200, _favicon.headers);
			req.send(_favicon.buffer);
			console.log("Served /favicon.ico from memory");
			return;
		}

		/**
		 * Load the favicon
		 */
		_fs.readFile(req.app.settings.views + "/public/favicon.ico", function(err, buffer){
			if(err)	return next();

			/**
			 * Store icon data in header, possibly Etag here soon.
			 */
			_favicon = {
				headers : {
					'Content-Type' 		: 'image/x-icon',
					'Content-Length' 	: buffer.length,
					'Catch-Control' 	: 86400
				},
				buffer : buffer
			}

			/**
			 * Now send the favicon
			 */
			req.writeHead(200, _favicon.headers);
			req.send(_favicon.buffer);
		});
	}
}
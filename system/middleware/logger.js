/**
 * Nodepress
 * Loggin Module
 */

module.exports = function logger()//Initialize
{
	/**
	 * return the handler
	 */
	return require('express').logger(':method	:url');
}
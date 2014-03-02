'use strict';

/**
 * Module dependencies
 */
var fs = require('fs'),
	mkdirp = require('mkdirp');

/**
 * Disk cache prototype
 */

function DiskCache(options) {
	// Set options
	this.options = options

	// Create folder if not exist
	mkdirp.sync(this.options.cacheFolder);
};

/**
 * Get page from cache
 */
DiskCache.prototype.get = function(hashedPath, callback) {
	// Initialize the local get variables
	var filePath = this.options.cacheFolder + '/' + hashedPath;

	// Try to read from file
	fs.readFile(filePath, 'utf8', function(err, res) {
		if (err) {
			callback(err)
		} else {
			// Parse file to JSON object
			var parsedFile = JSON.parse(res);

			// Than call the callback
			callback(err, parsedFile);
		}
	});
};

/**
 * Set page to cache
 */
DiskCache.prototype.set = function(hashedPath, cachePage, callback) {
	// Initialize the local set variables
	var filePath = this.options.cacheFolder + '/' + hashedPath;
	var cachedPageStr = JSON.stringify(cachePage);

	//Try writing to file
	fs.writeFile(filePath, cachedPageStr, function(err, res) {
		callback(err, res);
	});
};

/**
 * Clear page from cache
 */
DiskCache.prototype.clear = function(hashedPath, callback) {
	// Initialize the local clear variables
	var filePath = this.options.cacheFolder + '/' + hashedPath;

	// Try removing file
	fs.unlink(filePath, callback);
};

exports = module.exports = DiskCache;
'use strict';

/**
 * Module dependencies
 */
var fs = require('fs'),
	crypto = require('crypto'),
	mkdirp = require('mkdirp');

/**
 * Cache prototype
 */
function Cache(options) {
	this.options = options

	this.initClient();
};

/**
 * Initialize cache client
 */
Cache.prototype.initClient = function() {
	var CacheClient = require('./cache-clients/' + this.options.cacheClient);
	this.cacheClient = new CacheClient(this.options);
};

/**
 * Get hashed path string
 */
Cache.prototype.hashPath = function(path) {
	return crypto.createHash('md5').update(path).digest('hex');
};

/**
 * Check cached page validity
 */
Cache.prototype.isCachedPageValid = function(cachedPage) {
	return (Date.now() - cachedPage.created) < this.options.cacheDuration;
};

/**
 * Get page from cache
 */
Cache.prototype.get = function(path, callback) {
	// Setting up 'this' 
	var _this = this;

	// Create an hash string of path
	var hashedPath = this.hashPath(path);

	// Call cache client to get cached page
	this.cacheClient.get(hashedPath, function(err, cachedPage) {
		if (err) {
			callback(err);
		} else {
			if (_this.isCachedPageValid(cachedPage)) {
				callback(err, cachedPage.content);
			} else {
				// If cached page is not valid than clear it from cache
				_this.clear(path);

				// And call the callback
				callback(new Error('Cached version is invalid'));
			}
		}
	});
};

/**
 * Save page to cache
 */
Cache.prototype.set = function(path, content, callback) {
	// Init set local variables
	var hashedPath = this.hashPath(path);
	var cachedPage = {
		path: path,
		content: content,
		created: Date.now()
	};

	// Call cache client to set cached page
	this.cacheClient.set(hashedPath, cachedPage, callback);
};

/**
 * Clear page from cache
 */
Cache.prototype.clear = function(path, callback) {
	// Create an hash string of path
	var hashedPath = this.hashPath(path);

	// Call cache client to clear cached page
	this.cacheClient.clear(hashedPath, callback);
};

exports = module.exports = Cache;
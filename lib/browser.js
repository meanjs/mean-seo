'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
	childProcess = require('child_process'),
	phantomjs = require('phantomjs'),
	binPath = phantomjs.path;

/**
 * Initialize shell arguments
 */
var childArgs = [
	path.join(__dirname, 'phantomjs-scripts/crawl.js'),
	'/'
];

/**
 * Crawl the page
 */
exports.crawl = function(url, maxBuffer, callback) {
	// Set the first argument to the url to crawl
	childArgs[1] = url;

	// Call the PhantomJS process
	childProcess.execFile(binPath, childArgs, { maxBuffer: maxBuffer }, function(err, stdout, stderr) {
		callback(err, stdout);
	});
};
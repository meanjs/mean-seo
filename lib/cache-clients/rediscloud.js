'use strict';

/**
 * Module dependencies
 */
var redis = require('redis');
var url = require('url');

var client;

if (process.env.REDISCLOUD_URL) {
  var redisURL = url.parse(process.env.REDISCLOUD_URL);
  client = redis.createClient(redisURL.port, redisURL.hostname, {no_ready_check: true});
  client.auth(redisURL.auth.split(":")[1]);
} else {
  throw new Error(
    'To use `rediscloud` as a storage solution' +
    'for `mean-seo`, please make sure to have a' +
    '`REDISCLOUD_URL` environment variable declared.'
   );
}

exports = module.exports = client;



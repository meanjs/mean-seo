var express = require('express');
var request = require('request');
var fs = require('fs');
var path = require('path');

var seo = require('../index.js');

describe('Express server', function () {
  var app, server;
  var host = 'localhost';
  var port = 9876;

  var baseURL = 'http://' + host + ':' + port;
  var crawlerURL = baseURL + '?_escaped_fragment_=';

  var diskCachePath = 'tmp/mean-seo/cache/';

  describe('without mean-seo', function () {
    before(function () {
      app = express();
      app.use('*', express.static(__dirname));
      server = app.listen(port);
    });

    after(function () {
      server.close();
    });
    
    it('should reply with static <title> for regular URL', function (done) {
      request(baseURL, function (error, response, body) {
        body.should.match(/Such static/);
        done();
      });
    });

    it('should reply with static <title> for crawler URL', function (done) {
      request(crawlerURL, function (error, response, body) {
        body.should.match(/Such static/);
        done();
      });
    });
  });

  describe('with mean-seo `disk`', function () {
    before(function () {
      app = express();
      app.use(seo());
      app.use('*', express.static(__dirname));
      server = app.listen(port);
    });

    after(function () {
      server.close();
    });
    
    it('should reply with static <title> for regular URL', function (done) {
      request(baseURL, function (error, response, body) {
        body.should.match(/Such static/);
        done();
      });
    });

    it('should reply with dynamic <title> for crawler URL', function (done) {
      request(crawlerURL, function (error, response, body) {
        body.should.match(/Wow dynamic/);
        done();
      });
    });

    it('should write a cache file to disk', function (done) {
      request(crawlerURL, function (error, response, body) {
        var diskCacheDir = path.resolve(__dirname, '..', diskCachePath);
        fs.readdir(diskCacheDir, function (err, files) {
          files.should.not.be.empty;
          done();
        });
      });
    }); 
  });
});


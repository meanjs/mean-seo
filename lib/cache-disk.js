var fs = require('fs'),
	md5 = require('md5');

exports = modules.exports = DiskCache;


DiskCache.prototype.createClient = function(){
	if (!DiskCache.singleton){
		DiskCache.singleton = new DiskCache( options );		
	}
	return DiskCache.singleton;
}

function DiskCache( options ){
	options = options || {};
	options.duration = options.duration || 2;
	this.cacheDir = options.cacheDir || '/tmp/cacheDir';
}


DiskCache.prototype.save = function(url,html,cb){
	var fileName = md5(url);
	fs.writeFile(this.cacheDir + url, html, function(err,res
		cb(err,res);
	});
}

DiskCache.prototype.get = function(url,cb){
	var fileName = md5(url);
	fs.readFile(this.cacheDir + url, function(err,res){
		cb(err,res);
	});
}

DiskCache.prototype.clear = function(url){
	//Remove file
}
var fs 	= require('fs'),
	md5 = require('MD5');


exports = module.exports = DiskCache;

function DiskCache( options ){
	options = options || {};
	this.cacheDir = options.path || '/tmp/cacheDir';
}

DiskCache.prototype.createClient = function(options){
	if (!DiskCache.singleton){
		DiskCache.singleton = new DiskCache( options );		
	}
	return DiskCache.singleton;
}


DiskCache.prototype.set = function(url,content,cb){
	var fileName = md5(url);
	fs.writeFile(this.cacheDir + "/" + fileName, JSON.stringify(content), function(err,res){
		cb(err,res);
	});
}

DiskCache.prototype.get = function(url,cb){
	var fileName = md5(url);
	fs.readFile(this.cacheDir + "/" + fileName, 'utf8', function(err,res){
		if (!err && !!res){
			cb(err,JSON.parse(res));	
		}
		else{
			cb(true,null);
		}
		
	});
}

DiskCache.prototype.clear = function(url){
	//Remove file
}
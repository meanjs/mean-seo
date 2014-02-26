var moment = require('moment');

exports = module.exports = Cache;

exports.createCache = function(options){
	if (!Cache.singleton){
		Cache.singleton = new Cache( options );		
	}
	return Cache.singleton;
}

function Cache( options ){
	options = options || {};
	options.duration = options.duration || 2;

	var cacheLib = 'cache-' + options.type;
	var Cache = require("./" + cacheLib + ".js");
	console.log(Cache);

	var cache = new Cache();

	this.client = cache.createClient();
	this.cacheDuration = options.duration;	
}

Cache.prototype.save = function(url,html,cb){
	//add url to cache	
	var client = this.client;
	var entry = {
		html: html,
		timestamp: moment()
	}
	client.set(url,entry,cb);
}



Cache.prototype.clear = function(key){

}

Cache.prototype.cachedCopy = function(url,cb){
	console.log(this);
	//Implement inCache
	var client = this.client;
	client.get(url,function(err,cached){
		if (err) cb(err,false);
		else{
			if (invalidate(cached)){
				client.clear(url);
				cb('cache invalidated',cached);
			}
			else{
				console.log("serving from cache");
				return cb(false,cached);
			}
		}
	});	
}

function invalidate(cachedCopy){
	var now = moment();
	return moment.duration(now - cachedCopy.timestamp).days() > this.cacheDuration ? true : false;
}

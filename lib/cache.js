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
	var cache = require(cacheLib);

	this.client = cache.createClient();
	this.cacheDuration = options.duration;	
}

Cache.prototype.save = function(url,html){
	//add url to cache	
	var client = this.client;
	var entry = {
		html: html,
		timestamp: moment()
	}
	client.set(url,html);
}


Cache.prototype.invalidate = function(cachedCopy){
	var now = moment();
	return moment.duration(now - cachedCopy.timestamp).days() > this.cacheDuration ? true : false;
}

Cache.prototype.clear = function(key){

}

Cache.prototype.cachedCopy = function(url,cb){
	//Implement inCache
	var client = this.client;
	client.get(url,function(err,cached){
		if (err) cb(err,false);
		else{
			if (this.invalidate(cached)){
				client.clear(url);
				cb('cache invalidated',cached);
			}
			else{
				return cb(false,cached);
			}
		}
	});	
}
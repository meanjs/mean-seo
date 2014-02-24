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

	switch (options.type){
		case "disk":
		break;
		case "redis":
			var redis = require('cache-redis');
 			this.client = redis.createClient();
    	    this.cacheDuration = options.duration;
		break;
		default:
			this.client = false;
		break;		
	}
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

Cache.prototype.cachedCopy = function(url){
	//Implement inCache
	var client = this.client;
	cachedCopy = client.get(url);
	

	if (!cachedCopy) return fale;

	if (this.invalidate(cachedCopy)){
		client.delete(url);
		return false;
	}
	else{
		return cachedCopy;
	}
}
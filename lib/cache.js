
exports = module.exports = Cache;

exports.createCache = function(options){
	if (!Cache.singleton){
		Cache.singleton = new Cache( options );		
	}
	return Cache.singleton;
}

function Cache( options ){
	options = options || {};
	if (options.redis){		
		var redis = require('redis');
        this.client = redis.createClient();
	}
	else{
		this.client = false;
	}
}

Cache.prototype.save = function(url,html){
	//add url to cache	
	var client = this.client;
	client.set(url,html);
}


Cache.prototype.cachedCopy = function(url){
	//Implement inCache
	var client = this.client;
	inCache = client.get(url);

	if (inCache){
		return cachedCopy;
	}
	else{
		return false;	
	}	
}
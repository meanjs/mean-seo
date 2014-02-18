var Browser = require("zombie");
var assert = require("assert");
var Cache = require("./cache.js"),    
    cache = Cache.createCache({redis: true, duration: 2});

var browser = new Browser();

exports = module.exports = render;

function render(req, res, next) {

    var url = req.url;
    var isCrawler = url.match(/\?_escaped_fragment_=/g) != null ? true : false;
   
    //If the request came from a crawler
    if (isCrawler) {
    	var newUrl = parseUrlFramgment(req),
        //Check the cache
            cachedCopy = cache.cachedCopy(newUrl);

        //If cached, send cached result
        if (cachedCopy){
            res.send(cachedCopy.html);
        }

        //If not cached, fetch with Browser
        else{
            Browser.visit(newUrl, function(e, browser, status) {
                if (e) return cb(e);
                var html = browser.html();

                //Save in cache and send result
                cache.save("url",html);          
                res.send(html);
            });
        }
    }
    next();
}



function parseUrlFramgment(req) {
    var urlParts = req.url.split('?_escaped_fragment_=');
    console.log(urlParts);
    // If no fragment in URL this is not a request for an HTML snapshot
    // of an AJAX page.
    if (urlParts.length !== 2) return undefined;

    // Express adds a protocol property to the req object.
    var protocol = req.protocol || options.protocol;

    var url = protocol + '://' + req.headers.host;
    var path = urlParts[0];
    var fragment = urlParts[1];

    if (fragment.length === 0) {
        // We are dealing with crawlable an ajax page without a hash fragment
        url += path; // No hashbang or fragment
    } else {
        url += path + '#!' + decodeURIComponent(fragment);
    }

    return url;
}

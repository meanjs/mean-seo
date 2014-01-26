var Browser = require("zombie");
var assert = require("assert");

var browser = new Browser();

exports = module.exports = forwardChecker;

// browser.visit("https://kiu-leafly.fwd.wf/#!/docs/overview", function(e,browser,status){
// 	var html = browser.html();
// 	console.log(html);
// });

function forwardChecker(req, res, next) {

    var url = req.url;
    var isCrawler = url.match(/\?_escaped_fragment_=/g) != null ? true : false;
    if (isCrawler) {
    	var newUrl = getUrl(req);
        Browser.visit(newUrl, function(e, browser, status) {
            if (e) return cb(e);
            // console.log(e);
            // console.log(status);
            // console.log(assert.ok(browser.success));
            // console.log(browser.html());
            //Special Header?
            // res.header();
            res.send(browser.html());
        });

    }

    next();
}

var stripScriptTags = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;

function removeScripts(html) {
    return html.replace(stripScriptTags, '');
}


function getUrl(req) {
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

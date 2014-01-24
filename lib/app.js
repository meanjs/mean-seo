var Browser = require("zombie");
var assert = require("assert");

var browser = new Browser();

exports = module.exports = forwardChecker;


function forwardChecker(req,res,next){

	var url = req.url;	
	var isCrawler = url.indexOf("?_escaped_fragment_=") != -1 ? true : false;

	if (isCrawler){
		var newUrl = "http://localhost:3000/#!/" + req.url.split("/").splice(2).join("/");
		
		browser.visit(newUrl, function(e, browser, status){
	  		console.log(e);
	  		console.log(status);
	  		// console.log(browser.html());
	  	});
			
	}

	next();
}



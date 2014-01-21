var Browser = require("zombie");
var assert = require("assert");

var browser = new Browser();

exports = module.exports = forwardChecker;



function forwardChecker(req,res,next){

	var url = req.url;
	//replace with regex
	var isCrawler = url.indexOf("_escaped_fragment_") != -1 ? true : false;

	if (isCrawler){
		if(url.length > 0) {
			console.log(url);	  
			assert.ok(browser.success);
		  	if (browser.error){
		  		console.log(browser.error);
		  	}
		  	else{
		  		browser.visit(url, function (e,browser) {
		  		var html = browser.html();	  	
		  			 res.send(html);	    
		  		});
		  	}
		}	
	}

	next();
}



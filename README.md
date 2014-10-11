# MEAN-SEO
SEO Solution for MEAN.JS applications which forwards crawlers requests to a compiled HTML copy using PhantomJS.

## Longer Version
If you ever tried to make your AngularJS application crawler friendly, you already know this is a bit of a headache. Part of evolving the MEAN.JS stack towards production ready state, the MEAN-SEO module makes it pretty simple to make sure your MEAN application is ready for crawlers requests.

When a crawler requests the page using the [**\_escaped\_fragment\_**](https://developers.google.com/webmasters/ajax-crawling/docs/specification), the module launches the PhantomJS headless-browser, which creates a copy of the page and stores it in cache for future requests. 

## Quick Install
First you'll need to install the MEAN-SEO module using npm:

	npm install mean-seo --save

Then include in you express application: 

	var seo = require('mean-seo');

And finally, just before you require the **app.router** middleware add the following:
	
	app.use(seo({
		cacheClient: 'disk', // Can be 'disk' or 'redis'
    	redisURL: 'redis://:password@hostname:port', // If using redis, optionally specify server credentials
		cacheDuration: 2 * 60 * 60 * 24 * 1000, // In milliseconds for disk cache
	}));
	
	// app.use(app.router) will be below this line 

If you use HTML5 URL scheme then you should let the crawler know you're serving an AJAX application by adding the following to the HEAD tag of your page:

	<meta name=”fragment” content=”!”>

## Resources
  - [Google AJAX Application Guide](https://developers.google.com/webmasters/ajax-crawling/docs/specification)
  - [A Tutorial About AngularJS SEO](http://www.yearofmoo.com/2012/11/angularjs-and-seo.html)


## License
(The MIT License)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

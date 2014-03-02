MEAN SEO
========================================================================

## Short version
Forwards any [requests from crawlers](https://developers.google.com/webmasters/ajax-crawling/docs/specification) to a compiled page copy using PhantomJS.

## Longer Version
If you ever tried to make sure your Angular application is crawler friendly, you might already know this is a bit of a headache. Part of evolving the MEAN stack towards production ready state, the MEAN.JS SEO module makes it pretty simple to make sure your MEAN application ready for crawlers coming in.

What this plugin does is simple: Every time a crawler requests a page using the *_escaped_fragment_*, the plugin launches a PhantomJS headless-browser, which creates a copy of the page and stores it in cache for future requests. 

In addition, the plugin caches the page for the duration you define, either by saving the pages either to the disk or a to Redis instance (requires installing Redis). 

The cached pages are either saved to disk or to a Redis instance (requires installing Redis).

## Quick Install
Here's how to set MEAN-SEO up:

	var seo = require('mean-seo')({
		cacheClient: 'disk', // Can be 'disk' or 'redis'
		cacheDuration: 2, // In milliseconds for disk cache
	});

And then, assuming your Express application instance is named 'app', you should add the following:

	app.use(seo());

If you use HTML5 URL scheme then you should let the crawler know you're serving an AJAX application by adding the following to the HEAD tag of your page:

	<meta name=”fragment” content=”!”>

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

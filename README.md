MEAN SEO
========================================================================

## Short version

Forwards any requests from crawlers to a copy that's compiled in the server, on the fly, using Zombie.

### Longer Version

If you ever tried to make sure your SPA is crawler friendly, you might already know this is a bit of a headache. Part of evolving the MEAN stack towards production ready state, the MEAN.js SEO module makes it pretty simple to make sure your MEAN application ready for crawlers coming in.

In short, what this plugin does is simple: Every time a crawler requests a page, the plugin launches a Zombie.js headless-browser, which then fetches the same page, but makes sure to wait for a while, before serving the fully rendered page back to the server.

In addition, the plugin caches the page for the duration you define, either by saving the pages either to the disk or a to Redis instance (requires installing Redis). 

Here's how to set MEAN-SEO up:

	var render = require('render').create({
		type: 'disk', //or redis
		duration: 2, //in days
		path: '/tmp/cache' //make sure this directory exists
	});

And then, if your Express app is called "app", add the following:
	
	app.use(render);	

In order for the crawler to know you are serving an SPA page using hashbangs, you should also make sure to add the following to the `head` of your page:

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


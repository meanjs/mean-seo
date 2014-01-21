render.js(1) -- MEAN SEO Support
========================================================================


## What it does

Forwards any requests from crawlers to a copy that's compiled in the server, on the fly, using Zombie.

Just add this to your `express.js` file:

    var render = require('render');
    app.use(render);

Now add:

  <meta name="fragment" content="!">

At the top of your `<head>`.

Easy peasy.





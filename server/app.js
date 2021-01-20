/**
 * The Server Can be configured and created here...
 * 
 * You can find the JSON Data file here in the Data module. Feel free to impliment a framework if needed.
 */

/*
-- This is the product data, you can view it in the file itself for more details 
{
    "_id": "019",
    "isActive": "false",
    "price": "23.00",
    "picture": "/img/products/N16501_430.png",
    "name": "Damage Reverse Thickening Conditioner",
    "about": "Dolor voluptate velit consequat duis. Aute ad officia fugiat esse anim exercitation voluptate excepteur pariatur sit culpa duis qui esse. Labore amet ad eu veniam nostrud minim labore aliquip est sint voluptate nostrud reprehenderit. Ipsum nostrud culpa consequat reprehenderit.",
    "tags": [
        "ojon",
        "conditioner"
    ]
}
*/
const data      = require('./data');
const http = require('http');
const url = require('url');
const querystring = require('querystring');
const hostname  = 'localhost';
const port = 3035;

const normalizeString = (term) => { 
    return term.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}

/** 
 * Start the Node Server Here...
 * 
 * The http.createServer() method creates a new server that listens at the specified port.  
 * The requestListener function (function (req, res)) is executed each time the server gets a request. 
 * The Request object 'req' represents the request to the server.
 * The ServerResponse object 'res' represents the writable stream back to the client.
 */
http.createServer(function (req, res) {
    // .. Here you can create your data response in a JSON format
    // TODO Use Express or some other framework that simplifies our lives :)

    const urlparse = url.parse(req.url, true)
    const search = urlparse.search;
    let items = []
    
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3030');

    if (urlparse.pathname == '/products' && req.method == 'GET') {
        if (search) {
            const [, query] = urlparse.search.split('?');
            const searchTerm = normalizeString(querystring.parse(query).q);
            items = data.filter(item => {
                const name = normalizeString(item.name);
                return name.includes(searchTerm) && eval(item.isActive);
            });
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ items: items, total: data.length }, null, 2));

    } else {
        res.write("Response goes in here..."); // Write out the default response
        
        res.end(); //end the response
    }
    
    
}).listen(port);




console.log(`[Server running on ${hostname}:${port}]`);

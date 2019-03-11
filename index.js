const https = require('https');
const fs = require('fs');

const port = 3000;
const requestHandler = (request, response) => {
    // do something with the request here.
    console.log("Request received to " + request.url);

    switch (request.url) {
        case "/books":
            fs.readFile("./responses.json", function (err, contents) {
                let data = JSON.parse(contents);
                response.end(JSON.stringify(data.books));
            });
            break;
        case "/":
            response.end("Hello!");
            break;
        default:
            response.writeHead(404);
            response.end("Page not found.");
            break;
    }
};

const server = https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
}, requestHandler);

server.listen(port, (err) => {
    if (err) {
        return console.log('Error occurred.', err)
    }

    console.log(`server is listening on ${port}, https`)
})
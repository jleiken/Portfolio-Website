/* jshint esversion: 6, node: true */

let fs = require("fs");
let express = require("express");
let app = express();

app.set('port', (process.env.PORT || 5000));

app.use("/assets", express.static(__dirname + "/assets"));

app.get("/", index);
app.get("/index", index);

function index(req, res) {
	"use strict";
	fs.readFile("index.html", (err, data) => {
		if (err) {
			console.log("uh oh, index failed");
		} else {
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write(data.toString());
		}
		res.end();
	});
}

app.get("/resume", (req, res) => {
	"use strict";
	fs.readFile("resume.html", (err, data) => {
		if (err) {
			console.log("uh oh, resume failed");
		} else {
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write(data.toString());
		}
		res.end();
	});
}); 

app.listen(app.get('port'), () => {
	"use strict";
  	console.log('Listening on port 5000');
});

app.use((req, res, next) => {
	"use strict";
	fs.readFile("404.html", (err, data) => {
		if (err) {
			console.log("uh oh, 404 failed");
		} else {
			res.writeHead(404, {'Content-Type': 'text/html'});
			res.write(data.toString());
		}
		res.end();
	});
});

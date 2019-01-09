'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ssrapp = undefined;

var _firebaseFunctions = require('firebase-functions');

var functions = _interopRequireWildcard(_firebaseFunctions);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _App = require('./src/App');

var _App2 = _interopRequireDefault(_App);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

//import indexRoute from './routes.js'

var index = _fs2.default.readFileSync(__dirname + "/index.html", "utf8");
var app = (0, _express2.default)();

app.get('/', function (req, res) {
	//** is used to get every single request to the server
	var html = (0, _server.renderToNodeStream)(_react2.default.createElement(_App2.default, null));
	res.set("Cache-Control", "public, max-age=600, s-maxage=1200");
	var finalHtml = index.replace("<!-- App -->", html);
	res.send(finalHtml);
});

var indexRoute = _express2.default.Router();

indexRoute.get('/tree/:code', function (req, res, next) {
	res.send('<h1>' + indexRoute.param.code + '</h1>');
	next();
});

app.use("/tree/:code", indexRoute, function (req, res) {
	//Here we are for now
	res.send('<h1>' + req.params.code + '</h1>');
});

/*
app.all('/tree/:code', (req, res) => {
	const link = index.replace('<link href="styles.css" rel="stylesheet">', '<link href="../styles.css" rel="stylesheet">')
	const script = index.replace('<script type="text/javaScript" src="client_bundle.js"></script>', '<script type="text/javaScript" src="../client_bundle.js"></script>')
	res.write(link)
	res.write(script)
	res.end()
})
*/

var ssrapp = exports.ssrapp = functions.https.onRequest(app);
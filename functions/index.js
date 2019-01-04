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

var _Trees = require('./src/Trees');

var _Trees2 = _interopRequireDefault(_Trees);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _reactHead = require('react-head');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var index = _fs2.default.readFileSync(__dirname + "/index.html", "utf8");
var app = (0, _express2.default)();
var headTags = ["<Title>Arbolar | Arboles</Title>", "<Meta name='description' content='Arbolar | Arboles'/>"];
var headToUpdate = (0, _server.renderToString)(_react2.default.createElement(
	_reactHead.HeadProvider,
	{ headTags: headTags },
	_react2.default.createElement(_App2.default, null)
));

app.get('/', function (req, res) {
	//** is used to get every single request to the server
	var html = (0, _server.renderToString)(_react2.default.createElement(_App2.default, null));
	res.set("Cache-Control", "public, max-age=600, s-maxage=1200");
	var finalHtml = index.replace("<!-- App -->", html);
	var finalHead = index.replace("<!-- Replace this comment with metatags -->", headToUpdate);
	res.write(finalHead);
	res.write(finalHtml);
	res.end();
});

app.get('/trees', function (req, res) {
	var trees = (0, _server.renderToString)(_react2.default.createElement(_Trees2.default, null));
	res.set("Cache-Control", "public, max-age=600, s-maxage=1200");
	var finalHtml = index.replace("<!-- App -->", trees);
	res.send(finalHtml);
});

app.get('/tree/:code', function (req, res) {
	var link = index.replace('<link href="styles.css" rel="stylesheet">', '<link href="../styles.css" rel="stylesheet">');
	var script = index.replace('<script type="text/javaScript" src="client_bundle.js"></script>', '<script type="text/javaScript" src="../client_bundle.js"></script>');
	res.write(link);
	res.write(script);
	res.end();
});

var ssrapp = exports.ssrapp = functions.https.onRequest(app);
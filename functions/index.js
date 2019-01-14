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

var _firebaseAdmin = require('firebase-admin');

var _firebaseAdmin2 = _interopRequireDefault(_firebaseAdmin);

var _Trees = require('./src/Trees');

var _Trees2 = _interopRequireDefault(_Trees);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var firebaseApp = _firebaseAdmin2.default.initializeApp(functions.config().firebase);
var secondGraderFolder = '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8">\n    <!-- This is for prerender to work properly -->\n    \n    <!-- -->\n    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">\n    <meta name="theme-color" content="#000000">\n    <!--\n      manifest.json provides metadata used when your web app is added to the\n      homescreen on Android. See https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/\n    -->\n    <link rel="stylesheet" href="src/materialize.css">\n    <link rel="manifest" href="%PUBLIC_URL%/manifest.json">\n    <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">\n\n    <link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">\n    <!-- Import materialize.css -->\n    <link href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.0/css/materialize.min.css" rel="stylesheet">\n    <link href="../styles.css" rel="stylesheet">\n    <!--\n      Notice the use of %PUBLIC_URL% in the tags above.\n      It will be replaced with the URL of the public folder during the build.\n      Only files inside the public folder can be referenced from the HTML.\n\n      Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will\n      work correctly both with client-side routing and a non-root public URL.\n      Learn how to configure a non-root public URL by running npm run build.\n    -->\n    <!--<title>React App</title>-->\n  </head>\n  <body>\n    <noscript>\n      You need to enable JavaScript to run this app.\n    </noscript>\n    <div id="root"><!-- App --></div>\n    <!--\n      This HTML file is a template.\n      If you open it directly in the browser, you will see an empty page.\n\n      You can add webfonts, meta tags, or analytics to this file.\n      The build step will place the bundled scripts into the <body> tag.\n\n      To begin the development, run npm start or yarn start.\n      To create a production bundle, use npm run build or yarn build.\n    -->\n    <!-- Import jQuery before materialize.js -->\n    <script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>\n    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.0/js/materialize.min.js"></script>\n    <script type="text/javaScript" src="../client_bundle.js"></script>\n  </body>\n</html>\n';

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

app.get("/trees", function (req, res) {
	var treeHtml = (0, _server.renderToNodeStream)(_react2.default.createElement(_Trees2.default, null));
	res.set("Cache-Control", "public, max-age=600, s-maxage=1200");
	var finalHtml = index.replace("<!-- App -->", treeHtml);
	res.send(finalHtml);
});

var indexRoute = _express2.default.Router();

indexRoute.get('/tree/:code', function (req, res, next) {
	res.set("Cache-Control", "public, max-age=600, s-maxage=1200");
	res.send('<h1>' + indexRoute.param.code + '</h1>');
	next();
});

function requestForTree(code) {
	var ref = firebaseApp.database().ref("trees").orderByChild("code").equalTo(code);
	return ref.once("value").then(function (snap) {
		return snap.val();
	});

	/*html = (snap.val()) ? `
 		<div class="tree" key="${snap.val().code}">
 		<div class="img-container">
 			<img src="${snap.val().img}" class="materialboxed"/>
 		</div>
 		<div class="description">
 			<h1 class="title">${snap.val().name}</h1>
 			<p>${snap.val().description}</p>
 			<a href="" class="btn waves hoverable waves-effect green">Ordenar</a>
 		</div>
 	</div>
 ` : ""*/
}

app.use("/tree/:code", indexRoute, function (req, res) {
	var code = req.params.code;
	requestForTree(code).then(function (tree) {
		//res.write(`${tree.code}`)
		var k = Object.keys(tree);
		var treeToHtml = '<!DOCTYPE html>\n\t\t<html lang="en">\n\t\t<head>\n\t\t\t<meta charset="utf-8">\n\t\t\t<!-- This is for prerender to work properly -->\n\t\t\t\n\t\t\t<!-- -->\n\t\t\t<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">\n\t\t\t<meta name="theme-color" content="#000000">\n\t\t\t<!--\n\t\t\tmanifest.json provides metadata used when your web app is added to the\n\t\t\thomescreen on Android. See https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/\n\t\t\t-->\n\t\t\t<link rel="stylesheet" href="src/materialize.css">\n\t\t\t<link rel="manifest" href="%PUBLIC_URL%/manifest.json">\n\t\t\t<link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">\n\n\t\t\t<link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">\n\t\t\t<!-- Import materialize.css -->\n\t\t\t<link href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.0/css/materialize.min.css" rel="stylesheet">\n\t\t\t<link href="../styles.css" rel="stylesheet">\n\t\t\t<!--\n\t\t\tNotice the use of %PUBLIC_URL% in the tags above.\n\t\t\tIt will be replaced with the URL of the public folder during the build.\n\t\t\tOnly files inside the public folder can be referenced from the HTML.\n\n\t\t\tUnlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will\n\t\t\twork correctly both with client-side routing and a non-root public URL.\n\t\t\tLearn how to configure a non-root public URL by running npm run build.\n\t\t\t-->\n\t\t\t<!--<title>React App</title>-->\n\t\t</head>\n\t\t<body>\n\t\t\t<noscript>\n\t\t\tYou need to enable JavaScript to run this app.\n\t\t\t</noscript>\n\t\t\t<div id="root">\n\t\t\t<h1>Arbol<h1/>\n\t\t\t<div className="tree" key=' + tree[k].code + '>\n\t\t\t\t<div className="img-container">\n\t\t\t\t\t<MediaBox src=' + tree[k].img + ' className="materialboxed"/>\n\t\t\t\t</div>\n\t\t\t\t<div className="description">\n\t\t\t\t\t<h1 className="title">' + tree.name + '</h1>\n\t\t\t\t\t<p>' + tree.description + '</p>\n\t\t\t\t\t<a href="" className="btn waves hoverable waves-effect green">Ordenar</a>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t\n\t\t\t</div>\n\t\t\t<!--\n\t\t\tThis HTML file is a template.\n\t\t\tIf you open it directly in the browser, you will see an empty page.\n\n\t\t\tYou can add webfonts, meta tags, or analytics to this file.\n\t\t\tThe build step will place the bundled scripts into the <body> tag.\n\n\t\t\tTo begin the development, run npm start or yarn start.\n\t\t\tTo create a production bundle, use npm run build or yarn build.\n\t\t\t-->\n\t\t\t<!-- Import jQuery before materialize.js -->\n\t\t\t<script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>\n\t\t\t<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.0/js/materialize.min.js"></script>\n\t\t\t<script type="text/javaScript" src="../client_bundle.js"></script>\n\t\t</body>\n\t\t</html>\n\t\t';
		res.send(treeToHtml);
	});
	res.end();
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
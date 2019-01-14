import * as functions from 'firebase-functions';
import React from 'react'
import {renderToString, renderToNodeStream } from "react-dom/server"
import App from "./src/App"
import express from "express"
import fs from "fs"
import firebase from 'firebase-admin'
import Trees from './src/Trees'

const firebaseApp = firebase.initializeApp(
	functions.config().firebase
)
const secondGraderFolder = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <!-- This is for prerender to work properly -->
    
    <!-- -->
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="theme-color" content="#000000">
    <!--
      manifest.json provides metadata used when your web app is added to the
      homescreen on Android. See https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/
    -->
    <link rel="stylesheet" href="src/materialize.css">
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json">
    <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">

    <link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <!-- Import materialize.css -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.0/css/materialize.min.css" rel="stylesheet">
    <link href="../styles.css" rel="stylesheet">
    <!--
      Notice the use of %PUBLIC_URL% in the tags above.
      It will be replaced with the URL of the public folder during the build.
      Only files inside the public folder can be referenced from the HTML.

      Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
      work correctly both with client-side routing and a non-root public URL.
      Learn how to configure a non-root public URL by running npm run build.
    -->
    <!--<title>React App</title>-->
  </head>
  <body>
    <noscript>
      You need to enable JavaScript to run this app.
    </noscript>
    <div id="root"><!-- App --></div>
    <!--
      This HTML file is a template.
      If you open it directly in the browser, you will see an empty page.

      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the <body> tag.

      To begin the development, run npm start or yarn start.
      To create a production bundle, use npm run build or yarn build.
    -->
    <!-- Import jQuery before materialize.js -->
    <script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.0/js/materialize.min.js"></script>
    <script type="text/javaScript" src="../client_bundle.js"></script>
  </body>
</html>
`

//import indexRoute from './routes.js'

const index = fs.readFileSync(__dirname + "/index.html", "utf8")
const app = express()

app.get('/', (req, res) => {//** is used to get every single request to the server
	const html = renderToNodeStream(<App />)
	res.set("Cache-Control", "public, max-age=600, s-maxage=1200");
	const finalHtml = index.replace("<!-- App -->", html)
	res.send(finalHtml);
})

app.get("/trees", (req, res) => {
	const treeHtml = renderToNodeStream(<Trees />)
	res.set("Cache-Control", "public, max-age=600, s-maxage=1200");
	const finalHtml = index.replace("<!-- App -->", treeHtml)
	res.send(finalHtml);
})

var indexRoute = express.Router()

indexRoute.get('/tree/:code', function(req, res, next){
	res.set("Cache-Control", "public, max-age=600, s-maxage=1200");
	res.send(`<h1>${indexRoute.param.code}</h1>`)
	next()
})

function requestForTree(code){
	let ref = firebaseApp.database().ref("trees").orderByChild("code").equalTo(code)
	return ref.once("value").then(snap => snap.val())
		
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

app.use("/tree/:code", indexRoute, function(req, res){
	var code = req.params.code
	requestForTree(code).then(tree => {
		//res.write(`${tree.code}`)
		let k = Object.keys(tree)
		let treeToHtml = `<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="utf-8">
			<!-- This is for prerender to work properly -->
			
			<!-- -->
			<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
			<meta name="theme-color" content="#000000">
			<!--
			manifest.json provides metadata used when your web app is added to the
			homescreen on Android. See https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/
			-->
			<link rel="stylesheet" href="src/materialize.css">
			<link rel="manifest" href="%PUBLIC_URL%/manifest.json">
			<link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">

			<link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
			<!-- Import materialize.css -->
			<link href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.0/css/materialize.min.css" rel="stylesheet">
			<link href="../styles.css" rel="stylesheet">
			<!--
			Notice the use of %PUBLIC_URL% in the tags above.
			It will be replaced with the URL of the public folder during the build.
			Only files inside the public folder can be referenced from the HTML.

			Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
			work correctly both with client-side routing and a non-root public URL.
			Learn how to configure a non-root public URL by running npm run build.
			-->
			<!--<title>React App</title>-->
		</head>
		<body>
			<noscript>
			You need to enable JavaScript to run this app.
			</noscript>
			<div id="root">
			<h1>Arbol<h1/>
			<div className="tree" key=${tree[k].code}>
				<div className="img-container">
					<MediaBox src=${tree[k].img} className="materialboxed"/>
				</div>
				<div className="description">
					<h1 className="title">${tree.name}</h1>
					<p>${tree.description}</p>
					<a href="" className="btn waves hoverable waves-effect green">Ordenar</a>
				</div>
			</div>
			
			</div>
			<!--
			This HTML file is a template.
			If you open it directly in the browser, you will see an empty page.

			You can add webfonts, meta tags, or analytics to this file.
			The build step will place the bundled scripts into the <body> tag.

			To begin the development, run npm start or yarn start.
			To create a production bundle, use npm run build or yarn build.
			-->
			<!-- Import jQuery before materialize.js -->
			<script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
			<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.0/js/materialize.min.js"></script>
			<script type="text/javaScript" src="../client_bundle.js"></script>
		</body>
		</html>
		`
		res.send(treeToHtml)
	})
	res.end()
})



/*
app.all('/tree/:code', (req, res) => {
	const link = index.replace('<link href="styles.css" rel="stylesheet">', '<link href="../styles.css" rel="stylesheet">')
	const script = index.replace('<script type="text/javaScript" src="client_bundle.js"></script>', '<script type="text/javaScript" src="../client_bundle.js"></script>')
	res.write(link)
	res.write(script)
	res.end()
})
*/

export let ssrapp = functions.https.onRequest(app)
import * as functions from 'firebase-functions';
import React from 'react'
import {renderToString, renderToNodeStream } from "react-dom/server"
import App from "./src/App"
import express from "express"
import fs from "fs"
//import indexRoute from './routes.js'

const index = fs.readFileSync(__dirname + "/index.html", "utf8")
const app = express()

app.get('/', (req, res) => {//** is used to get every single request to the server
	const html = renderToNodeStream(<App />)
	res.set("Cache-Control", "public, max-age=600, s-maxage=1200");
	const finalHtml = index.replace("<!-- App -->", html)
	res.send(finalHtml);
})

var indexRoute = express.Router()

indexRoute.get('/tree/:code', function(req, res, next){
	res.send(`<h1>${indexRoute.param.code}</h1>`)
	next()
})

app.use("/tree/:code", indexRoute, function(req, res){
	//Here we are for now
	res.send(`<h1>${req.params.code}</h1>`)
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
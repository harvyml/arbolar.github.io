import * as functions from 'firebase-functions';
import React from 'react'
import {renderToString } from "react-dom/server"
import App from "./src/App"
import Trees from "./src/Trees"
import express from "express"
import fs from "fs"
import { HeadProvider } from "react-head"


const index = fs.readFileSync(__dirname + "/index.html", "utf8")
const app = express()
const headTags = [
	"<Title>Arbolar | Arboles</Title>",
	"<Meta name='description' content='Arbolar | Arboles'/>"
  ]
const headToUpdate = renderToString(
  <HeadProvider headTags={headTags}>
	<App/>
  </HeadProvider>
)

app.get('/', (req, res) => {//** is used to get every single request to the server
	const html = renderToString(<App />)
	res.set("Cache-Control", "public, max-age=600, s-maxage=1200");
	const finalHtml = index.replace("<!-- App -->", html)
	const finalHead = index.replace("<!-- Replace this comment with metatags -->", headToUpdate)
	res.write(finalHead);
	res.write(finalHtml);
	res.end()
})

app.get('/trees', (req, res) => {
	let trees = renderToString(<Trees/>)
	res.set("Cache-Control", "public, max-age=600, s-maxage=1200");
	let finalHtml = index.replace("<!-- App -->", trees)
	res.send(finalHtml)
})

app.get('/tree/:code', (req, res) => {
	const link = index.replace('<link href="styles.css" rel="stylesheet">', '<link href="../styles.css" rel="stylesheet">')
	const script = index.replace('<script type="text/javaScript" src="client_bundle.js"></script>', '<script type="text/javaScript" src="../client_bundle.js"></script>')
	res.write(link)
	res.write(script)
	res.end()
})

export let ssrapp = functions.https.onRequest(app)
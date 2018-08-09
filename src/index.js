import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from 'firebase';
import registerServiceWorker from './registerServiceWorker';

firebase.initializeApp({
  	apiKey: "AIzaSyDpEZklEojaVNvueAG88iXPSJXQD4xYUII",
    authDomain: "sendatree-c3333.firebaseapp.com",
    databaseURL: "https://sendatree-c3333.firebaseio.com",
    projectId: "sendatree-c3333",
    storageBucket: "sendatree-c3333.appspot.com",
    messagingSenderId: "640304247213"
})

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

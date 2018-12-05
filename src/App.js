import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from 'firebase';
import './materialize.css';
import {Modal, Icon, Carousel, Row, Col, Card, CardTitle, Parallax, Input, Button, Container} from 'react-materialize';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import $ from "jquery";

import Trees from './Trees';

class App extends Component{
  componentWillMount (){
  firebase.auth().onAuthStateChanged(user => {
    this.setState({user})
  });

  /*firebase.database().ref('pictures').on('child_added', snapshot => {
    this.setState({
      pictures: this.state.pictures.concat(snapshot.val())//Se toma el array anterior para crear uno nuevo
    })
  })*/

  firebase.database().ref('trees').limitToLast(1).on('child_added', snapshot => {
    this.setState({
      trees: this.state.trees.concat(snapshot.val())//Se toma el array anterior para crear uno nuevo
    })
  })
}

constructor(){
  super()
  this.state = {
    user: null,
    /*pictures: [],*/
    trees: [],
    picture: null
  }

  this.handleAuth = this.handleAuth.bind(this)
  this.userNavigation = this.userNavigation.bind(this)
  //this.handleBringData = this.handleBringData.bind(this)
  this.uploadFile = this.uploadFile.bind(this)
  this.handleUploadPost = this.handleUploadPost.bind(this)
  this.handleShowHidden = this.handleShowHidden.bind(this)
}

uploadFile(){
    console.log("hola")
    $("#post-img-button-hidden").trigger("click")
}

handleUploadPost(event){

  event.preventDefault()
  var title = $("#form-posting .Title").val()
  var Content = $("#form-posting .Content").val()
  var image = $("#form-posting .image").val()
  var keywords = $("#form-posting .keyword").val()
  var user = this.state.user.displayName;
  var date = new Date()
  var userImg = this.state.user.photoURL;
  var userId = this.state.user.uid;
  firebase.database().ref(`posts/`).push({
    title,
    Content,
    image,
    date,
    keyword_1: keywords,
    user,
    userImg,
    userId
  })
  .then(function(){
    console.log(`enviado ${keywords}`)
  }).catch( error => console.log(error.message))


/* Only for files
 var file = event.target.files[0]
 var postsRef = firebase.storage().ref(`posts/media/${file.name}`)
 var task = storageRef.put(file);

 task.on("state_changed", snapshot => {
   let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
   this.setState({
     uploadValue: percentage
   })
 }, error => {console.log(error.message)
 }, () => {
   this.setState({
     uploadValue: 100,
     picture: task.snapshot.downloadURL
   })
 }
)*/
}

handleShowHidden(){
  $(".hidden").show(600)
  $(".button-to-show").hide(300)
}

handleShowFormat(){
  return(
    <Row className="hidden">
    <div className="col s12">
      <ul>
        <img src={this.state.user.photoURL} width="100px" className="circle" alt={this.state.user.displayName}/>
        <h5 className="name">{this.state.user.displayName}</h5>
      </ul>
    </div>
      <div className="col s12 hidden" id="form-posting">{/*Form to send posts to databse*/}
        <Input className="Title" s={12} label="Titulo"/>
        <Input className="image" s={12} type="URL" label="URL de imagen"/>
        <textarea className="Content" s={12} type="text" placeholder="Write..." height="500px"/>
        <Input className="keyword" s={12} type="text" label="Agrega solo una palabre clave en inglés, puede ser technology, sports, music u opinion"/>
        <Button onClick={this.handleUploadPost}>Enviar Post</Button>
      </div>
    </Row>
  )
}


/*  handleBringData(){
    firebase.database().ref("posts").on("value", snap => {
      var data = snap.val()
      var keys = Object.keys(data)
      for(var i = 0; i < keys.length; i++){
        var k = keys[i]
        var Gname = data[k].Title
        console.log(Gname)

      }
    })
  }*/

  handleAuth (){
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider)
  .then(result => console.log(`${result.user.email} ha iniciado sesión` ))
  .catch(error => console.log(`Error ${error.code}: ${error.message}` ))
}

handleLogout(){
  firebase.auth().signOut()
  .then(result => console.log('has cerrado sesión'))
}

userNavigation(){
    if(this.state.user){
      return(
        <nav className='green lighten-5 user-info'>
          <ul className="right">
            <li className="li-user-info green-text">{this.state.user.displayName}</li>
            <li className="li-user-info profile-photo"><img src={this.state.user.photoURL} className='circle'/></li>
            <li className="li-user-info"><a className="button-to-show btn hoverable" onClick={this.handleShowHidden}>Hacer un Post</a></li>
            <li className="li-user-info"><a onClick={this.handleLogout} className='btn hoverable' href="#sign-out">Sign Out</a></li>
          </ul>
        </nav>
      )
    }else{
      return(
          <nav className='green lighten-5'>
            <ul className='right'>
              <li><a href='#!'>Holo</a></li>
              <li><a href='#!'>Hola</a></li>
              <li><a href='#!'>Hola</a></li>
            </ul>
          </nav>
      )
    }
}

renderWhenLogin(){
  if(this.state.user){
    return(
    <ReactCSSTransitionGroup transitionName="anim" transitionAppear={true} transitionAppearTimeout={5000} transitionEnter={false} transitionLeave={false}>
      <Row className='app-content'>
        <Col className='main-container'>
        {this.handleShowFormat()}
        <Trees/>

          <Container>

          {/*
            this.state.posts.map(post => (

              <div className='col cards'>
                <div className="card">
                  <div className="card-poster-info">
                    <li><img className="poster-photo circle" src={post.userImg}/></li>
                    <li><span className="poster-user-name">{post.user}</span></li>
                    <div className="divider"></div>
                  </div>
                  <div className="card-image">
                    <img src={post.image} alt={post.Title}/>
                  </div>
                  <div className="card-text">
                    <h4>{post.Title}</h4>
                    <p>{post.Content}</p>
                  </div>
                  <div className="card-action">
                    <input className="comment" placeholder="comment"/>
                  </div>
                </div>
              </div>

            )).reverse()
          */}
          </Container>
        </Col>
      </Row>

    </ReactCSSTransitionGroup>
    )
  }else{
    return (
      <div>
      <div className="section white">
      		<div className="row container">
      			<h2 className="header green-text">Bew Posts</h2>
      			<p className="grey-text text-darken-3 lighten-3">Todos los posts que necesitas para siempre estar actualizado sobre lo que pasa en el mundo en todos los temas</p>
      		</div>
      	</div>
      	<Parallax imageSrc="https://c1.sfdcstatic.com/content/dam/blogs/us/thumbnails/8-creative-ways-to-use-instagrams-new-multiple-image-posting-feature/instagram_header.png"/>

      <div className='col s12 on-logout'>
      <button className='btn hoverable btn-signin' onClick={this.handleAuth}>Iniciar sesion</button>
      </div>
      </div>
    )
  }
}

  render() {
    return (
    <ReactCSSTransitionGroup transitionName="anim" transitionAppear={true} transitionAppearTimeout={5000} transitionEnter={false} transitionLeave={false}>
      <div className="App">
        <header className="App-header">
        <div className='con-logo left'>
          <span className="bold green-text">Tecbew</span>
        </div>
          {this.userNavigation()}

        </header>
        {this.renderWhenLogin()}
      </div>

    </ReactCSSTransitionGroup>
    );
  }
}

export default App;

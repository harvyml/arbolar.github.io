import React, {Component} from 'react';
import firebase from 'firebase';
import $ from "jquery";
import './materialize.css';
import './Topics.css';
import {Modal, Icon, Carousel, Row, Col, Card, CardTitle, Parallax, Input, Button, Container, Tabs, Tab} from 'react-materialize';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Topics extends Component{
componentWillMount(){
  firebase.database().ref("posts").orderByChild("keyword_1").equalTo("technology").on("child_added", snap =>{
    this.setState({
      techPosts: this.state.techPosts.concat(snap.val())
    })
  })
  firebase.database().ref("posts").orderByChild("keyword_1").equalTo("sports").on("child_added", snap =>{
    this.setState({
      sportsPosts: this.state.sportsPosts.concat(snap.val())
    })
  })
  firebase.database().ref("posts").orderByChild("keyword_1").equalTo("music").on("child_added", snap =>{
    this.setState({
      musicPosts: this.state.musicPosts.concat(snap.val())
    })
  })
  firebase.database().ref("posts").orderByChild("keyword_1").equalTo("opinion").on("child_added", snap =>{
    this.setState({
      opinionPosts: this.state.opinionPosts.concat(snap.val())
    })
  })
}
  constructor(){
    super()
    this.state = {
      techPosts: [],
      sportsPosts: [],
      musicPosts: [],
      opinionPosts: []
    }
  }

  render(){
    return(
      <Row>
        <div className="topics">
          <Tabs className='tab-topics z-depth-1 center'>
           <Tab title="Technology" className="topic">
           {
             this.state.techPosts.map(post => (
               <div className='cards'>
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
           }
           </Tab>
           <Tab title="Sports" className="topic" active>
           {
             this.state.sportsPosts.map(post => (
               <div className='cards'>
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
           }
           </Tab>
           <Tab title="Music" className="topic">
           {
             this.state.musicPosts.map(post => (
               <div className='cards'>
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
           }
           </Tab>
           <Tab title="Opinion" className="topic">
           {
             this.state.opinionPosts.map(post => (
               <div className='cards'>
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
           }
           </Tab>
          </Tabs>
        </div>
      </Row>
    )
  }
}

export default Topics;

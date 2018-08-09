import React, { Component } from 'react';
import './PostUpload.css';
import firebase from 'firebase';
import './materialize.css';
import {Modal, Icon, Carousel, Row, Col, Card, CardTitle, Parallax} from 'react-materialize';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class PostUpload extends Component{


  render(){
    return(
      <div>{this.handleShowFormat()}</div>
    )
  }
}

export default PostUpload;

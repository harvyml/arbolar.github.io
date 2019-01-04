import React, {Component} from 'react';
import firebase from 'firebase';
import { HeadProvider, Title, Link as LinkHead, Meta } from 'react-head';
import './Trees.css';
import {Modal, Icon, Carousel, Row, Col, Card, CardTitle, Parallax, Input, Button, Container, Tabs, Tab} from 'react-materialize';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {BrowserRouter as Rout} from 'react-router-dom';
import $ from "jquery";

class Trees extends Component{
componentWillMount(){
  firebase.database().ref("trees").on("child_added", snap =>{
    this.setState({
      trees: this.state.trees.concat(snap.val())
    })
  })
}
  constructor(){
    super()
    this.state = {
      trees: []
    }
    this.getTrees = this.getTrees.bind(this)
    this.Head = this.Head.bind(this)
  }

  Head(){
		const { match, location, history } = this.props;
    return (
      <HeadProvider>
          <div className="Home">
            <Title>Arbolar | Arboles {location.path}</Title>
            <Meta name="description" content={location.path} />
          </div>
      </HeadProvider>
    )
	}

  getTrees(){
    return(
      this.state.trees.map(tree => (
        <div className="card tree" key={tree.code}>
          <div className="card-image waves-effect waves-block waves-light">
            <img className="activator" src={tree.img}/>
          </div>
          <div className="card-content">
            <span className="card-title activator grey-text text-darken-4">{tree.name}<i className="material-icons bottom-right">more_vert</i></span>
            <p><a href="#" className="btn hoverable waves white green-text">Enviar</a></p>
          </div>
          <div className="card-reveal">
            <span className="card-title grey-text text-darken-4">{tree.name}<i className="material-icons top-right">close</i></span>
            <p>{tree.description}</p>
            <p><a href="#" href={"tree/"+tree.code} className="btn hoverable waves-light white green-text">Enviar</a></p>
          </div>
        </div>
      )).reverse()
    )
  }

  render(){
    return(
      <Row>
        <div className="trees container">
           {this.getTrees()}
        </div>
      </Row>
    )
  }
}

export default Trees;

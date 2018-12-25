import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom"
import firebase from 'firebase'
import './tree.css'
import {MediaBox} from 'react-materialize'
import { HeadProvider, Title, Link as LinkHead, Meta } from 'react-head';

class Tree extends Component{
	componentWillMount(){
		firebase.database().ref('trees').once('value', snap => {
			snap.forEach(snapchild => {
				this.setState({
					treeCode: this.state.treeCode.concat(snapchild.val())
				})		
			})
		})
	}
	constructor(){
		super()
		this.state = {
			treeCode: [],
			metaTags: []//To put them in the head, so that the SEO improves
		}
		this.verify = this.verify.bind(this)
		this.Head = this.Head.bind(this)
	}


	Head(){
		const { match, location, history } = this.props;

		for (var i in this.state.treeCode){
			if(this.state.treeCode[i].code === match.params.code){
				return (
					<HeadProvider>
				      <div className="Home">
				        <Title>Arbolar | Arbol: {this.state.treeCode[i].code}</Title>
				        <Meta name="description" content={this.state.treeCode[i].description} />
				      </div>
					</HeadProvider>
					
				)

				break
			}
		}
	}


	verify(){
		const { match, location, history } = this.props;
		const tree = this.state.treeCode.map(tc => (
				(tc.code === match.params.code) ?  	<div className="tree">
														<div className="img-container">
															<MediaBox src={tc.img} className="materialboxed"/>
														</div>
														<div className="description">
															<h1 className="title">{tc.name}</h1>
															<p>{tc.description}</p>
															<a href="" className="btn waves hoverable waves-effect green">Ordenar</a>
														</div>
													</div>
												   : ""
			)
		)
		return tree
	}
	render(){
		const { match, location, history } = this.props;
		/*const TreeCode = ({ match }) => {
			this.setState({
				treeCode: match.params.code
			})
			return (
				<h1>Este arbol de nombre {match.params.treeCode} hace esto</h1>
			)
		}*/
		return(
			<div>
			
				{this.verify()}
				{this.Head()}
			</div>
			

		)

	}
}
export default Tree;
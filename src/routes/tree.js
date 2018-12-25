import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom"
import firebase from 'firebase'

class Tree extends Component{
	componentWillMount(){
		firebase.database().ref('trees').on('value', snap => {
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
	}


	verify(){
		const { match, location, history } = this.props;
		const tree = this.state.treeCode.map(tc => (
				(tc.code === match.params.code) ? <div className="card">
								                <div className="card-image waves-effect waves-block waves-light">
								                  <img className="activator" src={tc.img}/>
								                </div>
								                <div className="card-content">
								                  <span className="card-title activator grey-text text-darken-4">{tc.name}<i className="material-icons bottom-right">more_vert</i></span>
								                  <p><a href="#" className="btn hoverable waves white green-text">Enviar</a></p>
								                </div>
								                <div className="card-reveal">
								                  <span className="card-title grey-text text-darken-4">{tc.name}<i className="material-icons top-right">close</i></span>
								                  <p>{tc.description}</p>
								                  <p><a href="#" className="btn hoverable waves-light white green-text">Enviar</a></p>
								                </div>
								              </div> : ""
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
			<div className="container">
				<h1>{this.verify()}</h1>
			</div>
			

		)

	}
}
export default Tree;
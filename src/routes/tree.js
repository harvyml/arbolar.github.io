import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom"
import firebase from 'firebase'

class Tree extends Component{
	componentWillMount(){
		/*firebase.database().ref('trees').on('value', snap => {
			snap.forEach(k => {
				this.setState({
					treeCode: this.state.treeCode.concat(snap.val()[k].code)
				})		
			})
		})*/
	}
	constructor(){
		super()
		this.state = {
			treeCode: '0002'
		}
		this.verify = this.verify.bind(this)
	}


	verify(){
		const { match, location, history } = this.props;
		var tree = (this.state.treeCode === match.params.code) ? <h1>{match.params.code}</h1> : 'something went wrong' 
		console.log(tree)

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
			<h1>{match.params.code} {this.verify()}</h1>

		)

	}
}
export default Tree;
import React, {Component} from 'react'
import Tree from './tree'
import Trees from '../Trees'
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom"

class Routes extends Component{
	constructor(){
		super()
		this.state = {
			treeCode: ''
		}
	}
	render(){
		const TreeCode = ({ match }) => {
			this.setState({
				treeCode: match.params.code
			})
			return (
				<h1>Este arbol de nombre {this.state.treeCode} hace esto</h1>
			)
		}
		return (
			<Router>
				<Switch>
					<Route path="/tree/:code" component={TreeCode}/>
					<Route path="/trees" component={Trees}/>
				</Switch>
			</Router>

		)
	}
}


export default Routes;
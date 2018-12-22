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
		return (
			<Router>
				<Switch>
					<Route path="/tree/:code" component={Tree}/>
					<Route path="/trees" component={Trees}/>
				</Switch>
			</Router>

		)
	}
}


export default Routes;
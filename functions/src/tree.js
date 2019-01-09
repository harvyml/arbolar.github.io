'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

var _reactMaterialize = require('react-materialize');

var _reactHead = require('react-head');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tree = function (_Component) {
	_inherits(Tree, _Component);

	_createClass(Tree, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			var _this2 = this;

			_firebase2.default.database().ref('trees').once('value', function (snap) {
				snap.forEach(function (snapchild) {
					_this2.setState({
						treeCode: _this2.state.treeCode.concat(snapchild.val())
					});
				});
			});
		}
	}]);

	function Tree() {
		_classCallCheck(this, Tree);

		var _this = _possibleConstructorReturn(this, (Tree.__proto__ || Object.getPrototypeOf(Tree)).call(this));

		_this.state = {
			treeCode: [],
			metaTags: [] //To put them in the head, so that the SEO improves
		};
		_this.verify = _this.verify.bind(_this);
		//this.Head = this.Head.bind(this)
		return _this;
	}

	/*
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
 }*/

	_createClass(Tree, [{
		key: 'verify',
		value: function verify() {
			var _props = this.props,
			    match = _props.match,
			    location = _props.location,
			    history = _props.history;

			var tree = this.state.treeCode.map(function (tc) {
				return tc.code === match.params.code ? _react2.default.createElement(
					'div',
					{ className: 'tree', key: tc.code },
					_react2.default.createElement(
						'div',
						{ className: 'img-container' },
						_react2.default.createElement(_reactMaterialize.MediaBox, { src: tc.img, className: 'materialboxed' })
					),
					_react2.default.createElement(
						'div',
						{ className: 'description' },
						_react2.default.createElement(
							'h1',
							{ className: 'title' },
							tc.name
						),
						_react2.default.createElement(
							'p',
							null,
							tc.description
						),
						_react2.default.createElement(
							'a',
							{ href: '', className: 'btn waves hoverable waves-effect green' },
							'Ordenar'
						)
					)
				) : "";
			});
			return tree;
		}
	}, {
		key: 'render',
		value: function render() {
			var _props2 = this.props,
			    match = _props2.match,
			    location = _props2.location,
			    history = _props2.history;
			/*const TreeCode = ({ match }) => {
   	this.setState({
   		treeCode: match.params.code
   	})
   	return (
   		<h1>Este arbol de nombre {match.params.treeCode} hace esto</h1>
   	)
   }*/

			return _react2.default.createElement(
				'div',
				null,
				this.verify()
			);
		}
	}]);

	return Tree;
}(_react.Component);

exports.default = Tree;
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _tree = require('./tree');

var _tree2 = _interopRequireDefault(_tree);

var _Trees = require('./Trees');

var _Trees2 = _interopRequireDefault(_Trees);

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

var _reactRouterDom = require('react-router-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Routes = function (_Component) {
	_inherits(Routes, _Component);

	function Routes() {
		_classCallCheck(this, Routes);

		var _this = _possibleConstructorReturn(this, (Routes.__proto__ || Object.getPrototypeOf(Routes)).call(this));

		_this.state = {
			treeCode: ''
		};
		return _this;
	}

	_createClass(Routes, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				_reactRouterDom.BrowserRouter,
				{ basename: '/' },
				_react2.default.createElement(
					_reactRouterDom.Switch,
					null,
					_react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/', component: _App2.default }),
					_react2.default.createElement(_reactRouterDom.Route, { path: '/tree/:code', component: _tree2.default }),
					_react2.default.createElement(_reactRouterDom.Route, { path: '/trees', component: _Trees2.default })
				)
			);
		}
	}]);

	return Routes;
}(_react.Component);

exports.default = Routes;
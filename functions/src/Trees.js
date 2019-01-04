'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

var _reactHead = require('react-head');

var _reactMaterialize = require('react-materialize');

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _reactRouterDom = require('react-router-dom');

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Trees = function (_Component) {
  _inherits(Trees, _Component);

  _createClass(Trees, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      _firebase2.default.database().ref("trees").on("child_added", function (snap) {
        _this2.setState({
          trees: _this2.state.trees.concat(snap.val())
        });
      });
    }
  }]);

  function Trees() {
    _classCallCheck(this, Trees);

    var _this = _possibleConstructorReturn(this, (Trees.__proto__ || Object.getPrototypeOf(Trees)).call(this));

    _this.state = {
      trees: []
    };
    _this.getTrees = _this.getTrees.bind(_this);
    _this.Head = _this.Head.bind(_this);
    return _this;
  }

  _createClass(Trees, [{
    key: 'Head',
    value: function Head() {
      var _props = this.props,
          match = _props.match,
          location = _props.location,
          history = _props.history;

      return _react2.default.createElement(
        _reactHead.HeadProvider,
        null,
        _react2.default.createElement(
          'div',
          { className: 'Home' },
          _react2.default.createElement(
            _reactHead.Title,
            null,
            'Arbolar | Arboles ',
            location.path
          ),
          _react2.default.createElement(_reactHead.Meta, { name: 'description', content: location.path })
        )
      );
    }
  }, {
    key: 'getTrees',
    value: function getTrees() {
      return this.state.trees.map(function (tree) {
        var _React$createElement;

        return _react2.default.createElement(
          'div',
          { className: 'card tree', key: tree.code },
          _react2.default.createElement(
            'div',
            { className: 'card-image waves-effect waves-block waves-light' },
            _react2.default.createElement('img', { className: 'activator', src: tree.img })
          ),
          _react2.default.createElement(
            'div',
            { className: 'card-content' },
            _react2.default.createElement(
              'span',
              { className: 'card-title activator grey-text text-darken-4' },
              tree.name,
              _react2.default.createElement(
                'i',
                { className: 'material-icons bottom-right' },
                'more_vert'
              )
            ),
            _react2.default.createElement(
              'p',
              null,
              _react2.default.createElement(
                'a',
                { href: '#', className: 'btn hoverable waves white green-text' },
                'Enviar'
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'card-reveal' },
            _react2.default.createElement(
              'span',
              { className: 'card-title grey-text text-darken-4' },
              tree.name,
              _react2.default.createElement(
                'i',
                { className: 'material-icons top-right' },
                'close'
              )
            ),
            _react2.default.createElement(
              'p',
              null,
              tree.description
            ),
            _react2.default.createElement(
              'p',
              null,
              _react2.default.createElement(
                'a',
                (_React$createElement = { href: '#' }, _defineProperty(_React$createElement, 'href', "tree/" + tree.code), _defineProperty(_React$createElement, 'className', 'btn hoverable waves-light white green-text'), _React$createElement),
                'Enviar'
              )
            )
          )
        );
      }).reverse();
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _reactMaterialize.Row,
        null,
        _react2.default.createElement(
          'div',
          { className: 'trees container' },
          this.getTrees()
        )
      );
    }
  }]);

  return Trees;
}(_react.Component);

exports.default = Trees;
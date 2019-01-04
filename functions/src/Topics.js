'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _reactMaterialize = require('react-materialize');

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Topics = function (_Component) {
  _inherits(Topics, _Component);

  _createClass(Topics, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      _firebase2.default.database().ref("posts").orderByChild("keyword_1").equalTo("technology").on("child_added", function (snap) {
        _this2.setState({
          techPosts: _this2.state.techPosts.concat(snap.val())
        });
      });
      _firebase2.default.database().ref("posts").orderByChild("keyword_1").equalTo("sports").on("child_added", function (snap) {
        _this2.setState({
          sportsPosts: _this2.state.sportsPosts.concat(snap.val())
        });
      });
      _firebase2.default.database().ref("posts").orderByChild("keyword_1").equalTo("music").on("child_added", function (snap) {
        _this2.setState({
          musicPosts: _this2.state.musicPosts.concat(snap.val())
        });
      });
      _firebase2.default.database().ref("posts").orderByChild("keyword_1").equalTo("opinion").on("child_added", function (snap) {
        _this2.setState({
          opinionPosts: _this2.state.opinionPosts.concat(snap.val())
        });
      });
    }
  }]);

  function Topics() {
    _classCallCheck(this, Topics);

    var _this = _possibleConstructorReturn(this, (Topics.__proto__ || Object.getPrototypeOf(Topics)).call(this));

    _this.state = {
      techPosts: [],
      sportsPosts: [],
      musicPosts: [],
      opinionPosts: []
    };
    return _this;
  }

  _createClass(Topics, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _reactMaterialize.Row,
        null,
        _react2.default.createElement(
          'div',
          { className: 'topics' },
          _react2.default.createElement(
            _reactMaterialize.Tabs,
            { className: 'tab-topics z-depth-1 center' },
            _react2.default.createElement(
              _reactMaterialize.Tab,
              { title: 'Technology', className: 'topic' },
              this.state.techPosts.map(function (post) {
                return _react2.default.createElement(
                  'div',
                  { className: 'cards' },
                  _react2.default.createElement(
                    'div',
                    { className: 'card' },
                    _react2.default.createElement(
                      'div',
                      { className: 'card-poster-info' },
                      _react2.default.createElement(
                        'li',
                        null,
                        _react2.default.createElement('img', { className: 'poster-photo circle', src: post.userImg })
                      ),
                      _react2.default.createElement(
                        'li',
                        null,
                        _react2.default.createElement(
                          'span',
                          { className: 'poster-user-name' },
                          post.user
                        )
                      ),
                      _react2.default.createElement('div', { className: 'divider' })
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'card-image' },
                      _react2.default.createElement('img', { src: post.image, alt: post.Title })
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'card-text' },
                      _react2.default.createElement(
                        'h4',
                        null,
                        post.Title
                      ),
                      _react2.default.createElement(
                        'p',
                        null,
                        post.Content
                      )
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'card-action' },
                      _react2.default.createElement('input', { className: 'comment', placeholder: 'comment' })
                    )
                  )
                );
              }).reverse()
            ),
            _react2.default.createElement(
              _reactMaterialize.Tab,
              { title: 'Sports', className: 'topic', active: true },
              this.state.sportsPosts.map(function (post) {
                return _react2.default.createElement(
                  'div',
                  { className: 'cards' },
                  _react2.default.createElement(
                    'div',
                    { className: 'card' },
                    _react2.default.createElement(
                      'div',
                      { className: 'card-poster-info' },
                      _react2.default.createElement(
                        'li',
                        null,
                        _react2.default.createElement('img', { className: 'poster-photo circle', src: post.userImg })
                      ),
                      _react2.default.createElement(
                        'li',
                        null,
                        _react2.default.createElement(
                          'span',
                          { className: 'poster-user-name' },
                          post.user
                        )
                      ),
                      _react2.default.createElement('div', { className: 'divider' })
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'card-image' },
                      _react2.default.createElement('img', { src: post.image, alt: post.Title })
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'card-text' },
                      _react2.default.createElement(
                        'h4',
                        null,
                        post.Title
                      ),
                      _react2.default.createElement(
                        'p',
                        null,
                        post.Content
                      )
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'card-action' },
                      _react2.default.createElement('input', { className: 'comment', placeholder: 'comment' })
                    )
                  )
                );
              }).reverse()
            ),
            _react2.default.createElement(
              _reactMaterialize.Tab,
              { title: 'Music', className: 'topic' },
              this.state.musicPosts.map(function (post) {
                return _react2.default.createElement(
                  'div',
                  { className: 'cards' },
                  _react2.default.createElement(
                    'div',
                    { className: 'card' },
                    _react2.default.createElement(
                      'div',
                      { className: 'card-poster-info' },
                      _react2.default.createElement(
                        'li',
                        null,
                        _react2.default.createElement('img', { className: 'poster-photo circle', src: post.userImg })
                      ),
                      _react2.default.createElement(
                        'li',
                        null,
                        _react2.default.createElement(
                          'span',
                          { className: 'poster-user-name' },
                          post.user
                        )
                      ),
                      _react2.default.createElement('div', { className: 'divider' })
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'card-image' },
                      _react2.default.createElement('img', { src: post.image, alt: post.Title })
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'card-text' },
                      _react2.default.createElement(
                        'h4',
                        null,
                        post.Title
                      ),
                      _react2.default.createElement(
                        'p',
                        null,
                        post.Content
                      )
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'card-action' },
                      _react2.default.createElement('input', { className: 'comment', placeholder: 'comment' })
                    )
                  )
                );
              }).reverse()
            ),
            _react2.default.createElement(
              _reactMaterialize.Tab,
              { title: 'Opinion', className: 'topic' },
              this.state.opinionPosts.map(function (post) {
                return _react2.default.createElement(
                  'div',
                  { className: 'cards' },
                  _react2.default.createElement(
                    'div',
                    { className: 'card' },
                    _react2.default.createElement(
                      'div',
                      { className: 'card-poster-info' },
                      _react2.default.createElement(
                        'li',
                        null,
                        _react2.default.createElement('img', { className: 'poster-photo circle', src: post.userImg })
                      ),
                      _react2.default.createElement(
                        'li',
                        null,
                        _react2.default.createElement(
                          'span',
                          { className: 'poster-user-name' },
                          post.user
                        )
                      ),
                      _react2.default.createElement('div', { className: 'divider' })
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'card-image' },
                      _react2.default.createElement('img', { src: post.image, alt: post.Title })
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'card-text' },
                      _react2.default.createElement(
                        'h4',
                        null,
                        post.Title
                      ),
                      _react2.default.createElement(
                        'p',
                        null,
                        post.Content
                      )
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'card-action' },
                      _react2.default.createElement('input', { className: 'comment', placeholder: 'comment' })
                    )
                  )
                );
              }).reverse()
            )
          )
        )
      );
    }
  }]);

  return Topics;
}(_react.Component);

exports.default = Topics;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

var _reactMaterialize = require('react-materialize');

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//import Trees from './Trees';
var config = {
  apiKey: "AIzaSyDpEZklEojaVNvueAG88iXPSJXQD4xYUII",
  authDomain: "sendatree-c3333.firebaseapp.com",
  databaseURL: "https://sendatree-c3333.firebaseio.com",
  projectId: "sendatree-c3333",
  storageBucket: "sendatree-c3333.appspot.com",
  messagingSenderId: "640304247213"
};
_firebase2.default.initializeApp(config);

var App = function (_Component) {
  _inherits(App, _Component);

  _createClass(App, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      _firebase2.default.auth().onAuthStateChanged(function (user) {
        _this2.setState({ user: user });
      });

      /*firebase.database().ref('pictures').on('child_added', snapshot => {
        this.setState({
          pictures: this.state.pictures.concat(snapshot.val())//Se toma el array anterior para crear uno nuevo
        })
      })*/

      /*firebase.database().ref('trees').limitToLast(1).on('child_added', snapshot => {
        this.setState({
          trees: this.state.trees.concat(snapshot.val())//Se toma el array anterior para crear uno nuevo
        })
      })*/
    }
  }]);

  function App() {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

    _this.state = {
      user: null,
      /*pictures: [],*/
      trees: [],
      picture: null
    };

    _this.handleAuth = _this.handleAuth.bind(_this);
    _this.userNavigation = _this.userNavigation.bind(_this);
    //this.handleBringData = this.handleBringData.bind(this)
    _this.uploadFile = _this.uploadFile.bind(_this);
    _this.handleUploadPost = _this.handleUploadPost.bind(_this);
    _this.handleShowHidden = _this.handleShowHidden.bind(_this);
    _this.renderWhenLogin = _this.renderWhenLogin.bind(_this);
    return _this;
  }

  _createClass(App, [{
    key: 'uploadFile',
    value: function uploadFile() {
      console.log("hola");
      (0, _jquery2.default)("#post-img-button-hidden").trigger("click");
    }
  }, {
    key: 'handleUploadPost',
    value: function handleUploadPost(event) {

      event.preventDefault();
      var title = (0, _jquery2.default)("#form-posting .Title").val();
      var Content = (0, _jquery2.default)("#form-posting .Content").val();
      var image = (0, _jquery2.default)("#form-posting .image").val();
      var keywords = (0, _jquery2.default)("#form-posting .keyword").val();
      var user = this.state.user.displayName;
      var date = new Date();
      var userImg = this.state.user.photoURL;
      var userId = this.state.user.uid;
      _firebase2.default.database().ref('posts/').push({
        title: title,
        Content: Content,
        image: image,
        date: date,
        keyword_1: keywords,
        user: user,
        userImg: userImg,
        userId: userId
      }).then(function () {
        console.log('enviado ' + keywords);
      }).catch(function (error) {
        return console.log(error.message);
      });

      /* Only for files
       var file = event.target.files[0]
       var postsRef = firebase.storage().ref(`posts/media/${file.name}`)
       var task = storageRef.put(file);
      
       task.on("state_changed", snapshot => {
         let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
         this.setState({
           uploadValue: percentage
         })
       }, error => {console.log(error.message)
       }, () => {
         this.setState({
           uploadValue: 100,
           picture: task.snapshot.downloadURL
         })
       }
      )*/
    }
  }, {
    key: 'handleShowHidden',
    value: function handleShowHidden() {
      (0, _jquery2.default)(".hidden").show(600);
      (0, _jquery2.default)(".button-to-show").hide(300);
    }
  }, {
    key: 'handleShowFormat',
    value: function handleShowFormat() {
      return _react2.default.createElement(
        _reactMaterialize.Row,
        { className: 'hidden' },
        _react2.default.createElement(
          'div',
          { className: 'col s12' },
          _react2.default.createElement(
            'ul',
            null,
            _react2.default.createElement('img', { src: this.state.user.photoURL, width: '100px', className: 'circle', alt: this.state.user.displayName }),
            _react2.default.createElement(
              'h5',
              { className: 'name' },
              this.state.user.displayName
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'col s12 hidden', id: 'form-posting' },
          _react2.default.createElement(_reactMaterialize.Input, { className: 'Title', s: 12, label: 'Titulo' }),
          _react2.default.createElement(_reactMaterialize.Input, { className: 'image', s: 12, type: 'URL', label: 'URL de imagen' }),
          _react2.default.createElement('textarea', { className: 'Content', s: 12, type: 'text', placeholder: 'Write...', height: '500px' }),
          _react2.default.createElement(_reactMaterialize.Input, { className: 'keyword', s: 12, type: 'text', label: 'Agrega solo una palabre clave en ingl\xE9s, puede ser technology, sports, music u opinion' }),
          _react2.default.createElement(
            _reactMaterialize.Button,
            { onClick: this.handleUploadPost },
            'Enviar Post'
          )
        )
      );
    }

    /*  handleBringData(){
        firebase.database().ref("posts").on("value", snap => {
          var data = snap.val()
          var keys = Object.keys(data)
          for(var i = 0; i < keys.length; i++){
            var k = keys[i]
            var Gname = data[k].Title
            console.log(Gname)
    
          }
        })
      }*/

  }, {
    key: 'handleAuth',
    value: function handleAuth() {
      var provider = new _firebase2.default.auth.GoogleAuthProvider();

      _firebase2.default.auth().signInWithPopup(provider).then(function (result) {
        return console.log(result.user.email + ' ha iniciado sesi\xF3n');
      }).catch(function (error) {
        return console.log('Error ' + error.code + ': ' + error.message);
      });
      console.log("Something");
    }
  }, {
    key: 'handleLogout',
    value: function handleLogout() {
      _firebase2.default.auth().signOut().then(function (result) {
        return console.log('has cerrado sesión');
      });
    }
  }, {
    key: 'userNavigation',
    value: function userNavigation() {
      if (this.state.user) {
        return _react2.default.createElement(
          'nav',
          { className: 'green lighten-5 user-info' },
          _react2.default.createElement(
            'ul',
            { className: 'right' },
            _react2.default.createElement(
              'li',
              { className: 'li-user-info green-text' },
              this.state.user.displayName
            ),
            _react2.default.createElement(
              'li',
              { className: 'li-user-info profile-photo' },
              _react2.default.createElement('img', { src: this.state.user.photoURL, className: 'circle' })
            ),
            _react2.default.createElement(
              'li',
              { className: 'li-user-info' },
              _react2.default.createElement(
                'a',
                { className: 'button-to-show btn hoverable', onClick: this.handleShowHidden },
                'Hacer un Post'
              )
            ),
            _react2.default.createElement(
              'li',
              { className: 'li-user-info' },
              _react2.default.createElement(
                'a',
                { onClick: this.handleLogout, className: 'btn hoverable', href: '#sign-out' },
                'Sign Out'
              )
            )
          )
        );
      } else {
        return _react2.default.createElement(
          'nav',
          { className: 'green lighten-5' },
          _react2.default.createElement(
            'ul',
            { className: 'right' },
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                'a',
                { href: '#!' },
                'Holo'
              )
            ),
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                'a',
                { href: '#!' },
                'Hola'
              )
            ),
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                'a',
                { href: '#!' },
                'Hola'
              )
            )
          )
        );
      }
    }
  }, {
    key: 'renderWhenLogin',
    value: function renderWhenLogin() {
      if (this.state.user) {
        return _react2.default.createElement(
          _reactAddonsCssTransitionGroup2.default,
          { transitionName: 'anim', transitionAppear: true, transitionAppearTimeout: 5000, transitionEnter: false, transitionLeave: false },
          _react2.default.createElement(
            _reactMaterialize.Row,
            { className: 'app-content' },
            _react2.default.createElement(
              _reactMaterialize.Col,
              { className: 'main-container' },
              this.handleShowFormat(),
              _react2.default.createElement(
                _reactMaterialize.Container,
                null,
                _react2.default.createElement(_routes2.default, null)
              )
            )
          )
        );
      } else {
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'div',
            { className: 'section white' },
            _react2.default.createElement(
              'div',
              { className: 'row container' },
              _react2.default.createElement(
                'h2',
                { className: 'header green-text' },
                'Bew Posts'
              ),
              _react2.default.createElement(
                'p',
                { className: 'grey-text text-darken-3 lighten-3' },
                'Todos los posts que necesitas para siempre estar actualizado sobre lo que pasa en el mundo en todos los temas'
              )
            )
          ),
          _react2.default.createElement(_reactMaterialize.Parallax, { imageSrc: 'https://c1.sfdcstatic.com/content/dam/blogs/us/thumbnails/8-creative-ways-to-use-instagrams-new-multiple-image-posting-feature/instagram_header.png' }),
          _react2.default.createElement(
            'div',
            { className: 'col s12 on-logout' },
            _react2.default.createElement(
              'button',
              { className: 'btn hoverable btn-signin', type: 'button', onClick: this.handleAuth },
              'Iniciar sesion'
            )
          )
        );
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _reactAddonsCssTransitionGroup2.default,
        { transitionName: 'anim', transitionAppear: true, transitionAppearTimeout: 5000, transitionEnter: false, transitionLeave: false },
        _react2.default.createElement(
          'div',
          { className: 'App' },
          _react2.default.createElement(
            'header',
            { className: 'App-header' },
            _react2.default.createElement(
              'div',
              { className: 'con-logo left' },
              _react2.default.createElement(
                'span',
                { className: 'bold green-text' },
                'Tecbew'
              )
            ),
            this.userNavigation()
          ),
          this.renderWhenLogin()
        )
      );
    }
  }]);

  return App;
}(_react.Component);

exports.default = App;
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FPS = 20;
var STEP = 1;
var TIMEOUT = 1 / FPS * 1000;

var Marquee = function (_Component) {
  _inherits(Marquee, _Component);

  function Marquee(props) {
    _classCallCheck(this, Marquee);

    var _this = _possibleConstructorReturn(this, (Marquee.__proto__ || Object.getPrototypeOf(Marquee)).call(this, props));

    _this.state = {
      animatedWidth: 0,
      overflowWidth: 0
    };

    _this.handleMouseEnter = _this.handleMouseEnter.bind(_this);
    _this.handleMouseLeave = _this.handleMouseLeave.bind(_this);
    return _this;
  }

  _createClass(Marquee, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._measureText();

      if (this.props.hoverToStop) {
        this._startAnimation();
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this._measureText();

      if (this.props.hoverToStop) {
        this._startAnimation();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this._marqueeTimer);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.text.length != nextProps.text.length) {
        clearTimeout(this._marqueeTimer);
        this.setState({
          animatedWidth: 0
        });
      }
    }
  }, {
    key: 'handleMouseEnter',
    value: function handleMouseEnter() {
      if (this.props.hoverToStop) {
        clearTimeout(this._marqueeTimer);
      } else if (this.state.overflowWidth > 0) {
        this._startAnimation();
      }
    }
  }, {
    key: 'handleMouseLeave',
    value: function handleMouseLeave() {
      if (this.props.hoverToStop && this.state.overflowWidth > 0) {
        this._startAnimation();
      } else {
        clearTimeout(this._marqueeTimer);
        this.setState({
          animatedWidth: 0
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var style = {
        'position': 'relative',
        'right': this.state.animatedWidth,
        'whiteSpace': 'nowrap'
      };

      if (this.state.overflowWidth < 0) {
        return _react2.default.createElement(
          'div',
          { className: 'ui-marquee ' + this.props.className, style: { overflow: 'hidden' } },
          _react2.default.createElement(
            'span',
            { ref: 'text', style: style, title: this.props.text },
            this.props.text
          )
        );
      } else {
        return _react2.default.createElement(
          'div',
          { className: 'ui-marquee ' + this.props.className, style: { overflow: 'hidden' },
            onMouseEnter: this.handleMouseEnter,
            onMouseLeave: this.handleMouseLeave },
          _react2.default.createElement(
            'span',
            { ref: 'text', style: style, title: this.props.text },
            this.props.text
          )
        );
      }
    }
  }, {
    key: '_startAnimation',
    value: function _startAnimation() {
      var _this2 = this;

      clearTimeout(this._marqueeTimer);
      var isLeading = this.state.animatedWidth === 0;
      var timeout = isLeading ? this.props.leading : TIMEOUT;

      var animate = function animate() {
        var overflowWidth = _this2.state.overflowWidth;

        var animatedWidth = _this2.state.animatedWidth + STEP;
        var isRoundOver = animatedWidth > overflowWidth;

        if (isRoundOver) {
          if (_this2.props.loop) {
            animatedWidth = 0;
          } else {
            return;
          }
        }

        if (isRoundOver && _this2.props.trailing) {
          _this2._marqueeTimer = setTimeout(function () {
            _this2.setState({
              animatedWidth: animatedWidth
            });

            _this2._marqueeTimer = setTimeout(animate, TIMEOUT);
          }, _this2.props.trailing);
        } else {
          _this2.setState({
            animatedWidth: animatedWidth
          });

          _this2._marqueeTimer = setTimeout(animate, TIMEOUT);
        }
      };

      this._marqueeTimer = setTimeout(animate, timeout);
    }
  }, {
    key: '_measureText',
    value: function _measureText() {
      var container = _reactDom2.default.findDOMNode(this);
      var node = _reactDom2.default.findDOMNode(this.refs.text);

      if (container && node) {
        var containerWidth = container.offsetWidth;
        var textWidth = node.offsetWidth;
        var overflowWidth = textWidth - containerWidth;

        if (overflowWidth !== this.state.overflowWidth) {
          this.setState({
            overflowWidth: overflowWidth
          });
        }
      }
    }
  }]);

  return Marquee;
}(_react.Component);

Marquee.defaultProps = {
  text: '',
  hoverToStop: false,
  loop: false,
  leading: 0,
  trailing: 0
};

Marquee.propTypes = {
  text: _propTypes2.default.string,
  hoverToStop: _propTypes2.default.bool,
  loop: _propTypes2.default.bool,
  leading: _propTypes2.default.number,
  trailing: _propTypes2.default.number,
  className: _propTypes2.default.string
};

module.exports = Marquee;
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FPS = 20;
var STEP = 1;
var TIMEOUT = 1 / FPS * 1000;

var Marquee = _react2.default.createClass({
  displayName: 'Marquee',

  propTypes: {
    text: _react.PropTypes.string,
    hoverToStop: _react.PropTypes.bool,
    loop: _react.PropTypes.bool,
    leading: _react.PropTypes.number,
    trailing: _react.PropTypes.number,
    className: _react.PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      text: '',
      hoverToStop: false,
      loop: false,
      leading: 0,
      trailing: 0
    };
  },
  getInitialState: function getInitialState() {
    return {
      animatedWidth: 0,
      overflowWidth: 0
    };
  },
  componentDidMount: function componentDidMount() {
    this._measureText();

    if (this.props.hoverToStop) {
      this._startAnimation();
    }
  },
  componentDidUpdate: function componentDidUpdate() {
    this._measureText();

    if (this.props.hoverToStop) {
      this._startAnimation();
    }
  },
  componentWillUnmount: function componentWillUnmount() {
    clearTimeout(this._marqueeTimer);
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (this.props.text.length != nextProps.text.length) {
      clearTimeout(this._marqueeTimer);
      this.setState({
        animatedWidth: 0
      });
    }
  },
  handleMouseEnter: function handleMouseEnter() {
    if (this.props.hoverToStop) {
      clearTimeout(this._marqueeTimer);
    } else if (this.state.overflowWidth > 0) {
      this._startAnimation();
    }
  },
  handleMouseLeave: function handleMouseLeave() {
    if (this.props.hoverToStop && this.state.overflowWidth > 0) {
      this._startAnimation();
    } else {
      clearTimeout(this._marqueeTimer);
      this.setState({
        animatedWidth: 0
      });
    }
  },
  render: function render() {
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
  },
  _startAnimation: function _startAnimation() {
    var _this = this;

    clearTimeout(this._marqueeTimer);
    var isLeading = this.state.animatedWidth === 0;
    var timeout = isLeading ? this.props.leading : TIMEOUT;

    var animate = function animate() {
      var overflowWidth = _this.state.overflowWidth;

      var animatedWidth = _this.state.animatedWidth + STEP;
      var isRoundOver = animatedWidth > overflowWidth;

      if (isRoundOver) {
        if (_this.props.loop) {
          animatedWidth = 0;
        } else {
          return;
        }
      }

      if (isRoundOver && _this.props.trailing) {
        _this._marqueeTimer = setTimeout(function () {
          _this.setState({
            animatedWidth: animatedWidth
          });

          _this._marqueeTimer = setTimeout(animate, TIMEOUT);
        }, _this.props.trailing);
      } else {
        _this.setState({
          animatedWidth: animatedWidth
        });

        _this._marqueeTimer = setTimeout(animate, TIMEOUT);
      }
    };

    this._marqueeTimer = setTimeout(animate, timeout);
  },
  _measureText: function _measureText() {
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
});

module.exports = Marquee;
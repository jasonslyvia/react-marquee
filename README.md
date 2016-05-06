# react-marquee [![npm version](https://badge.fury.io/js/react-marquee.svg)](http://badge.fury.io/js/react-marquee)

A plain old `<marquee>` tag replacement in React component.

## Installation

```
$ npm install --save react-marquee
```

## Usage

```javascript
var ReactDOM = require('react-dom');
var Marquee = require('react-marquee');

ReactDOM.render(
  <Marquee text="this is a very very very very very very very very very very very very very very very very long text" />
, document.body);
```

## Props

### text

Type: String Default: `""`

The text displayed in marquee.

### hoverToStop

Type: Bool Default: `false`

By default, only hover makes the marquee move.

### loop

Type: Bool Default: `false`

Whether or not loop the marquee.

### leading

Type: Number Default: `0`

The leading waiting time for the marquee to move.

### trailing

Type: Number Default: `0`

The trailing waiting time for the marquee to start over.

## Scripts

```
$ npm run build
```

## License

MIT

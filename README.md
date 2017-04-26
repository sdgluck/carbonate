# carbonate

> 🎨 colourful sprintf

Made with ❤ at [@outlandish](http://www.twitter.com/outlandish)

<a href="http://badge.fury.io/js/carbonate"><img alt="npm version" src="https://badge.fury.io/js/carbonate.svg"></a>
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

```js
sprintf('I do not like %s(green) and ham.', 'green eggs')
sprintf('I do not like them, %s(yellow.bold.underline).', 'Sam-I-am')
```

🍪 Give some colour to your sprintf strings with [chalk](https://github.com/chalk/chalk).

✨ Written for ES2015 environments.
 
👉 Use your preferred bundler and transpiler as required.

## Install

```sh
npm install --save carbonate
```

```sh
yarn add carbonate
```

## Import

```js
// ES2015
import sprintf from 'carbonate'
```

```js
// CommonJS
var sprintf = require('carbonate')
```

## Usage

### `sprintf(str[, ...values]) : String`

Format a string with values.

- __str__ {String} The string to format
- [__values__] {Any} Values to interpolate

Returns a string.

Examples:

```js
// simple colour
sprintf('I do not like %s(green) and ham.', 'green eggs')

// use chalk's chaining for bold, etc.
sprintf('I do not like them, %s(yellow.bold.underline).', 'Sam-I-am')
```

### `sprintf.log(str[, ...values])`

Format and console.log a string.

- __str__ {String} The string to format
- [__values__] {Any} Values to interpolate

### Type specifiers

All specifiers in [`sprintf.js`](https://github.com/alexei/sprintf.js) are available.

## Contributing

All pull requests and issues welcome!

If you're not sure how, check out the [great video tutorials on egghead.io](http://bit.ly/2aVzthz)!

## License

MIT © [Sam Gluck](github.com/sdgluck)

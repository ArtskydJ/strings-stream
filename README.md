strings-stream
=========

> A streaming unix `strings` port

[![Build Status](https://travis-ci.org/ArtskydJ/strings-stream.svg)](https://travis-ci.org/ArtskydJ/strings-stream)

# example

```js
var stringsStream = require('strings-stream')

process.stdin
	.pipe(stringsStream())
	.pipe(process.stdout)
```

# api

```js
var stringsStream = require('strings-stream')
```

# `var stream = stringsStream([opts])`

- `opts` is an optional object of options
	- `minLength` is the minimum length a string has to be to make it through. (Like the `-n`/`--bytes` option in `strings`.) *Default:* `4`. (Same as `strings`.)
- **Returns** `stream`, which is a through stream

# install

With [npm](http://nodejs.org/download) do:

	npm install strings-stream

# license

[MIT](http://opensource.org/licenses/mit)

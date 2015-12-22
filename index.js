var through2 = require('through2')
var xtend = require('xtend')
var EOL = require('os').EOL

function isStringy(val) { // a-zA-Z0-9\t
	return (val >= 32 && val <= 126) || val === 9
}

module.exports = function stringsStream(options) {
	var opts = xtend({ minLength: 4 }, options)
	return new through2(function (chunk, enc, cb) {
		var stringLike = false
		var stringStart = 0
		for (var i = 0; i <= chunk.length; i++) {
			var pieceIsStringLike = isStringy(chunk[i])
			if (!stringLike && pieceIsStringLike) {
				stringStart = i
			} else if (stringLike && !pieceIsStringLike && i - stringStart >= opts.minLength /*&& chunk[i] === 0*/) {
				this.push(chunk.slice(stringStart, i) + EOL)
			}
			stringLike = pieceIsStringLike
		}
		cb()
	})
}

//C:\Users\Michael\Github\strings-stream>cat test\What_Wondrous_Love_is_This.ppt | node -e "process.stdin.pipe(require('./index.js')()).pipe(process.stdout)"

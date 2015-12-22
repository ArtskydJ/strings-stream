var through2 = require('through2')

function isStringy(val) { // a-zA-Z0-9\t //\n
	return (val >= 32 && val <= 126) || val === 9 // || val === 10
}

module.exports = function stringsStream() {
	return new through2(function (chunk, enc, cb) {
		var stringLike = false
		var stringStart = 0
		for (var i = 0; i < chunk.length; i++) {
			var pieceIsStringLike = isStringy(chunk[i])
			if (!stringLike && pieceIsStringLike) {
				stringStart = i
			} else if (stringLike && !pieceIsStringLike) {
				this.push(chunk.slice(stringStart, i - 1))
			} else if (stringLike && i === chunk.length - 1) {
				this.push(chunk.slice(stringStart))
			}
			stringLike = pieceIsStringLike
		}
		cb()
	})
}

//C:\Users\Michael\Github\strings-stream>cat test\What_Wondrous_Love_is_This.ppt | node -e "process.stdin.pipe(require('./index.js')()).pipe(process.stdout)"

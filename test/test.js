var test = require('tape')
var compare = require('equal-streams')
var fs = require('fs')
var path = require('path')
var stringsStream = require('../index.js')

test('basic functionality', function (t) {
	var actualStream = fs.createReadStream(path.join(__dirname, 'What_Wondrous_Love_is_This.ppt'))
	var expectStream = fs.createReadStream(path.join(__dirname, 'wwlit_strings.txt'))
	compare(actualStream.pipe(stringsStream()), expectStream, function (err, equal) {
		t.ifError(err)
		t.ok(equal, 'the streams are equal')
		t.end()
	})
})

var test = require('tape')
var compare = require('equal-streams')
var fs = require('fs')
var cp = require('child_process')
var path = require('path')
var stringsStream = require('../index.js')

// If you do NOT have a `strings` executable
test('basic functionality', function (t) {
	var eol = process.platform === 'win32' ? 'crlf' : 'lf'
	var expectFilename = 'wwlit_strings_' + eol + '.txt'
	var actualStream = fs.createReadStream(path.join(__dirname, 'What_Wondrous_Love_is_This.ppt'))
	var expectStream = fs.createReadStream(path.join(__dirname, expectFilename))
	compare(actualStream.pipe(stringsStream()), expectStream, function (err, equal) {
		t.ifError(err)
		t.ok(equal, 'the streams are equal')
		t.end()
	})
})

// If you have a `strings` executable
test('spawn strings process', function (t) {
	var actualStream = fs.createReadStream(path.join(__dirname, 'What_Wondrous_Love_is_This.ppt'))
	var proc = cp.spawn('strings')
	actualStream.pipe(proc.stdin)
	compare(actualStream.pipe(stringsStream()), proc.stdout, function (err, equal) {
		t.ifError(err)
		t.ok(equal, 'the streams are equal')
		t.end()
	})
})

// If you have a `strings` executable
test('minLength option', function (t) {
	var actualStream = fs.createReadStream(path.join(__dirname, 'What_Wondrous_Love_is_This.ppt'))
	var proc = cp.spawn('strings', ['-n', '10' ])
	actualStream.pipe(proc.stdin)
	compare(actualStream.pipe(stringsStream({ minLength: 10 })), proc.stdout, function (err, equal) {
		t.ifError(err)
		t.ok(equal, 'the streams are equal')
		t.end()
	})
})

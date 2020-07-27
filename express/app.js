// var http = require('http')
var fs = require('fs')
var tpl = require('art-template')
var url = require('url')
var express = require('express')

var comments = [
	{
		uname: '右',
		message: '早上好',
		date: '2020-07-26'
	}, {
		uname: '右2',
		message: '早上好',
		date: '2020-07-26'
	}, {
		uname: '右3',
		message: '早上好',
		date: '2020-07-26'
	}, {
		uname: '右4',
		message: '早上好',
		date: '2020-07-26'
	}, {
		uname: '右5',
		message: '早上好',
		date: '2020-07-26'
	} 
]

var app = express()

app.use('/public/', express.static('public'))
// app.use(express.static('./public'))

app.get('/', function (req, res) {
	fs.readFile('./views/index.html', function (err, data) {
		if (err) {
			return res.end('404 Page Not Found.')
		}
		var data = tpl.render(data.toString(), {
			comments: comments
		})
		res.end(data)
	})
})

app.get('/post', function (req, res) {
	fs.readFile('views/post.html', function (err, data) {
		if (err) {
			return res.end('404 Page Not Found.')
		}
		res.end(data)
	})
})

app.get('/message', function (req, res) {
	var parseObj = url.parse(req.url, true)
	var messages = parseObj.query
	messages.date = '2020-07-26'
	comments.unshift(messages)
	res.statusCode = 302
	res.setHeader('Location', '/')
	res.end()
})

// 访问的地址无效
app.get('*', function (req, res) {
	fs.readFile('views/404.html', function (err, data) {
		if (err) {
			return res.end('404 Page Not Found.')
		}
		res.end(data)
	})
})

app.listen(3000, function () {
	console.log('Server is running...')
})
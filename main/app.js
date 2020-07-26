// 把当前模块所有的依赖都声明在文件模块最上面
// 为了让目录结构清晰，统一把html页面文件放在views中
// 为了方便统一处理html文件中静态资源，将这些文件存放在public目录中
// 哪些资源能被用户访问，哪些不能，都是可以控制的

var http = require('http')
var fs = require('fs')
var tpl = require('art-template')
// url 解析路径
var url = require('url')

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

// 可以简写为以下方式
http
	.createServer(function (req, res) {
		// 使用 url.parse 方法将路径解析为一个方便操作的对象
		// 第二个参数为true表示直接将查询字符串转为一个对象
		var parseObj = url.parse(req.url, true)
		// 单独获取不包含查询字符串的路径部分（不包含？后的内容）
		var pathname = parseObj.pathname
		if (pathname === '/') {
			fs.readFile('./views/index.html', function (err, data) {
				if (err) {
					return res.end('404 Page Not Found.')
				}
				var data = tpl.render(data.toString(), {
					comments: comments
				})
				res.end(data)
			})
			// str.indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置
			// stringObject.indexOf(searchvalue,fromindex)
		} else if (pathname === '/post') {
			fs.readFile('views/post.html', function (err, data) {
				if (err) {
					return res.end('404 Page Not Found.')
				}
				res.end(data)
			})
		} else if (pathname === '/message') {
			// 无论/message之后有什么都不会读取
			// res.setHeader('Content-Type', 'text/plain; charset=utf-8')
			// 一个请求只对应一个响应，响应结束该次请求也结束
			// res.end(JSON.stringify(parseObj.query))
			// 1. 获取表单提交的数据 parseObj.query
			// 2. 将当前日期数据到对象中，然后存储到数组中
			var messages = parseObj.query
			messages.date = '2020-07-26'
			comments.unshift(messages)
			// 3. 让用户重定向跳转并刷新页面数据
			// 如何通过服务器让客户端重定向
			// 		1) 状态码设置为302临时重定向
			// 				statusCode
			// 		2）在响应头中通过Location告诉客户端往哪重定向
			// 				setHeader
			// 如果客户端发现收到服务器的状态响应码302就会自动去响应头中找Location
			res.statusCode = 302
			res.setHeader('Location', '/')
			res.end()
		} else if (pathname.indexOf('/public/') === 0) {
			// /public/css/main.css
			// /public/js/main.js
			// /public/lib/jquery.js
			// 统一处理：
			//		如果请求路径是以 /public/ 开头的，则认为要获取public中的某个资源
			// 		直接将请求路径当作文件路径来直接进行读取
			fs.readFile('.' + pathname, function (err, data) {
				if (err) {
					return re.end('404 Not Found.')
				}
				res.end(data)
			})
		} else {
			fs.readFile('./views/404.html', function (err, data) {
				if (err) {
					return res.end('404 Not Found.')
				}
				res.end(data)
			})
		}
	})

	.listen(3000, function () {
		console.log('Server is running...')
	})
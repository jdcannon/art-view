var tumblr = require('tumblr.js');
var express = require('express');
var app = express();
var client = tumblr.createClient({consumer_key: '3JEQNaCRUPDkflqsenp1W45bGlM5McfxU0cUWZrBJgyNsBJN0r'});

function getOriginals(posts, name){
		return posts.filter(function(e){
				if(e.trail.length > 0){
						return e.trail[0].blog.name == name;
				} else {
						return false;
				}
		});
}

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(req, res){
		res.render('pages/index');
});
app.get('/blog/:blogName', function(req, res){
		let blogName = req.params.blogName;
		let blog = blogName + '.tumblr.com';
		client.blogPosts(blog, {type: 'photo', limit: 50}, function(err, data){
				if (!err){
						let originals = getOriginals(data.posts, blogName);
						if(originals.length > 0){
								res.render('pages/user', {blog: blogName, posts: originals});
						} else {
								res.render('pages/user', {blog: blogName, posts: []});
						}
				}
		});
});
app.get('/blog/:blogName/p-:page', function(req, res){
		let offset = (req.params.page -1) * 50;
		let blogName = req.params.blogName;
		let blog = blogName + '.tumblr.com';
		client.blogPosts(blog, {type: 'photo', limit: 50, offset: offset}, function(err, data){
				if (!err){
						let originals = getOriginals(data.posts, blogName);
						if(originals.length > 0){
								res.render('pages/user', {blog: blogName, posts: originals});
						} else {
								res.render('pages/user', {blog: blogName, posts: []});
						}
				}
		});
});
app.get('/blog/:blogName/:tag', function(req, res){
		let tag =  req.params.tag;
		let blogName = req.params.blogName;
		let blog = blogName + '.tumblr.com';
		client.blogPosts(blog, {type: 'photo', limit: 50, tag: tag}, function(err, data){
				if (!err){
						let originals = getOriginals(data.posts, blogName);
						if(originals.length > 0){
								res.render('pages/user', {blog: blogName, posts: originals});
						} else {
								res.render('pages/user', {blog: blogName, posts: []});
						}
				}
		});
});
app.get('/blog/:blogName/:tag/p-:page', function(req, res){
		let offset = (req.params.page -1) * 50;
		let tag = req.params.tag;
		let blogName = req.params.blogName;
		let blog = blogName + '.tumblr.com';
		client.blogPosts(blog, {type: 'photo', tag: tag, limit: 50, offset: offset}, function(err, data){
				if (!err){
						let originals = getOriginals(data.posts, blogName);
						if(originals.length > 0){
								res.render('pages/user', {blog: blogName, posts: originals});
						} else {
								res.render('pages/user', {blog: blogName, posts: []});
						}
				}
		});
});

app.listen(app.get('port'), function(){
		console.log('App Running on Port: ', app.get('port'));
});
		
		

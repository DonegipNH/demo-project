var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

mongoose.connect('mongodb://localhost/project3');
var db = mongoose.connection;
 
db.on('error', console.error.bind(console, 'connection error:'));
 
db.once('open', function() {
  console.log("Connection Successful!");
}); 

var channelRoute = require('./routes/chanel.route');
var authRoute = require('./routes/auth.route');
var userRoute = require('./routes/user.route');
var authMiddleware = require('./middlewares/auth.middleware');

var app = express();

var port = 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })); 
// parse application/json
app.use(bodyParser.json());
app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
app.use('/chanel', authMiddleware.requireAuth,channelRoute);
app.use('/auth', authRoute);
app.use('/users', authMiddleware.requireAuth,userRoute);
app.use(express.static(__dirname + '/views/chanels'));

app.get('/', function(req, res){
    res.render('index');
});

app.listen(3000, function(){
    console.log('Server is listening at: ' + port);
});
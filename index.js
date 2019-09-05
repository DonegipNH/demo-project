var express = require('express');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/project3');
var db = mongoose.connection;
 
db.on('error', console.error.bind(console, 'connection error:'));
 
db.once('open', function() {
  console.log("Connection Successful!");
}); 

var channelRoute = require('./routes/chanel.route');

var app = express();

var port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'));
app.use('/chanel', channelRoute);

app.get('/', function(req, res){
    res.render('index');
});

app.listen(3000, function(){
    console.log('Server is listening at: ' + port);
});
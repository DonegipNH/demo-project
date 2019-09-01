var express = require('express');

var app = express();

var port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'));

app.get('/', function(req, res){
    res.render('index');
});

app.listen(3000, function(){
    console.log('Server is listening at: ' + port);
});
var url = require('url');
var queryString = require('querystring');

var chanel = require('../models/chanel.model');

module.exports.index = function(req, res){
    res.render('chanels/chanelIndex');
};

module.exports.update = function(req, res){
    var urlData = url.parse(req.url);
    var queryData = queryString.parse(urlData.query);
    var temperature = {
        value: queryData.value,
        time: new Date()
    };
    var temp = new chanel(temperature);
    temp.save(function(err, data){
        if(err) return console.error(err);
        console.log(data.value + " saved to chanel collection.");      
    });
    res.redirect('/chanel');
};

module.exports.get = function(req, res){    
    res.writeHead(200, {
        'Content-Type':'application/json'
    });    
    res.end(JSON.stringify());    
};
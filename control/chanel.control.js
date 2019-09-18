var url = require('url');
var queryString = require('querystring');

var chanel = require('../models/chanel.model');

module.exports.index = function(req, res){
    chanel.find({}, function(err, tempData){
        var tempDataMap = [];
        tempData.forEach(function(temp){            
            tempDataMap.push(temp);
        });        
        res.render('chanels/chanelIndex', {
            temperatureData: tempDataMap
        });
    });        
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
        'Content-Type': 'application/json'
    });
    chanel.find({}, function(err, tempData){
        var tempDataMap = [];
        tempData.forEach(function(temp){
            // tempDataMap[temp._id] = temp;
            tempDataMap.push(temp);
        });
        console.log(tempData);
        res.end(JSON.stringify(tempDataMap));
    });
};
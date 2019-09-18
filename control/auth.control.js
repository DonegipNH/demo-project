var user = require('../models/user.model');
var bcrypt = require('bcryptjs');

module.exports.login = function(req, res){
    res.render('auth/login', {
        error: []
    });
};

module.exports.postLogin = function(req, res){
    var email = req.body.email;
    var password = req.body.password;   
    userCheck = user.find({email: email}, function(err, userData){        
        if(!userData){
            res.render('auth/login', {
                error: [
                    'User does not exist.'
                ]
            });
            return;
        }  
        bcrypt.compare(password, userData[0].password, function(err, res){
            if(!res){           
                res.render('auth/login', {
                    error: [
                        'Password is not true.'
                    ]
                });
                return;
            }
        });        

        // send the cookie
        res.cookie('userId', userData[0].id);
        res.redirect('/chanel');
    });        
};
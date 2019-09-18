var user = require('../models/user.model');
var bcrypt = require('bcryptjs');

module.exports.index = function(req, res){
    user.find({}, function(err, userData){
        res.render('users/userIndex', {
            userList: userData
        });
    });
};
module.exports.getCreate = function(req, res){
    res.render('users/create', {errorList: []});
};   
module.exports.postCreate = function(req, res){
    bcrypt.hash(req.body.password, 10, function(err, hash) {
        var newUser = new user({
            email: req.body.email,
            name: req.body.name,
            password: hash,
            passwordConfirmation: hash
        });
        newUser.save(function(err, data){
            if(err) return console.error(err);
            console.log("Account " + data.email + " be created");
        });
    });    
    res.redirect('/users');
};
module.exports.search = function(req, res){
    var q = req.query.q;
    user.find({}, function(err, userData){
        var matchUsers = userData.filter(function(user){
            return user.name.toLowerCase().indexOf(q.toLowerCase()) != -1;
        });
        res.render('users/userIndex', {
            userList: matchUsers
        });
    });
};
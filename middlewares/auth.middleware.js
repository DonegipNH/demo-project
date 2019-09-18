var user =  require('../models/user.model');

module.exports.requireAuth = function(req, res, next){
    if(!req.cookies.userId){
        res.redirect('/auth/login');
        return;
    }

    user.find({id: req.cookies.userId}, function(err, userData){
        if(!userData){
            res.redirect('/auth/login');
            return;
        }
        next();
    });
};

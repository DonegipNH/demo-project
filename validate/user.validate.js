module.exports.postCreate = function(req, res, next){
    var errors = [];
    if(!req.body.name){
        errors.push('Name not empty');
    }
    if(!req.body.email){
        errors.push('Email not empty');
    }
    if(!req.body.password){
        errors.push('Password not empty');
    }else{        
        if(req.body.passwordConfirmation !== req.body.password){
            errors.push('Password confirmation must same password');
        }
    }    
    if(errors.length){        
        res.render('users/create', {
            errorList: errors            
        });        
        return;
    }
    next();
};
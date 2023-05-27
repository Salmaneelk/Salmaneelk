const User = require('../models/user');

exports.login = (req, res, next) => {
    const response = User.login(req.body.username, req.body.password);
    if(response.status){
        res.status(200).json({ authToken: response.message, user: response.user });
    }else{
        res.status(401).json({ error: response.message})
    }
    
}

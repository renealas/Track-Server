const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = (req, res, next) => {
    const { authorization } = req.headers;

    //authorization === 'Bearer djdiodnoidnion';

    if(!authorization){
        return res.status(401).send({error: 'Debes de estar Loggeado.'});
    }

    const token = authorization.replace('Bearer ', '');

    jwt.verify(token, 'MY_SECRET_KEY', async (err, payload) => {
        if(err){
            return res.status(401).send({error: 'Debes de estar Logeado 2'});
        }

        const {userId} = payload;

        const user = await User.findById(userId);
        req.user = user;
        next();
    });
};
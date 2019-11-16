const jwt = require('jsonwebtoken');
const config = require('../config/config');

const genToken = (name, password) => {
    return jwt.sign({ name, password }, config.jwtSecret, { expiresIn: config.tokenExpiresTime });
}

const varifyToken = (token, errorCb) => {
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
        if (err) {
            errorCb && errorCb(err.name);
        }
    });
}

module.exports = {
    genToken,
    varifyToken
};
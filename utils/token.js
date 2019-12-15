const jwt = require('jsonwebtoken');
const config = require('../config/config');

const genToken = (name, password) => {
    return jwt.sign({ name, password }, config.token.secret, { expiresIn: config.token.expiresTime });
}

const varifyToken = (token, errorCb) => {
    jwt.verify(token, config.token.secret, (err, decoded) => {
        if (err) {
            errorCb && errorCb(err.name);
        }
    });
}

module.exports = {
    genToken,
    varifyToken
};
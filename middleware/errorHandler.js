const { varifyToken } = require('../utils/token');

const errorHandler = (ctx, next) => {
    const auth = ctx.header && ctx.header.authorization;
    if (auth) {
        varifyToken(auth.split(' ')[1], (errName) => {
            if (errName === 'TokenExpiredError') {
                return ctx.error(null, '000001', '登录态超时，请重新登录');
            } else {
                return ctx.error(null, '000001', '登录态验证失败，请重新登录');
            }
        });
    }
    return next().catch(err => {
        if (err.status === 401) {
            ctx.status = 401;
            return ctx.error(null, '000001', '未授权，拒绝访问');
        } else {
            throw err;
        }
    });
}

module.exports = errorHandler;

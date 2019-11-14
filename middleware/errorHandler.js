const errorHandler = (ctx, next) => {
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

const responeHandler = () => {
    const success = (ctx) => {
        return (data = null, code = '000000', msg = '请求成功') => {
            ctx.set('Content-Type', 'application/json');
            ctx.body = {
                code,
                msg
            }
            if (data) {
                ctx.body.data = data
            }
        }
    }

    const error = (ctx) => {
        return (data = null, code, msg = '请求失败') => {
            ctx.set('Content-Type', 'application/json');
            ctx.body = {
                code,
                msg
            }
            if (data) {
                ctx.body.data = data
            }
        }
    }

    return async (ctx, next) => {
        ctx.success = success(ctx);
        ctx.error = error(ctx);
        await next();
    }
}

module.exports = responeHandler;
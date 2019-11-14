const router = require('koa-router');
const queryRouter = new router();

queryRouter.prefix('/api/query');
queryRouter.get('/list', (ctx) => {
    return ctx.success({
        name: 'hello',
        age: 14
    })
});
queryRouter.get('/detail', (ctx) => {
    return ctx.success({
        name: 'jhon',
        age: 20
    })
});

module.exports = queryRouter;
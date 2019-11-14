const path = require('path');
const glob = require('glob');
const compose = require('koa-compose');

const registerRouter = () => {
    let routers = [];
    glob.sync(path.resolve(__dirname, '*.js'))
        .filter(item => item.indexOf('index.js') === -1)
        .map(item => {
            routers.push(require(item).routes());
            routers.push(require(item).allowedMethods());
        });
    return compose(routers);
}

module.exports = registerRouter;
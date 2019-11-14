const koa = require('koa');
const app = new koa();
const koaJson = require('koa-json');
const koaBodyparser = require('koa-bodyparser');
const koaJwt = require('koa-jwt');

const config = require('./config/config');
const connectionDB = require('./config/dbConfig');

const errorHandler = require('./middleware/errorHandler');
const responeHandler = require('./middleware/responeHandler');

const registerRouter = require('./router/index');

connectionDB();

app.use(koaJson());
app.use(koaBodyparser());
app.use(responeHandler());
app.use(errorHandler);

app.use(koaJwt({ secret: config.jwtSecret }).unless({ path: config.unlessPath }));

app.use(registerRouter());

app.listen(config.network.port, () => {
    console.log(`node-koa-server is running on the port of ${config.network.port}`);
});

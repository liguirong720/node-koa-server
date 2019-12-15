const koa = require('koa');
const app = new koa();
const path = require('path');
const url = require('url');
const koaBody = require('koa-body');
const koaJwt = require('koa-jwt');
const koaStatic = require('koa-static');
const koaSession = require('koa-session');

const config = require('./config/config');
const MongoDB = require('./config/mongoDB');

const errorHandler = require('./middleware/errorHandler');
const responeHandler = require('./middleware/responeHandler');

const registerRouter = require('./router/index');

const uploadTool = require('./utils/upload'); 

app.keys = ['some secret hurr'];

MongoDB.connect();

app.use(koaStatic(path.resolve(__dirname, './public')));

app.use(koaSession(config.session, app));

app.use(responeHandler());
app.use(errorHandler);

app.use(koaBody({
    multipart: config.upload.multipart, // 多文件上传
    encoding: config.upload.encoding,
    formidable: {
        uploadDir: config.upload.uploadDir, // 设置上传目录
        keepExtensions: config.upload.keepExtensions, // 保持文件的后缀名
        maxFileSize: config.upload.maxFileSize,    // 设置上传文件大小最大限制，默认2M
        onFileBegin(name, file) {
            const ext = uploadTool.getUploadFileExt(file.name);
            const dirName = uploadTool.genUploadDir();
            const fileName = uploadTool.genUploadFileName(ext);
            const dir = path.resolve(__dirname, `public/upload/${dirName}`);
            uploadTool.checkUploadDir(dir);

            file.publicPath = url.resolve(config.upload.baseUrl, `${dirName}/${fileName}`);
            file.path = `${dir}/${fileName}`;
        }
    }
}));

app.use(koaJwt({ secret: config.token.secret }).unless({ path: config.unlessPath }));

app.use(registerRouter());

app.listen(config.network.port, () => {
    console.log(`node-koa-server is running on the port of ${config.network.port}`);
});

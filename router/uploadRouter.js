const router = require('koa-router');
const uploadRouter = new router();
const UploadController = require('../controller/uploadController');

uploadRouter.prefix('/api/tools');
uploadRouter.post('/upload', UploadController.upload);

module.exports = uploadRouter;
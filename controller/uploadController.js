const fs = require('fs');

class UploadController {
    static async upload(ctx) {
        const file = ctx.request.files.file;
        const result = fs.existsSync(file.path);
        return result ? ctx.success({url: file.publicPath}, '000000', '文件上传成功') : ctx.error(null, '000002', '文件上传失败');
    }
}

module.exports = UploadController;
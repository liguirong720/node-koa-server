const path = require('path');

module.exports = {
    // 网络配置
    network: {
        port: '3000', // 端口
        database: 'mongodb://localhost:27017/node-koa-server' // 数据库地址
    },
    // token相关配置
    token: {
        secret: 'node-koa-server', // 鉴权秘钥
        expiresTime: 1000 * 60 * 60 // 鉴权时效
    },
    // 上传文件夹配置
    upload: {
        baseUrl: 'http://localhost:3000/upload/',
        multipart: true, // 多文件上传
        encoding: 'gzip', // gzip 压缩 
        keepExtensions: true, // 是否保持后缀名
        uploadDir: path.resolve('../public/upload'), // 上传目录
        maxFileSize: 2 * 1024 * 1024,    // 设置上传文件大小最大限制，默认2M
    },
    // session 配置
    session: {
        key: 'node-koa-server',   // cookie key (default is koa:sess)
        maxAge: 1000 * 60 * 30,  // cookie的过期时间 30分钟
        overwrite: true,  //是否可以overwrite    (默认default true)
        httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
        signed: true,   //签名默认true
        rolling: false,  //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
        renew: false,  //(boolean) renew session when session is nearly expired,
    },
    // 不需要鉴权的路由
    unlessPath: [
        /\/api\/user\/register/,
        /\/api\/user\/login/
    ]
}
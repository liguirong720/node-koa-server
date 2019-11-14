module.exports = {
    // 网络配置
    network: {
        port: '3000'
    },
    // 数据库地址
    database: 'mongodb://localhost:27017/node-koa-server',
    // 鉴权秘钥
    jwtSecret: 'node-koa-server',
    // 鉴权时效
    tokenExpiresTime: 1000 * 60 * 60,
    // 不需要鉴权的路由
    unlessPath: [
        /\/api\/user\/register/,
        /\/api\/user\/login/,
        /\/api\/query\/list/,
        /\/api\/query\/detail/,
    ]
}
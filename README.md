# node-koa-server

node + koa + koa-jwt 实现的一个基础后端项目框架

项目结构如下

```
├── app.js  // 项目启动文件
├── config  // 项目配置文件
|  ├── config.js
|  └── dbConfig.js
├── controller  // controller，一个业务模块一个文件
|  └── userController.js
├── docs    // api 文档说明
├── middleware  // 中间件
|  ├── errorHandler.js
|  └── responeHandler.js
├── model   // model，一个业务模块一个文件
|  └── userModel.js
├── node_modules
├── package.json
├── README.md
├── router  // 路由， 一个业务模块一个文件
|  ├── index.js
|  ├── queryRouter.js
|  └── userRouter.js
├── schema  // 数据库模型定义，一个业务模块一个文件
|  └── userSchema.js
└── yarn.lock

```

## 快速启动

```
npm install

npm start
```

访问地址实例：

http://localhost:3000/api/XXX/XXX


## 技术栈

- node
- koa
- koa-router
- koa-compose
- koa-jwt
- jsonwebtoken
- mongoose

## 配置信息

项目基本配置信息在config/config.js文件中，可以根据项目需要自行扩展

```js
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
```

## 路由自动化

在定义路由的时候，可以按照业务模块添加路由文件，如userRouter.js, 在index.js中会自动去加载路由文件并添加到app.js中。实现原理如下:

```js
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
```

## api文档

api在docs文件夹中


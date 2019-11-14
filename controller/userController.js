const jwt = require('jsonwebtoken');
const cypto = require('crypto');

const config = require('../config/config');
const userModel = require('../model/userModel');

class UserController {
    static async register(ctx) {
        const data = ctx.request.body;
        const checkUser = userModel.findOne({
            name: data.name
        });

        if (checkUser) {
            return ctx.error(null, '000002', '该用户已经存在');
        }

        const user = new userModel({
            name: data.name,
            password: cypto.createHash('md5').update(data.password).digest('hex'),
            role: data.role,
            email: data.email
        });

        const reuslt = await user.save();
        return reuslt ? ctx.success(null, '000000', '注册成功') : ctx.error(null, '000002', '注册失败');
    }

    static async login(ctx) {
        const data = ctx.request.body;

        if (!data.name || !data.password) {
            return ctx.error(null, '000002', '参数不合法');
        }

        const reuslt = userModel.findOne({
            name: data.name,
            password: cypto.createHash('md5').update(data.password).digest('hex')
        });

        if (reuslt) {
            const token = jwt.sign({
                name: reuslt.name,
                email: reuslt.email
            }, config.jwtSecret, {
                expiresIn: config.tokenExpiresTime
            });
            return ctx.success(token, '000000', '登录成功');
        } else {
            return ctx.error(null, '000002', '用户名或密码错误');
        }
    }
}

module.exports = UserController;
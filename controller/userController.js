const cypto = require('crypto');
const fs = require('fs');
const userModel = require('../model/userModel');
const { genToken } = require('../utils/token');

class UserController {
    static async register(ctx) {
        const data = ctx.request.body;
        const checkUser = await userModel.findOne({
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

        const result = await user.save();
        return result ? ctx.success(null, '000000', '注册成功') : ctx.error(null, '000002', '注册失败');
    }

    static async login(ctx) {
        const data = ctx.request.body;

        if (ctx.session.name === data.name) {
            return ctx.success(null, '000000', '用户已登录，请勿重复操作');
        }

        if (!data.name || !data.password) {
            return ctx.error(null, '000002', '参数不合法');
        }

        const result = await userModel.findOne({
            name: data.name,
            password: cypto.createHash('md5').update(data.password).digest('hex')
        });

        if (result) {
            ctx.session.name = data.name;
            const tokens = genToken(data.name, data.password);
            return ctx.success({ token: tokens }, '000000', '登录成功');
        } else {
            return ctx.error(null, '000002', '用户名或密码错误');
        }
    }

    static async logout(cxt) {
        ctx.session.name = '';
        return ctx.success(null, '000000', '退出成功');
    }

    static async forgetPassword(ctx) {
        let { name, newPassword } = ctx.request.body;
        
        let result = await userModel.update({ name }, {
            $set: {
                password: cypto.createHash('md5').update(newPassword).digest('hex')
            }
        });
        
        return result ? ctx.success(null, '000000', '更新密码成功') : ctx.error(null, '000002', '更新密码失败');
    }

    static async uploadAvatar(ctx) {
        if (!ctx.session.name) {
            return ctx.error(null, '000002', '请先登录后再进行操作');
        }
        const file = ctx.request.files.file;
        const result = fs.existsSync(file.path);
        if (result && file.publicePath) {
            const sucess = await userModel.update({name: ctx.session.name}, {$set: {avatarUrl:  file.publicePath}});
            return sucess ? ctx.success({avatarUrl: file.publicPath}, '000000', '更新头像成功') : ctx.error(null, '000002', '更新头像失败');
        }
    }
}

module.exports = UserController;
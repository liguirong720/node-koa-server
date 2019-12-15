const router = require('koa-router');
const userRouter = new router();
const UserController = require('../controller/userController');

userRouter.prefix('/api/user');
userRouter.post('/register', UserController.register);
userRouter.post('/login', UserController.login);
userRouter.post('/logout', UserController.logout);
userRouter.post('/forgetPassword', UserController.forgetPassword);
userRouter.post('/uploadAvatar', UserController.uploadAvatar);

module.exports = userRouter;
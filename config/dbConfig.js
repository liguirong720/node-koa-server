const mongoose = require('mongoose');
const config = require('./config');

mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

const connectionDB = () => {
    mongoose.connect(config.database);
    const db = mongoose.connection;
    db.on('connected', () => {
        console.log('~~~~~~ 数据库连接成功 ~~~~~~~');
    });
    db.on('error', (err) => {
        console.log(`~~~~ 数据库连接失败 ~~~~： ${err}`);
    });
}

module.exports = connectionDB;
const mongoose = require('mongoose');
const config = require('./config');

const MongoDB = {
    url: config.network.database,
    connect() {
        mongoose.connect(this.url, {
            useFindAndModify: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, (err) => {
            if (err) {
                console.log(`~~~~ 数据库连接失败 ~~~~： ${err}`);
            } else {
                console.log('~~~~~~ 数据库连接成功 ~~~~~~~');
            }
        })
    }
}

module.exports = MongoDB;
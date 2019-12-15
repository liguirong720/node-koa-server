const fs = require('fs');

const genUploadDir = () => {
    const date = new Date();
    const month = date.getMonth() > 9 ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1));
    return `${date.getFullYear()}${month}${date.getDate()}`;
}

const genUploadFileName = (ext) => {
    const time = new Date().getTime();
    const ran = Math.floor(Math.random() * 1000);
    return `${time}${ran}.${ext}`;
}

const checkUploadDir = (dir) => {
    const result = fs.existsSync(dir);
    if (!result) {
        fs.mkdirSync(dir);
    }
}

const getUploadFileExt = (name) => {
    const ext = name.split('.');
    return ext[ext.length -1];
}

module.exports = {
    genUploadDir,
    genUploadFileName,
    checkUploadDir,
    getUploadFileExt
}
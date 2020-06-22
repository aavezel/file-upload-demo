const repository = require('../datasources/repositoryManager');
const config = require("../config");
const os = require("os");
const path = require("path");


async function getFileData(req, res, next) {
    const { params: { file_id } } = req;
    const file = await repository.getRepository().getFileById(file_id);
    if (file === null) {
        return next();
    }
    const {real_filename, filename} = file;
    if (real_filename === null) {
        return next();
    }

    res.download("/" + real_filename, filename, {
        root: config.upload_file_path,        
    })
}


module.exports = {
    getFileData,
}
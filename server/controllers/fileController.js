const repository = require('../datasources/repositoryManager');

async function getAllFiles(req, res, next) {
    const allFiles = await repository.getRepository().getAllFiles();
    res.json(allFiles.map(compactFileObject));
}

async function getFileInfo(req, res, next) {
    var file_id = req.params.file_id;
    const file = await repository.getRepository().getFileById(file_id);
    res.json(compactFileObject(file));
}

async function addFile({ body: { title = null } } = {}, res, next) {
    if (title === null) {
        next("title is empty");
        return;
    }
    const data = await repository.getRepository().addFile(title);
    res.json(compactFileObject(allFiles));
}

async function deleteFile(req, res, next) {
    var file_id = req.params.file_id;
    await repository.getRepository().deleteFile(file_id);
    res.json({ "status": "ok" });
}

async function uploadFile(req, res, next) {
    var file_id = req.params.file_id;
    const { originalname, filename } = req.file;
    const data = await repository.getRepository().uploadFile(file_id, filename, originalname);
    res.json(compactFileObject(data));
}

function compactFileObject({id, title, date_add, real_filename, filename, date_upload, is_deleted, date_deleted}) {
    let result = {id, title, date_add};
    if (date_upload !== null) {
        result = {...result, real_filename, filename, date_upload};
    }
    if (is_deleted) {
        result = {...result, is_deleted, date_deleted};
    }
    return result;
}

module.exports = {
    getAllFiles,
    getFileInfo,
    addFile,
    deleteFile,
    uploadFile,
}
const repository = require('../datasources/repositoryManager');

async function getAllFiles(req, res, next) {
    const allFiles = await repository.getRepository().getAllFiles();
    res.json(allFiles);
}

async function getFileInfo(req, res, next) {
    var file_id = req.params.file_id;
    const file = await repository.getRepository().getFileById(file_id);
    res.json(file);
}

async function addFile({ body: { title = null } } = {}, res, next) {
    if (title === null) {
        next("title is empty");
        return;
    }
    const allFiles = await repository.getRepository().addFile(title);
    res.json(allFiles);
}

async function deleteFile(req, res, next) {
    var file_id = req.params.file_id;
    await repository.getRepository().deleteFile(file_id);
    res.json({ "status": "ok" });
}

async function uploadFile(req, res, next) {
    // TODO: add catch
    var file_id = req.params.file_id;
    const { originalname, filename } = req.file;
    await repository.getRepository().uploadFile(file_id, filename, originalname);
    res.json({ "status": "ok" });
}

module.exports = {
    getAllFiles,
    getFileInfo,
    addFile,
    deleteFile,
    uploadFile,
}
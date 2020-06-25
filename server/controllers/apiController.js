const repository = require('../datasources/repositoryManager');

async function getAllFiles(req, res) {
    const allFiles = await repository.getRepository().getAllFiles();
    return res.json(allFiles.map(compactFileObject));
}

async function getFileInfo(req, res) {
    const { params: { file_id } } = req;
    const file = await repository.getRepository().getFileById(file_id);
    return res.json(compactFileObject(file));
}

async function addFile(req, res) {
    const { body: { title } } = req;
    const data = await repository.getRepository().addFile(title);
    return res.json(compactFileObject(data));
}

async function deleteFile(req, res) {
    const { params: { file_id } } = req;
    await repository.getRepository().deleteFile(file_id);
    return res.json({ "status": "ok" });
}

async function uploadFile(req, res) {
    const { params: { file_id } } = req;
    const { originalname, filename } = req.file;
    const data = await repository.getRepository().uploadFile(file_id, filename, originalname);
    return res.json(compactFileObject(data));
}

function compactFileObject({ id, title, date_add, real_filename, filename, date_upload, is_deleted, date_deleted }) {
    let result = { id, title, date_add };
    if (date_upload !== null) {
        result = { ...result, real_filename, filename, date_upload };
    }
    if (is_deleted) {
        result = { ...result, is_deleted, date_deleted };
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
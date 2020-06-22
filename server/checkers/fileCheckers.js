const repository = require('../datasources/repositoryManager');

async function validateFileExist(file_id) {
    try {
        const file = await repository.getRepository().getFileById(file_id);
        if (file === null) {
            throw new Error('File not found');
        }
    }
    catch {
        throw new Error('File not found');
    }
}

module.exports = {
    validateFileExist
}
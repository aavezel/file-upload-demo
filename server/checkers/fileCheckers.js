const repository = require('../datasources/repositoryManager');
const { validationResult } = require('express-validator');

/**
 * Проверка на наличие file_id в репозитории
 */
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

/**
 * Обертка для обработчиков ошибок
 */
function validationAsHttpCode(httpCode) {
    return function (req, res, next) {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        res.status(httpCode).json(formatErrors(errors));
    }
}

const validationAs404 = validationAsHttpCode(404);
const validationAs422 = validationAsHttpCode(422);

function formatErrors(errs) {
    const errors = errs.array().map(e => e.msg)
    return { errors };
}

module.exports = {
    validateFileExist,
    validationAs404,
    validationAs422,
}
const express = require('express');
const router = express.Router();

const { getFileData } = require("../controllers/fileController");

const { check } = require('express-validator');
const { validateFileExist, validationAs404 } = require('../checkers/fileCheckers');


router.route('/:file_id').get(
    getFileData
);

/* 404 */
router.use(error404);

module.exports = router;


/*-------------------------*/
function error404(req, res, next) {
    res.status(404).send("File not found");
    next();
}  
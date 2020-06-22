const express = require('express');
const router = express.Router();

const { getFileData } = require("../controllers/fileController");

const { check } = require('express-validator');
const { validateFileExist, validationAs404 } = require('../checkers/fileCheckers');


router.use(getFileData);

router.use(error404);
router.use(error500);

module.exports = router;


/*-------------------------*/
function error404(req, res, next) {
    res.status(404).send("File not found!");
    next();
}  


function error500(err, req, res, next) {
    console.log("ERROR:", err); // TODO: use logger 
    res.status(500).send("File not found");
    next(err);
  }
const express = require('express');
const router = express.Router();

const config = require("../config");
const multer = require('multer');
const upload = multer({ dest: config.upload_file_path, limits: { fileSize: 1024 * 1024, files: 1 } });

const { getAllFiles, getFileInfo, addFile, deleteFile, uploadFile } = require("../controllers/apiController");
const { validateFileExist, validationAs404, validationAs422 } = require('../checkers/fileCheckers');

const { body, check } = require('express-validator');

router.route('/')
  .get(getAllFiles)
  .put(
    [body("title").exists().withMessage("Title is empty")],
    validationAs422,
    addFile
  )

router.route('/files/:file_id')
  .all(
    [
      check("file_id")
        .custom(validateFileExist).withMessage("File not found"),
    ],
    validationAs404
  )
  .get(getFileInfo)
  .post(upload.single('uploaded_file'), uploadFile)
  .delete(deleteFile);

/* 404 */
router.use(error404);

/* 500 */
router.use(error500)

module.exports = router;


/*-------------------------*/
function error404(req, res, next) {
  res.status(404).send({ 'error': 'method not found' });
  next();
}

function error500(err, req, res, next) {
  console.log("ERROR:", err); // TODO: use logger 
  if (process.env.NODE_ENV === "production") {
    res.status(500).send({});
    next(err);
    return;
  }
  res.status(500).send({ 'error': err });
  next(err);
}
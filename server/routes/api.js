const repository = require('../datasources/repositoryManager');
const express = require('express');
const router = express.Router();

const config = require("../config");
const os = require("os");
const multer  = require('multer');
const upload = multer({dest: config.upload_file_path, limits: {fileSize: 1024*1024, files: 1 } });



router.route('/')
  .get(getAllFiles)
  .put(addFile)

router.route('/files/:file_id')
  .get(getFileInfo)
  .post(upload.single('uploaded_file'), uploadFile)
  .delete(deleteFile);

/* 404 */
router.use(error404);

/* 500 */
router.use(error500)

module.exports = router;


/*-------------------------*/
// TODO : controllers?

async function getAllFiles(req, res, next) {
  const allFiles = await repository.getRepository().getAllFiles();
  res.json(allFiles);
}

async function getFileInfo(req, res, next) {
  var file_id = req.params.file_id;
  const file = await repository.getRepository().getFileById(file_id);
  res.json(file);
}

async function addFile({body: {title = null}} = {}, res, next) {  
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
  res.json({"status": "ok"});
}

async function uploadFile(req, res, next) {  
  // TODO: add catch
  var file_id = req.params.file_id;
  const {originalname, filename} = req.file;
  await repository.getRepository().uploadFile(file_id, filename, originalname);
  res.json({"status": "ok"});
}

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
const repository = require('../datasources/repositoryManager');
const express = require('express');
const router = express.Router();


router.route('/')
  .get(getAllFiles)
  .put(addFile)
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

async function addFile(req, res, next) {
  const { title = null } = req.body || {}
  if (title === null) {
    next("title is empty");
    return;
  }
  const allFiles = await repository.getRepository().addFile(title);
  res.json(allFiles);
}

async function deleteFile(req, res, next) {
  const { id = null } = req.body || {}
  if (id === null) {
    next("id is empty");
    return;
  }
  await repository.getRepository().deleteFile(id);
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
const express = require('express');
const router = express.Router();

const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config");

router.use(getAuthData);


module.exports = router;

/** --------------------- */

function getAuthData(req, res, next) {      
    const signature = jwt_secret;
    const expiresIn = '24h';
    const sign =  jwt.sign({  }, signature, { expiresIn });
    res.json({data: sign});
}
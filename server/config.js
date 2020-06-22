const os = require('os');
const config = {};


config.provider = "mongodb";

config.mongodb = {
    //url: "mongodb://root:example@mongo:27017",
    url: "mongodb://root:example@localhost:27017",
    options: { useNewUrlParser: true, useUnifiedTopology: true, dbName: "file-upload-demo", }
};

config.upload_file_path = process.env.UPLOAD_FILE_PATH || "/etc/server_files";

config.jwt_secret = process.env.JWT_SECRET || "secret";

config.server = {
    port: normalizePort(process.env.PORT || '8888 '),
};


module.exports = config;


function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

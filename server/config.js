const os = require('os');
const config = {};


config.provider = "mongodb";

config.mongodb = {
    url: "mongodb://" + process.env.SERVER_MONGO_CONNECT + "@mongo:27017",
    options: { useNewUrlParser: true, useUnifiedTopology: true, dbName: "file-upload-demo", }
};

config.upload_file_path = process.env.SERVER_UPLOAD_FILE_PATH || "/etc/server_files";

config.jwt_secret = process.env.SERVER_JWT_SECRET || "secret";

config.server = {
    port: normalizePort(process.env.SERVER_PORT || '8888 '),
};

config.cors_option = {
    origin: process.env.SERVER_CORS_ORIGIN || '*'
}


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

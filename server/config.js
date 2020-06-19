const config = {};

config.provider = "mongodb";

config.mongodb = {
    //url: "mongodb://root:example@mongo:27017",
    url: "mongodb://root:example@localhost:27017",
    options: { useNewUrlParser: true, useUnifiedTopology: true, dbName: "file-upload-demo", }
};

config.server = {
    port: normalizePort(process.env.PORT || '8081'),
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

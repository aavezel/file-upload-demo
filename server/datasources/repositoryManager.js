
const MongoRepository = require("./mongoRepository");
const config = require("../config");

class RepositoryManager {

    static init(config) {
        const { provider } = config;
        switch (provider) {
            case "mongodb":
                RepositoryManager._instance = new MongoRepository(config.mongodb);
                break;        
            default:
                break;
        }
    }

    static getRepository() {
        if (RepositoryManager._instance == null) {
            RepositoryManager.init(config);
        }
        return RepositoryManager._instance;
    }

}

module.exports = RepositoryManager;
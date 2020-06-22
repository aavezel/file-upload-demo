const mongoose = require("mongoose");
const RepositoryBase = require("./repositoryBase");
const Schema = mongoose.Schema;

class MongoRepository extends RepositoryBase {

    constructor({ url, options }) {
        super();
        mongoose.connect(url, options);

        const fileSchema = new Schema({
            title: { type: String, default: "" },
            real_filename: { type: String, default: null },
            filename: { type: String, default: null },
            is_deleted: { type: Boolean, default: false },
            date_add: { type: Date, default: Date.now },
            date_upload: { type: Date, default: null },
            date_deleted: { type: Date, default: null },
        });

        this._model = mongoose.model('File', fileSchema);
    }

    async getAllFiles() {
        const all_files = await this._model.find({is_deleted: false}).exec();
        return all_files.map(MongoRepository.makeFileObject);
    }

    async getFileById(id) {
        const file = await this._model.findById(id).exec();
        return MongoRepository.makeFileObject(file);
    }

    async addFile(title) {
        const file = new this._model({title});
        const data = await file.save();
        return MongoRepository.makeFileObject(data);
    }

    async uploadFile(id, real_filename, filename) {
        const file = await this._model.findById(id).exec();
        file.real_filename = real_filename;
        file.filename = filename;
        file.date_upload = Date.now();
        const data = await file.save();
        return MongoRepository.makeFileObject(data);
    }

    async deleteFile(id) {
        const file = await this._model.findById(id).exec();
        file.is_deleted = true;
        file.date_deleted = Date.now();
        await file.save();
    }

    disconnect(){
        mongoose.disconnect();
    }    


    static makeFileObject({ title, real_filename, filename, is_deleted, date_upload, date_deleted, _id, date_add }) {
        return {
            id: _id,
            title, date_add,
            real_filename, filename, date_upload, 
            is_deleted, date_deleted, 
        };
    }

}

module.exports = MongoRepository;
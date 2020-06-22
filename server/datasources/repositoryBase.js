class RepositoryBase {
    async getAllFiles() { }
    async getFileById(id) { }
    async addFile(title) { }
    async uploadFile(id, real_filename, filename) { }
    async deleteFile(id) { }
    disconnect() { }
}

module.exports = RepositoryBase;
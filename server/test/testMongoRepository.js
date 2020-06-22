const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const { expect } = chai;
const RepositoryManager = require("../datasources/repositoryManager") 

describe('MongoRepository', () => {

    before(() => {
        RepositoryManager.init({
            provider : "mongodb",
            mongodb: {    
                url: "mongodb://root:example@localhost:27017",
                options: { useNewUrlParser: true, useUnifiedTopology: true, dbName: "file-upload-demo", }
            }
        });

    }) 

    it('workflow', async () => {
        const title = 'test file ' + Date.now();
        
        const allFilesInitial = await RepositoryManager.getRepository().getAllFiles();
        const initial = allFilesInitial.filter(f => f.title == title );
        expect(initial, "File with title already exist").to.be.empty;

        const file = await RepositoryManager.getRepository().addFile(title);
        expect(file, "Fail add file").to.have.property("title").that.is.eq(title);
        expect(file, "Fail add file").to.have.property("date_add").that.is.not.null;
        expect(file, "Fail add file").that.deep.include({
            "real_filename": null,
            "filename": null,
            "date_upload": null,
            "is_deleted": false,
            "date_deleted": null,
        });

        const fileGet = await RepositoryManager.getRepository().getFileById(file.id);
        expect(fileGet, "Failed to add file").not.null;

        const allFilesAfterAdd = await RepositoryManager.getRepository().getAllFiles();
        const afterAdd = allFilesAfterAdd.filter(f => f.title == title );
        expect(afterAdd, "File with title not exist after add").to.be.not.empty;
        
        const newFile = await RepositoryManager.getRepository().uploadFile(file.id, "52e63808f99343f39579ada7ccbd76df", "text.txt");
        expect(newFile, "Fail upload file").to.have.property("real_filename").that.is.eq("52e63808f99343f39579ada7ccbd76df");
        expect(newFile, "Fail upload file").to.have.property("filename").that.is.eq("text.txt");
        expect(newFile, "Fail upload file").to.have.property("date_upload").that.is.not.null;
    
        await RepositoryManager.getRepository().deleteFile(file.id);        
        const fileAfterDelete = await RepositoryManager.getRepository().getFileById(file.id);
        expect(fileAfterDelete, "Fail delete file").to.have.property("is_deleted").that.is.true;
        expect(fileAfterDelete, "Fail delete file").to.have.property("date_deleted").that.is.not.null;

        const allFilesAfterDelete = await RepositoryManager.getRepository().getAllFiles();
        const afterDelete = allFilesAfterDelete.filter(f => f.title == title );
        expect(afterDelete, "File with title exist after delete").to.be.empty;

    });    

    it('get file with wrong Id', async () => {
        const fileGetNotValid = await RepositoryManager.getRepository().getFileById("1");
        expect(fileGetNotValid, "Failed get not valid id").is.null;

        const fileGetVaildId = await RepositoryManager.getRepository().getFileById("123456789012345678901234");
        expect(fileGetVaildId, "Failed get with valid id").is.null;
    });

    it('upload file after delete', async () => { 
        const title = 'test file ' + Date.now();
        const file = await RepositoryManager.getRepository().addFile(title);
        await RepositoryManager.getRepository().deleteFile(file.id);     
        const uploadFn = async () => {
            await RepositoryManager.getRepository().uploadFile(file.id, "52e63808f99343f39579ada7ccbd76df", "text.txt");   
        }
        await expect(uploadFn()).to.be.rejected;
    });

    after(() => {
        RepositoryManager.getRepository().disconnect();
    })
    
});
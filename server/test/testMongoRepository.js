const { expect } = require("chai");
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


    it('initial empty', async () => { 
        const allFiles = await RepositoryManager.getRepository().getAllFiles();
        expect(allFiles).to.be.empty;
    });

    it('add', async () => { 
        const file = await RepositoryManager.getRepository().addFile("test");
        expect(file).to.have.property("title").that.is.eq("test");
        expect(file).to.have.property("date_add").that.is.not.null;
        expect(file).that.deep.include({
            "real_filename": null,
            "filename": null,
            "date_upload": null,
            "is_deleted": false,
            "date_deleted": null,
        });
    });

    it('upload file', async () => { 
        const allFiles = await RepositoryManager.getRepository().getAllFiles();
        const file = allFiles.filter(f => f.real_filename === null)[0];
        const newFile = await RepositoryManager.getRepository().uploadFile(file._id, "52e63808-f993-43f3-9579-ada7ccbd76df", "text.txt");
        
        expect(newFile).to.have.property("real_filename").that.is.eq("52e63808-f993-43f3-9579-ada7ccbd76df");
        expect(newFile).to.have.property("filename").that.is.eq("text.txt");
        expect(newFile).to.have.property("date_upload").that.is.not.null;
    });

    it('delete file', async () => { 
        const allFiles = await RepositoryManager.getRepository().getAllFiles();
        for (const file of allFiles) {
            await RepositoryManager.getRepository().deleteFile(file._id);
        }
        const newAllFiles = await RepositoryManager.getRepository().getAllFiles();
        expect(newAllFiles).to.be.empty;
    });    

    after(() => {
        RepositoryManager.getRepository().disconnect();
    })
    
});
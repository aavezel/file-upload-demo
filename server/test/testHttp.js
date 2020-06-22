const RepositoryManager = require("../datasources/repositoryManager")

const chai = require("chai");
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { expect } = chai;

const app = require("../app");

describe('Api connection', () => {

    before(() => {
        RepositoryManager.init({
            provider: "mongodb",
            mongodb: {
                url: "mongodb://root:example@localhost:27017",
                options: { useNewUrlParser: true, useUnifiedTopology: true, dbName: "file-upload-demo", }
            }
        });
    });

    it('workflow', async () => {
        const title = 'test file ' + Date.now();
        let file_id = null;

        // Проверка коннекта
        {
            const res = await chai.request(app).get("/api");
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
        }

        // Создаем таск
        {
            const res = await chai.request(app).put("/api").send({ title });
            expect(res).to.have.status(200);
            expect(res.body.id).is.not.null;
            expect(res.body.date_add).is.not.null;
            expect(res.body.title).is.equal(title);
            file_id = res.body.id;
        }

        // Проверяем что такой id есть в ответе
        {
            const res = await chai.request(app).get("/api");
            expect(res).to.have.status(200);
            const filt = res.body.filter(f => f.title === title);
            expect(filt).to.have.lengthOf(1);
        }

        // Проверяем что такой файл можно получить
        {
            const res = await chai.request(app).get("/api/files/" + file_id);
            expect(res).to.have.status(200);
            expect(res.body.title).is.equal(title);
            expect(res.body).to.not.have.property("real_filename");
            expect(res.body).to.not.have.property("filename");
            expect(res.body).to.not.have.property("is_deleted");
        }

        // Проверяем загрузку данных
        {
            const buffer = Buffer.from("test data file", 'utf8');
            const res = await chai.request(app).post("/api/files/" + file_id)
                .type('form')
                .attach('uploaded_file', buffer, 'test.txt')                
            expect(res).to.have.status(200);
            expect(res.body.title).is.equal(title);
            expect(res.body).to.have.property("real_filename");
            expect(res.body).to.have.property("filename").is.equal("test.txt");
        }

        // Проверяем удаление файла
        {
            const res = await chai.request(app).delete("/api/files/" + file_id);
            expect(res).to.have.status(200);

            const resGet = await chai.request(app).get("/api/files/" + file_id);
            expect(resGet).to.have.status(404);

            const resGetAll = await chai.request(app).get("/api");
            expect(resGetAll).to.have.status(200);
            const filt = resGetAll.body.filter(f => f.id == file_id);
            expect(filt).to.have.lengthOf(0);
        }

    });

    after(() => {
        RepositoryManager.getRepository().disconnect();
    });    

});
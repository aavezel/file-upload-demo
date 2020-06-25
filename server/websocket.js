const WebSocketServer = require("ws").Server;
const {
    getAllFiles,
    getFileInfo,
    addFile,
    deleteFile,
    uploadFile,
} = require("./controllers/apiController");

const { validateFileExist } = require("./checkers/fileCheckers");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("./config");


class WSRouter {

    constructor(ws) {
        this.is_auth = false;
        this.ws = ws;
        this.res = {
            json(data) {
                ws.send(JSON.stringify(data));
            }
        }
    }

    async _checkFileId(data) {
        const { file_id = null } = data;
        if (file_id == null) throw new Error("File not found");
        await validateFileExist(file_id);
        return { params: { file_id } };
    }

    async auth(data) {
        try {
            const { token } = data;
            jwt.verify(token, jwt_secret);
            this.is_auth = true;
            this.res.json({ status: "ok" })
        }
        catch
        {
            this.res.json({ error: "Authorization failed" })
        }
    }

    async getAllFiles() {
        await getAllFiles(null, this.res);
    }

    async getFileInfo(data) {
        const req = await this._checkFileId(data);
        await getFileInfo(req, this.res);
    }

    async addFile(data) {
        const { title = null } = data;
        if (title == null || title == "") throw new Error("Title empty");
        const req = { body: { title } };
        await addFile(req, this.res);
    }

    async deleteFile(data) {
        const req = await this._checkFileId(data);
        await deleteFile(req, this.res);
    }

}


function initWebSocketServer(server) {

    const wss = new WebSocketServer({ server, path: "/ws" });

    wss.on("connection", function (ws) {

        const router = new WSRouter(ws);

        ws.on('message', async (message) => {

            try {
                const { method, data } = JSON.parse(message);

                if (method != "auth" && !router.is_auth) {
                    ws.send(`{ "error": "Authorization is needed" }`);
                    return;
                }

                if (method in router && typeof router[method] == "function") {
                    await router[method](data);
                }
                else {
                    ws.send(`{ "error": "Method not found" }`);
                }


            } catch (err) {
                console.log("ERROR:", err); // TODO: use logger 
                ws.send(`{ "error": "Server error" }`);
            }

        });

        ws.send(`{status: "connecting"}`)

    });

}

module.exports = initWebSocketServer;
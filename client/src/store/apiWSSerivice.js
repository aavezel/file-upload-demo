
class apiWSSerivice {
    
    _auth_url = "/auth"
    _upload_url = "/api/files/";
    _download_url = "/file/";
    _auth_token = null;
    _is_auth = false;
    
    onFilesLoaded = () => {};

    constructor(auth_url, ws_url, upload_url, download_url) {
        this._auth_url = auth_url;
        this._upload_url = upload_url;
        this._download_url = download_url;

        this.socket = new WebSocket(ws_url);
        this.socket.onmessage = (event) => {
            const data = JSON.parse(event.data)

            if (data.status == "connecting") {
                this._auth();
            }
            if (data.auth == "ok") {
                this._is_auth = true;
            }
            if (data.files) {
                this.onFilesLoaded(data.files);
            }
        }
    }

    async _auth() {
        const resp = await fetch(this._auth_url);        
        const { data } = await resp.json();
        this._auth_token = data;

        this.socket.send(JSON.stringify({method: "auth", data: {token: data}}));
    }

    async getAllFiles() {
        await this._waitSocket();
        this.socket.send(JSON.stringify({method: "getAllFiles", data: {}}));        
    }

    async newFile(title) {
        await this._waitSocket();
        this.socket.send(JSON.stringify({method: "addFile", data: {title}}));
    }

    async deleteFile(file_id) {
        await this._waitSocket();
        this.socket.send(JSON.stringify({method: "deleteFile", data: {file_id}}));
    }    

    async uploadFile(id, fileObj) {
        const data = new FormData();
        data.append("uploaded_file", fileObj);
        const params = {
            method: "POST",
            headers: {
                'Authorization': "Bearer " + this._auth_token,
                'Accept': 'application/json',
            },
            body: data,
            mode: 'cors'
        };
        await fetch(this._upload_url + id, params);
        this.getAllFiles();
    }

    download(id) {
        window.open(this._download_url + id);
    }

    async _waitSocket(){
        while (this.socket.readyState === 0) {
            await this._later(100);
        }
        while (!this._is_auth) {
            await this._later(100);
        }
    }

    _later(delay) {
        return new Promise(function (resolve) {
            setTimeout(resolve, delay);
        });
    }
}    


export default apiWSSerivice;
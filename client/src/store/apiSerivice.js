const METHOD = {
    GET: "GET",
    PUT: "PUT",
    POST: "POST",
    DELETE: "DELETE",
};
class apiSerivice {

    _api_url = "/api/";
    _auth_url = "/auth"
    _download_url = "/file/";
    _auth_token = null;

    constructor(auth_url, api_url, download_url) {
        this._api_url = api_url;
        this._auth_url = auth_url;
        this._download_url = download_url;
    }

    async _auth() {
        const resp = await fetch(this._auth_url);
        const { data } = await resp.json();
        this._auth_token = data;
    }

    async request(method, action, data = null) {

        if (this._auth_token == null) {
            await this._auth();
        }

        const body = data != null ? JSON.stringify(data) : null;
        const params = {
            method,
            headers: {
                'Authorization': "Bearer " + this._auth_token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body,
            mode: 'cors'
        };
        const resp = await fetch(this._api_url + action, params);
        if (resp.status == 401) {
            this._auth_token = null;
            return await this.request(method, action, data);
        }
        const obj = await resp.json();

        return obj;
    }


    async getAllFiles() {
        return await this.request(METHOD.GET, "/");
    }

    async newFile(title) {
        return await this.request(METHOD.PUT, "/", { title });
    }

    async uploadFile(id, fileObj) {
        const data = new FormData();
        data.append("uploaded_file", fileObj);
        const params = {
            method: METHOD.POST,
            headers: {
                'Authorization': "Bearer " + this._auth_token,
                'Accept': 'application/json',
            },
            body: data,
            mode: 'cors'
        };
        await fetch(this._api_url + "/files/" + id, params);
    }

    async deleteFile(id) {
        return await this.request(METHOD.DELETE, "/files/" + id);
    }

    download(id) {
        window.open(this._download_url + id);
    }


}


export default apiSerivice;
class dumpService {

    _waitTimeout = 100;
    _data = [
        {
            "id": "5ef1a88bdc0994001dc508a5",
            "title": "test file first",
            "date_add": "2020-06-23T07:00:27.243Z"
        },
        {
            "id": "5ef1a88cdc0994001dc508a6",
            "title": "file 2",
            "date_add": "2020-06-23T07:00:28.057Z",
            "real_filename": "2211505e5e6a75de0c49d3e180376acb",
            "filename": "test1.txt",
            "date_upload": "2020-06-23T07:00:51.267Z"
        },
        {
            "id": "5ef1a88cdc0994001dc508a7",
            "title": "second data file",
            "date_add": "2020-06-23T07:00:28.772Z",
            "real_filename": "4ed3557142e5f120130aa06660c7e9dc",
            "filename": "test2_data.txt",
            "date_upload": "2020-06-23T07:01:08.318Z"
        },
        {
            "id": "5ef1a88ddc0994001dc508a8",
            "title": "unload file",
            "date_add": "2020-06-23T07:00:29.398Z"
        }
    ];

    constructor() {
    }

    async getAllFiles() {
        await this._later(300);
        return this._data;
    }

    async newFile(title) {
        await this._later(100);
        const date_add = (new Date()).toISOString();
        const file = { id: this._getUId(), title, date_add, };
        this._data = [...this._data, file];
        return file;
    }

    async uploadFile(id, fileObj) {
        await this._later(500);
        const index = this._data.findIndex(f => f.id == id);
        if (index == -1) {
            throw new Error("File not found");
        }
        const file = this._data[index];
        const real_filename = this._getUId();
        const filename = fileObj.name;
        const date_upload = (new Date()).toISOString();
        const new_file = { ...file, real_filename, filename, date_upload };
        this._data = [
            ...this._data.slice(0, index),
            new_file,
            ...this._data.slice(index + 1),
        ];
        return new_file;
    }

    async deleteFile(id) {
        await this._later(100);
        this._data = this._data.filter(f => f.id != id);
        return { "status": "ok" };
    }

    download(id) {
        console.log("Download file: ", id);
    }

    _getUId = function () {
        var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
        return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function () {
            return (Math.random() * 16 | 0).toString(16);
        }).toLowerCase();
    };

    _later(delay) {
        return new Promise(function (resolve) {
            setTimeout(resolve, delay);
        });
    }
}

export default dumpService;
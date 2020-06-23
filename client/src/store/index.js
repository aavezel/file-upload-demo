import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    files: [
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
    ]
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})

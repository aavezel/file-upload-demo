import Vue from 'vue'
import Vuex from 'vuex'
import apiWSSerivice from './apiWSSerivice';
//import apiService from './apiSerivice';
//import dummyService from './dummyService';

Vue.use(Vuex)

//const datastore = process.env.VUE_APP_STORE_MODE == "DUMMY" ? new dummyService() : new apiService();
//const datastore = new apiService("http://localhost:8888/auth", "http://localhost:8888/api", "http://localhost:8888/file/");
const datastore = new apiWSSerivice(
  "http://localhost:8888/auth",
  "ws://localhost:8888/ws",
  "http://localhost:8888/api/files/",
  "http://localhost:8888/file/"
);

const store = new Vuex.Store({
  state: {
    files: [],
    files_filter: ''
  },
  getters: {
    filtred_files: state => {
      const filter = state.files_filter;
      return state.files.filter(f => f.title.includes(filter) || (f.filename && f.filename.includes(filter)));
    }
  },
  mutations: {
    SET_FILES(state, value) {
      state.files = value
    },
    SET_FILES_FILTER(state, value) {
      state.files_filter = value
    }
  },
  actions: {
    async LOADED_FILES_LIST({commit}, { files }) {
      commit("SET_FILES", files)
    },
    async LOADING_FILES_LIST() {
      datastore.getAllFiles();
    },
    async ADD_FILE(store, title) {
      await datastore.newFile(title);
    },
    async UPLOAD_FILE(store, { id, file }) {
      await datastore.uploadFile(id, file);
    },
    async DELETE_FILE(store, id) {
      await datastore.deleteFile(id);
    },
    async DOWNLOAD_FILE(obj, id) {
      datastore.download(id);
    },
  },
  modules: {
  }
});


datastore.onFilesLoaded = (files) => {
    store.dispatch("LOADED_FILES_LIST", { files });
};

export default store;
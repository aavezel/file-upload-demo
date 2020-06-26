import Vue from 'vue'
import Vuex from 'vuex'
//import apiWSSerivice from './apiWSSerivice';
//import apiService from './apiSerivice';
import dummyService from './dummyService';

Vue.use(Vuex)

const datastore = new dummyService();
//const datastore = new apiService("http://localhost:8888/auth", "http://localhost:8888/api", "http://localhost:8888/file/");
// const datastore = new apiWSSerivice(
//   "http://localhost:8888/auth",
//   "ws://localhost:8888/ws",
//   "http://localhost:8888/api/files/",
//   "http://localhost:8888/file/"
// );

const store = new Vuex.Store({
  state: {
    files: [],
    files_filter: '',
    is_loading: false,
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
    },
    SET_LOADING(state, value) {
      state.is_loading = value;
    }
  },
  actions: {
    SET_LOADING({commit}) {
      commit("SET_LOADING", true);
    },
    SET_LOADED({commit}) {
      commit("SET_LOADING", false);
    },
    async LOADED_FILES_LIST({dispatch, commit}, { files }) {
      commit("SET_FILES", files)
      dispatch("SET_LOADED");
    },
    async LOADING_FILES_LIST({dispatch}) {
      dispatch("SET_LOADING");
      datastore.getAllFiles();
    },
    async ADD_FILE({dispatch}, title) {
      dispatch("SET_LOADING");
      await datastore.newFile(title);
    },
    async UPLOAD_FILE({dispatch}, { id, file }) {
      dispatch("SET_LOADING");
      await datastore.uploadFile(id, file);
    },
    async DELETE_FILE({dispatch}, id) {
      dispatch("SET_LOADING");
      await datastore.deleteFile(id);
    },
    async DOWNLOAD_FILE(obj, id) {
      datastore.download(id);
    },
  },
  modules: {
  }
});


datastore.onFilesChanged = (files) => {
    store.dispatch("LOADED_FILES_LIST", { files });
};

export default store;
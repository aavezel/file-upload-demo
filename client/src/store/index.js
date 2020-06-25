import Vue from 'vue'
import Vuex from 'vuex'
import apiService from './apiSerivice';
//import dummyService from './dummyService';

Vue.use(Vuex)

//const datastore = process.env.VUE_APP_STORE_MODE == "DUMMY" ? new dummyService() : new apiService();
const datastore = new apiService("http://localhost:8888/auth", "http://localhost:8888/api", "http://localhost:8888/file/");

export default new Vuex.Store({
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
    async LOAD_FILES_LIST({ commit }) {
      const data = await datastore.getAllFiles();
      commit("SET_FILES", data);
    },
    async ADD_FILE({ dispatch }, title) {
      await datastore.newFile(title);
      dispatch("LOAD_FILES_LIST");
    },
    async UPLOAD_FILE({ dispatch }, { id, file }) {
      await datastore.uploadFile(id, file);
      dispatch("LOAD_FILES_LIST");
    },
    async DELETE_FILE({ dispatch }, id) {
      await datastore.deleteFile(id);
      dispatch("LOAD_FILES_LIST");
    },
    async DOWNLOAD_FILE(obj, id) {
      datastore.download(id);
    },
  },
  modules: {
  }
})

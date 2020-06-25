import Vue from 'vue'
import Vuex from 'vuex'
import apiService from './apiSerivice';
import dummyService from './dummyService';

Vue.use(Vuex)

const datastore = process.env.VUE_APP_STORE_MODE == "DUMMY" ? new dummyService() : new apiService();

export default new Vuex.Store({
  state: {
    files: [
    ]
  },
  mutations: {
    SET_FILES(state, value) {
      state.files = value
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

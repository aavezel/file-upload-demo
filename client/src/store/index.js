import Vue from 'vue'
import Vuex from 'vuex'
import apiWSSerivice from './apiWSSerivice';
import apiService from './apiSerivice';
import dummyService from './dummyService';

Vue.use(Vuex)

function getService(store_name) {
  if (store_name == "http") {
    return new apiService(
      process.env.VUE_APP_STORE_AUTH_URL,
      process.env.VUE_APP_STORE_API_URL,
      process.env.VUE_APP_STORE_DOWNLOAD_URL,
    );
  } else if (store_name == "ws") {
    return new apiWSSerivice(
      process.env.VUE_APP_STORE_AUTH_URL,
      process.env.VUE_APP_STORE_WS_URL,
      process.env.VUE_APP_STORE_WS_UPLOAD_URL,
      process.env.VUE_APP_STORE_WS_DOWNLOAD_URL,
    );
  } else {
    return new dummyService();
  }
}

const store = new Vuex.Store({
  state: {
    files: [],
    files_filter: '',
    is_loading: false,
    datastore: null,
    service_name: "dummy",
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
    },
    SET_SERVICE(state, value) {
      state.service_name = value;
    },
    SET_DATASTORE(state, value) {
      state.datastore = value;
    }
  },
  actions: {
    SET_LOADING({ commit }) {
      commit("SET_LOADING", true);
    },
    SET_LOADED({ commit }) {
      commit("SET_LOADING", false);
    },
    async LOADED_FILES_LIST({ dispatch, commit }, { files }) {
      commit("SET_FILES", files)
      dispatch("SET_LOADED");
    },
    async LOADING_FILES_LIST({ dispatch, state: { datastore } }) {
      dispatch("SET_LOADING");
      datastore.getAllFiles();
    },
    async ADD_FILE({ dispatch, state: { datastore } }, title) {
      dispatch("SET_LOADING");
      await datastore.newFile(title);
    },
    async UPLOAD_FILE({ dispatch, state: { datastore } }, { id, file }) {
      dispatch("SET_LOADING");
      await datastore.uploadFile(id, file);
    },
    async DELETE_FILE({ dispatch, state: { datastore } }, id) {
      dispatch("SET_LOADING");
      await datastore.deleteFile(id);
    },
    async DOWNLOAD_FILE({ state: { datastore } }, id) {
      datastore.download(id);
    },
    MAKE_SERVICE({ dispatch, commit }, { store }) {
      dispatch("SET_LOADING");
      commit("SET_SERVICE", store);
      const datastore = getService(store);
      datastore.onFilesChanged = (files) => dispatch("LOADED_FILES_LIST", { files });
      commit("SET_DATASTORE", datastore);
      datastore.getAllFiles();
    }
  },
  modules: {
  }
});

export default store;
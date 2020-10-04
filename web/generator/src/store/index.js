import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    test: undefined,
    file: undefined
  },
  mutations: {
    setTest(state, test) {
      state.test = test;
    },
    setFile(state, file) {
      state.file = file;
    }
  },
  actions: {
  },
  modules: {
  }
})

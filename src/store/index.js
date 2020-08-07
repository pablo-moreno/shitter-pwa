import Vue from "vue"
import Vuex from "vuex"
import VuexPersistence from 'vuex-persist'
import AuthStore from './auth.store'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ...AuthStore.state,
  },
  mutations: {
    ...AuthStore.mutations,
  },
  actions: {
    ...AuthStore.actions,
  },
  modules: {},
  plugins: [
    vuexLocal.plugin,
  ]
})

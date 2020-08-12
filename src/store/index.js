import Vue from "vue"
import Vuex from "vuex"
import VuexPersistence from 'vuex-persist'
import AuthStore from './auth.store'
import StatusStore from './status.store'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ...AuthStore.state,
    ...StatusStore.state,
  },
  mutations: {
    ...AuthStore.mutations,
    ...StatusStore.mutations,
  },
  actions: {
    ...AuthStore.actions,
    ...StatusStore.actions,
  },
  modules: {},
  plugins: [
    vuexLocal.plugin,
  ]
})

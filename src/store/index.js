import Vue from "vue"
import Vuex from "vuex"
import AuthStore from './auth.store'

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
  modules: {}
})

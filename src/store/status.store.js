export default {
  state: {
    offline: false,
    notifications: []
  },
  mutations: {
    setOffline(state) {
      state.offline = true
    },
    setOnline(state) {
      state.offline = false
    },
  },
  actions: {
    setOffline({ commit }) {
      commit('setOffline')
    },
    setOnline({ commit }) {
      commit('setOnline')
    },
  }
}
export default {
  state: {
    auth: {
      user: undefined,
      token: undefined
    }
  },
  mutations: {
    login(state, { user, token }) {
      state.auth.user = user
      state.auth.token = token
    },
    logout(state) {
      state.auth.user = undefined
      state.auth.token = undefined
    },
    updateMe(state, user) {
      state.user = user
    }
  },
  actions: {
    login({ commit }, payload) {
      commit('login', payload)
    },
    logout({ commit }) {
      commit("logout")
    },
    updateMe({ commit }, user) {
      commit('updateMe', user)
    }
  }
}

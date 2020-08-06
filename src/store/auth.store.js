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
    }
  },
  actions: {
    login({ commit }, payload) {
      commit('login', payload)
    },
    logout({ commit }) {
      commit("logout")
    }
  }
}

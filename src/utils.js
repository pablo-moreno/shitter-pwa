import store from './store'

export const isAuthenticated = () => {
  const { token, user } = store.state.auth

  return token !== undefined && user !== undefined 
}

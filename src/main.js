import Vue from "vue"
import App from "./App.vue"
import "./registerServiceWorker"
import router from "./router"
import store from "./store"
import BaseHttpAPIService from './services/http'

Vue.config.productionTip = false

class HttpAPIService extends BaseHttpAPIService {
  getToken() {
    return store.state.auth.token
  }
}

Vue.prototype.$http = new HttpAPIService()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")

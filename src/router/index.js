import Vue from "vue"
import VueRouter from "vue-router"
import Home from "@/views/Home.vue"
import { Login, SignUp } from '@/views/auth'
import { isAuthenticated } from '../utils'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      protected: true,
    }
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: SignUp,
    meta: {
      protected: false,
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      protected: false,
    }
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, fromRoute, next) => {
  if (to.meta.protected && !isAuthenticated()) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router

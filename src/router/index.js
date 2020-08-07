import Vue from "vue"
import VueRouter from "vue-router"
import Home from "@/views/Home.vue"
import ShitDetail from "@/views/shits/ShitDetail.vue"
import UserDetails from "@/views/users/UserDetails.vue"
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
    path: "/shit/:uuid",
    name: "shit-detail",
    component: ShitDetail,
    meta: {
      protected: true,
    }
  },
  {
    path: "/i/:username",
    name: "user-details",
    component: UserDetails,
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

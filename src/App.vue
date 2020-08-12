<template>
  <div id="app">
    <navbar v-if="isAuthenticated" @logout="logout" />
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import EventBus from './EventBus'
import Navbar from './components/Navbar'
import { mapState } from 'vuex'

export default {
  components: {
    Navbar,
  },
  computed: mapState({
    isAuthenticated: state => state.auth.user && state.auth.token
  }),
  created() {
    const events = ['ready', 'registered', 'cached', 'updated', 'updatefound', 'offline', 'sw-error']

    events.forEach(event => {
      EventBus.$on(event, () => {
        console.log(`${event.toUpperCase()} event dispatched on Service Worker`)
      })
    })
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/global.scss';
@import '@/styles/colors.scss';

body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: $primary;
  min-height: 100vh;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.content {
  padding-top: 64px;
}
</style>

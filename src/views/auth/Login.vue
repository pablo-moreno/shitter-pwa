<template>
  <div class="login-view">
    <form class="login-form" @submit.prevent="login">
      <header class="login-form-header">
        <img class="icon-wrapper icon-large" src="@/assets/poop.svg" alt="Shitter" />
      </header>
      <div class="login-form-fields">
        <input type="text" v-model="username" placeholder="Username">
        <input type="password" v-model="password" placeholder="Password">

        <router-link :to="{'name': 'sign-up'}">
          Don't you have an account? You can sign up here!
        </router-link>

        <span v-if="error">
          {{ error.message }}
        </span>
        <button class="default-button">
          Login
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      error: '',
    }
  },
  methods: {
    async login() {
      try {
        const { data } = await this.$http.post('auth/login', {
          username: this.username,
          password: this.password,
        })
        this.$store.dispatch('login', data)
        this.$router.push({ name: 'home' })
      } 
      catch (error) {
        this.error = error
      }
    }
  }
}
</script>
<style lang="scss" scoped>
a {
  font-size: 16px;
}
</style>

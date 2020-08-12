<template>
  <div class="login-view">
    <form class="login-form" @submit.prevent="signUp">
      <header class="login-form-header">
        <img class="icon-wrapper icon-large" src="@/assets/poop.svg" alt="Shitter" />
      </header>
      <div class="login-form-fields">
        <input type="text" name="username" v-model="username" placeholder="Username">
        <input type="email" name="email" v-model="email" placeholder="E-Mail">
        <input type="password" name="password" v-model="password" placeholder="Your password">
        <input type="password" name="password2" v-model="password2" placeholder="Repeat your password">

        <router-link :to="{name: 'login'}">
          If you already have an account, you can login here
        </router-link>

        <span v-if="error">
          {{ error.message }}
        </span>

        <button class="default-button">
          Sign up
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
      email: '',
      password: '',
      password2: '',
      error: '',
    }
  },
  methods: {
    async signUp() {
      try {
        const response = await this.$http.post('auth/sign-up', {
          username: this.username,
          email: this.email,
          password: this.password,
          password2: this.password,
        })

        if (response.status === 201) {
          this.$router.push({ name: 'login' })
        }
      }
      catch (error) {
        this.error = error
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>

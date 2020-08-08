<template>
  <div class="login-view">
    <form class="login-form" @submit.prevent="login">
      <header class="login-form-header">
        <img class="icon-wrapper icon-large" src="@/assets/poop.svg" alt="Shitter" />
      </header>
      <div class="login-form-fields">
        <input type="text" v-model="username" placeholder="Username">
        <input type="password" v-model="password" placeholder="Password">

        <span v-if="error">
          {{ error.message }}
        </span>
        <button>
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
@import '@/styles/colors.scss';

.login-view {
  background-color: $primary;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-form {
    display: flex;
    background-color: #EEE;
    margin: 1rem;
    min-width: 50%;
    justify-content: center;
    flex-direction: column;
    border-radius: 16px;
    padding: 2em;

    &-header {
      display: flex;
      justify-content: center;
    }

    &-fields {
      margin: 1em;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      input, button {
        margin: 0.5em 1em;
        min-width: 200px;
        border-radius: 8px;
        padding: 8px;
        border: none;
      }

      button {
        cursor: pointer;
      }

    }
  }
}
</style>

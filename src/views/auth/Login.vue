<template>
  <div class="login-view">
    <form class="login-form" @submit.prevent="login">
      <header class="login-form-header">
        <icon source="@/assets/poop.svg" alt="Shitter" />
      </header>
      <div class="login-form-fields">
        <input type="text" v-model="username" placeholder="Username">
        <input type="password" v-model="password" placeholder="Password">

        <button>
          Login
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import Icon from '@/components/Icon'

export default {
  components: {
    Icon,
  },
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    async login() {
      const { data } = await this.$http.post('auth/login', {
        username: this.username,
        password: this.password,
      })
      this.$store.dispatch('login', data)
      this.$router.push({name: 'home'})
    }
  }
}
</script>
<style lang="scss" scoped>
.login-view {
  background-color: #fecf32;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-form {
    display: flex;
    background-color: #EEE;
    margin: 4rem;
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
        width: 300px;
        border-radius: 8px;
        padding: 8px;
        border: none;
      }

    }
  }
}
</style>
<template>
  <div class="shit-post">
    <form @submit.prevent="postShit">

      <div class="shit-post-user">
        <router-link :to="{name: 'user-details', params: { username: me.username }}">
          <img v-if="me.profile.profile_picture" class="icon-wrapper icon-small" :src="me.profile.profile_picture" :alt="`@${me.username}`">
          <img v-else class="icon-wrapper icon-small has-background" src="@/assets/user-2.svg" :alt="`@${me.username}`">
        </router-link>

        <textarea v-model="text" placeholder="Write your next shit!" maxlength="280" />
      </div>

      <button class="default-button">
        Shit!
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: '',
    }
  },
  computed: {
    me() {
      return this.$store.state.auth.user
    }
  },
  methods: {
    async postShit() {
      if (!this.text) {
        return
      }

      try {
        const response = await this.$http.post('shitter/shits/', {
          text: this.text,
        })

        if (response.status === 201) {
          this.$emit('newshit', response.data)
        }
      }
      catch (error) {
        console.log('error', error.message)
      }

      this.text = ''
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/colors.scss';

.shit-post {
  padding: 1em;
  background-color: $darkgold;

  &-user {
    display: flex;
    margin-bottom: 1em;

    img {
      padding: .5em;
      border: none;
    }
  }

  form {
    display: flex;
    flex-direction: column;

    textarea {
      font-family: Avenir, Helvetica, Arial, sans-serif;
      width: 100%;
      font-size: 20px;
      padding: .5em;
      margin: .5em;
      border: none;
      border-bottom: solid 3px transparent;
      background-color: transparent;
      transition: 0.250s ease-in;
      white-space: pre-wrap;

      &:focus {
        border-bottom: solid 3px darken($darkgold, 10%);
      }
    }
  }
}
</style>
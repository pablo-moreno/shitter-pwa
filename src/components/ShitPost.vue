<template>
  <div class="shit-post">
    <form @submit.prevent="postShit">

      <div class="shit-post-user">
        <router-link :to="{name: 'user-details', params: { username: user.username }}">
          <img v-if="user.profile.profile_picture" class="icon-wrapper icon-small" :src="user.profile.profile_picture" :alt="`@${user.username}`">
          <img v-else class="icon-wrapper icon-small has-background" src="@/assets/user-2.svg" :alt="`@${user.username}`">
        </router-link>
        <input type="text" v-model="text" placeholder="Write your next shit!" />
      </div>

      <button class="default-button">
        Shit!
      </button>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      text: '',
    }
  },
  computed: mapState({
    user: state => state.auth.user
  }),
  methods: {
    postShit() {
      if (!this.text) {
        return
      }

      this.$emit('post-shit', this.text)
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

    input {
      width: 100%;
      font-size: 20px;
      padding: .5em;
      margin: .5em;
      border: none;
      border-bottom: solid 3px transparent;
      background-color: transparent;
      transition: 0.250s ease-in;

      &:focus {
        border-bottom: solid 3px darken($darkgold, 10%);
      }
    }
  }
}
</style>
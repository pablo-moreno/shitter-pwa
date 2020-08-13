<template>
  <div class="user-card">
    <div class="user-card-image">
      <div class="user-card-image-wrapper">
        <img 
          class="icon-wrapper icon-small" 
          :src="user.profile.profile_picture" 
          :alt="`@${user.username}`"
        >
      </div>
      <div class="user-card-info">
        <div class="user-card-info-name">
          <h3>
            <router-link :to="{name: 'user-details', params: { username: user.username }}">
              {{ user.first_name }}
            </router-link>
          </h3>
          <span class="badge">
            @{{ user.username }}
          </span>
        </div>
        <div class="user-card-info-description">
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus dolore quam totam nihil optio cumque provident quia in, sunt ab incidunt quos consequuntur et, nemo ipsa veniam libero odio exercitationem!
          </p>
        </div>
      </div>
    </div>
    
    <div class="user-card-follow">
      <button
        v-if="!user.following.im_following && user.username !== me.username"
        class="default-button follow"
        @click="follow(true)"
      >
        Follow
      </button>

      <button
        v-if="user.following.im_following && user.username !== me.username"
        class="default-button unfollow"
        @click="follow(false)"
      >
        Unfollow
      </button>
      
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: {
    user: {
      type: Object,
      required: true,
    }
  },
  computed: mapState({
    me: state => state.auth.user,
  }),
  methods: {
    async follow(state) {
      try {
        if (state) {
          await this.$http.post(`shitter/users/${this.user.username}/follow/`)
        }
        else {
          await this.$http.delete(`shitter/users/${this.user.username}/follow`)
        }
        this.$emit('follow', this.user)
      }
      catch (error) {
        console.error('error', error)        
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/colors.scss';

.user-card {
  display: flex;
  background-color: #fff;
  padding: 1em;
  margin-bottom: 1em;
  border-radius: 8px;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 640px) {
    flex-direction: column;
  }

  h3 {
    margin: 0;
  }

  &-follow {
    @media screen and (max-width: 640px) {
      width: 100%;

      button {
        width: 100%;
      }
    }
  }

  &-image {
    display: flex;

    &-wrapper {
      min-width: 68px;
    }
  }

  &-info {
    padding: 0 1em;

    &-name {
      display: flex;
      margin-bottom: 1em;
      align-items: center;

      span {
        margin-left: 1em;
      }
    }

    &-description {
      display: flex;
      p {
        margin: 0 0 1em 0;
      }
    }
  }
}
</style>
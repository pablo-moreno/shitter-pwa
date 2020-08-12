<template>
  <div class="user-card">
    <div class="user-card-image">
      <img 
        class="icon-wrapper icon-small" 
        :src="user.profile.profile_picture" 
        :alt="`@${user.username}`"
      >
      <div class="user-card-info">
        <div class="user-card-info-name">
          <h3>
            <router-link :to="{name: 'user-details', params: { username: user.username }}">
              {{ user.first_name }}
            </router-link>
          </h3>
          <span>
            @{{ user.username }}
          </span>
        </div>
        <div class="user-card-info-counters">
          <span>
            {{ user.total_shits }} shits
          </span>
          <span>
            {{ user.following_count }} following
          </span>
          <span>
            {{ user.followers_count }} followers
          </span>
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
          await this.$http.post('shitter/follows/', {
            from_user: this.me.username,
            to_user: this.user.username,
          })
        }
        else {
          await this.$http.delete(`shitter/follows/from/${this.me.username}/to/${this.user.username}`)
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

  h3 {
    margin: 0;
  }

  &-image {
    display: flex;
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

    &-counters {
      display: flex;

      span {
        border-radius: 4px;
        padding: .25em;
        background-color: $darkgold;
        margin-right: 1em;
      }
    }
  }

  
}
</style>
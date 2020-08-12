<template>
  <div class="user-details-header" v-if="user">
    <header class="user-details-header-background">
      <label for="user-image">
        <img
          v-if="user.username === me.username && me.profile.profile_picture"
          class="icon-wrapper icon-large floating-icon"
          :src="me.profile.profile_picture"
          :alt="`@${user.username} at Shitter`"
          label="User image" for="user-image"
        />

        <img
          v-if="user.profile.profile_picture"
          class="icon-wrapper icon-large floating-icon"
          :src="user.profile.profile_picture"
          :alt="`@${user.username} at Shitter`"
          label="User image" for="user-image"
        />
        <img
          v-if="!user.profile.profile_picture"
          class="icon-wrapper icon-large floating-icon has-background"
          src="@/assets/user-2.svg"
          :alt="`@${user.username} at Shitter`"
          label="User image" for="user-image"
        />
      </label>
      
      <input 
        style="display: none" 
        type="file" 
        id="user-image" 
        :disabled="user.username !== me.username" 
        @change="uploadImage"
      >

      <div class="user-background-picture">
        <img src="@/assets/background.jpg" :alt="user.username" />
      </div>

      <section class="user-description">
        <div class="user-description-wrapper">
          <div class="user-description-start">
            <h2>
              {{ user.first_name }}
              <span v-if="user.following.follows_me">Following you</span>
            </h2>
            <h4>@{{ user.username }}</h4>
            <div>
              <router-link
                class="followers-link"
                :to="{
                  name: 'followers-list',
                  params: { username: user.username },
                }"
              >
                {{ user.following_count }} <span>Following</span>
              </router-link>
              <router-link
                class="followers-link"
                :to="{
                  name: 'followers-list',
                  params: { username: user.username },
                }"
              >
                {{ user.followers_count }} <span>Followers</span>
              </router-link>
            </div>
            <div>
              <h4>{{ user.total_shits }} shits</h4>
              <h4></h4>
            </div>
          </div>
          <div
            class="user-description-end"
          >
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
      </section>

      <div v-if="user.username === me.username">
        <shit-post />
      </div>

    </header>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import ShitPost from './ShitPost'

export default {
  components: {
    ShitPost,
  },
  props: {
    user: {
      type: Object,
      required: true,
    }
  },
  computed: mapState({
    me: state => state.auth.user
  }),
  methods: {
    follow(state) {
      this.$emit('follow', state)
    },
    async uploadImage(e) {
      try {
        const image = e.target.files[0]
        const data = new FormData()
        data.append('profile_picture', image)
        
        const response = await this.$http.post('auth/me/profile/picture', data, {}, {
          headers: {
            ...this.$http.getHeaders(),
            'Content-Type': 'multipart/form-data',
          }
        })

        if (response.status === 201) {

          const { data } = await this.$http.get('auth/me')
          this.$store.dispatch('updateMe', data)
        }
      } catch (error) {
        console.error('error', error)
      }
    },
    toggleEdit() {
      this.edit = !this.edit
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/colors.scss';

.user-details-header {
  position: relative;
  min-height: 144px;
  background-color: white;
  border-radius: 16px 16px 0 0;
  margin: 1em 0 0 0;

  @media screen and (max-width: 780px) {
    margin: 0;
    border-radius: 0;
  }

  &-background {
    height: 100%;
  }

  .floating-icon {
    position: absolute;
    top: calc((400px - 128px) / 2);
    left: 1em;
  }

  .user-background-picture {
    height: 50%;

    img {
      width: 100%;
      height: 200px;
      border-radius: 16px 16px 0 0;

        @media screen and (max-width: 780px) {
          border-radius: 0;
        }
    }

  }

  .user-description {
    padding: 80px 1em 1em 1em;
    display: flex;

    &-wrapper {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }

    h2, h4 {
      margin: 0;
      padding: 0;

      span {
        font-size: .6em;
        border-radius: 8px;
        background-color: $darkgold;
        padding: .5em;
        text-align: center;
      }
    }
  }


  .followers-link {
    font-weight: bolder;
    text-decoration: none;

    span {
      font-weight: normal;
    }
  }
}
</style>
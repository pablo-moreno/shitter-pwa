<template>
  <div>
    <div class="shit-list-view">
      <list-view :items="shits" :loading="loading">
        <template #header>
          
          <div class="user-details-header" v-if="user">

            <header class="user-details-header-background">
              <img
                class="icon-wrapper icon-large floating-icon"
                :src="user.profile.profile_picture"
                :alt="`@${user.username} at Shitter`"
              />

              <div class="user-background-picture">
                <img src="@/assets/background.jpg" :alt="user.username">
              </div>

              <section class="user-description">
                <div class="user-description-wrapper">
                  <div class="user-description-start">
                    <h2>
                      {{ user.first_name }} <span v-if="user.following.follows_me">Following you</span>
                    </h2>
                    <h4>
                      @{{ user.username }}
                    </h4>
                    <div>
                      <router-link class="followers-link" :to="{ name: 'followers-list', params: { username: user.username }}">
                        {{ user.following_count }} <span>Following</span>
                      </router-link>
                      <router-link class="followers-link" :to="{ name: 'followers-list', params: { username: user.username }}">
                        {{ user.followers_count }} <span>Followers</span>
                      </router-link>
                    </div>
                    <div>
                      <h4>
                        {{ user.total_shits }} shits
                      </h4>
                      <h4>
                      </h4>
                    </div>
                  </div>
                  <div class="user-description-end" v-if="me.username !== user.username">
                    <button v-if="!user.following.im_following" class="default-button follow" @click="follow(true)">
                      Follow
                    </button>
                    <button v-if="user.following.im_following" class="default-button unfollow" @click="follow(false)">
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

        <template #default="{ item }">
          <shit :shit="item" />
        </template>

        <template #footer>
          <div></div>
        </template>
      </list-view>
    </div>
  </div>
</template>

<script>
import ListView from "@/components/ListView"
import ShitPost from "@/components/ShitPost"
import Shit from "@/components/Shit"
import { mapState } from 'vuex'

export default {
  components: {
    ListView,
    Shit,
    ShitPost,
  },
  data() {
    return {
      user: undefined,
      shits: [],
      loading: false,
    };
  },
  computed: mapState({
    me: state => state.auth.user
  }),
  created() {
    this.fetchUserInfo()
  },
  methods: {
    async fetchUserInfo() {
      const { data } = await this.$http.get(
        `shitter/users/${this.$route.params.username}`
      );
      this.user = data
      this.fetchUserShits()
    },
    async fetchUserShits() {
      this.loading = true
      const { data } = await this.$http.get("shitter/shits", {
        user: this.$route.params.username,
      })
      this.loading = false
      this.shits = data.results
    },
    async follow(follow) {
      try {
        if (follow) {
          await this.$http.post('shitter/follows/', {
            from_user: this.me.username,
            to_user: this.user.username,
          })
        }
        else {
          await this.$http.delete(`shitter/follows/from/${this.me.username}/to/${this.user.username}`)
        }
        this.fetchUserInfo()
      }
      catch (error) {
        console.error('error', error)        
      }

    },
  },
  
}
</script>
<style lang="scss" scoped>
@import '@/styles/colors.scss';

.followers-link {
  font-weight: bolder;
  text-decoration: none;

  span {
    font-weight: normal;
  }
}

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
}
</style>

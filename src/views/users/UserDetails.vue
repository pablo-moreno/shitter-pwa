<template>
  <div>
    <div class="shit-list-view">
      <list-view :items="shits" :loading="loading">
        <template #header>
          <user-details-header 
            v-if="user" 
            :user="user" 
            @follow="follow" 
            @newshit="e => fetchUserShits(false)"
          />
        </template>

        <template #default="{ item }">
          <shit :shit="item" />
        </template>

        <template #footer>
          <div>
            <div class="load-more" v-if="next && !loading">
              <button class="default-button" @click="nextPage">
                Load more shits 
              </button>
            </div>
            <div v-if="loading" class="loading-wrapper">
              <loading />
            </div>
          </div>
        </template>
      </list-view>
    </div>
  </div>
</template>

<script>
import ListView from "@/components/ListView"
import Loading from "@/components/Loading"
import UserDetailsHeader from "@/components/UserDetailsHeader"
import Shit from "@/components/Shit"
import { mapState } from 'vuex'

export default {
  components: {
    ListView,
    Loading,
    Shit,
    UserDetailsHeader,
  },
  data() {
    return {
      user: undefined,
      shits: [],
      page: 1,
      next: undefined,
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
    nextPage() {
      if (this.next) {
        this.page++
        this.fetchUserShits(true)
      }
    },
    async fetchUserShits(paginated=true) {
      let query = {}

      if (paginated) {
        query = {
          user: this.$route.params.username,
          page: this.page,
        }
      }
      else {
        query = {
          user: this.$route.params.username,
        }
        this.page = 1
        this.next = undefined
        this.shits = []
      }

      this.loading = true
      const { data } = await this.$http.get("shitter/shits", query)
      this.loading = false
      this.shits = [...this.shits, ...data.results]
      this.next = data.next
    },
    async follow(state) {
      try {
        if (state) {
          await this.$http.post(`shitter/users/${this.user.username}/follow/`)
        }
        else {
          await this.$http.delete(`shitter/users/${this.user.username}/follow/`)
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
</style>

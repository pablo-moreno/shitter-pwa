<template>
  <div>
    <div class="shit-list-view">
      <list-view :items="shits" :loading="loading">
        <template #header>
          <user-details-header v-if="user" :user="user" @follow="follow" />
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
import UserDetailsHeader from "@/components/UserDetailsHeader"
import Shit from "@/components/Shit"
import { mapState } from 'vuex'

export default {
  components: {
    ListView,
    Shit,
    UserDetailsHeader,
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

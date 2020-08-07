<template>
  <div>
    <div class="shit-list-view">

      <list-view :items="shits" :loading="loading">

        <template #header>
          <div></div>
        </template>

        <template #default="{ item }">
          <shit :shit="item" />
        </template>

        <template #footer>
          <div>

          </div>
        </template>

      </list-view>
    </div>
  </div>
</template>

<script>
import ListView from '@/components/ListView'
import Shit from '@/components/Shit'

export default {
  components: {
    ListView,
    Shit,
  },
  data() {
    return {
      shits: [],
      loading: false,
    }
  },
  created() {
    this.fetchUserShits()
  },
  methods: {
    async fetchUserShits() {
      this.loading = true
      const { data } = await this.$http.get('shitter/shits', {
        user: this.$route.params.username
      })
      this.loading = false
      this.shits = data.results
    }
  }
}
</script>
<template>
  <div class="home">
    <shit :shit="shit" v-if="shit" />
  </div>
</template>

<script>
import Shit from '@/components/Shit'


export default {
  name: "Home",
  components: {
    Shit,
  },
  data() {
    return {
      shit: undefined,
      loading: false,
    }
  },
  created() {
    this.fetchShit()
  },
  methods: {
    async fetchShit() {
      this.loading = true
      const { data } = await this.$http.get(`shitter/shits/${this.$route.params.uuid}`)
      this.loading = false
      this.shit = data
    }
  }
}
</script>
<style lang="scss" scoped>
.shit-list-view {
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
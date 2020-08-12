<template>
  <div class="shit-detail">
    <shit :shit="shit" v-if="shit" />
  </div>
</template>

<script>
import Shit from '@/components/Shit'


export default {
  name: "shit-detail",
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
.shit-detail {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2em;

  article {
    min-width: 50%;

    @media screen and (max-width: 1024px) {
      min-width: 80%;
    }

    @media screen and (max-width: 760px) {
      min-width: 100%;
    }
  }
}

</style>
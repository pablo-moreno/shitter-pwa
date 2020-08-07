<template>
  <div class="home">
    <list-view :items="shits">
      <template #default="{ item }">
        <shit :shit="item" />
      </template>

    </list-view>
  </div>
</template>

<script>
import ListView from '@/components/ListView'
import Shit from '@/components/Shit'


export default {
  name: "Home",
  components: {
    ListView,
    Shit,
  },
  data() {
    return {
      shits: []
    }
  },
  created() {
    this.fetchShits()
  },
  methods: {
    async fetchShits() {
      const { data } = await this.$http.get('shitter/shits')
      this.shits = data.results
    }
  }
}
</script>

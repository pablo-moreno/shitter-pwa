<template>
  <div class="home">
    <div class="shit-list-view">

      <list-view :items="shits" :loading="loading">

        <template #header>
          <shit-post @post-shit="createShit"/>
        </template>

        <template #default="{ item }">
          <shit :shit="item" @favourite="markAsFavourite" @reshit="doReshit" />
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
import ShitPost from '@/components/ShitPost'


export default {
  name: "Home",
  components: {
    ListView,
    ShitPost,
    Shit,
  },
  data() {
    return {
      shits: [],
      loading: false,
    }
  },
  created() {
    this.fetchShits()
  },
  methods: {
    async createShit(text) {
      try {
        const { data } = await this.$http.post('shitter/shits/', {
          text,
        })

        console.log('shit', data)
        this.fetchShits()
      } 
      catch (error) {
        console.log('error', error.message)
      }
    },
    async fetchShits() {
      this.loading = true
      const { data } = await this.$http.get('shitter/shits')
      this.loading = false
      this.shits = data.results
    },
    async markAsFavourite(shit) {
      try {
        let response = undefined

        if (shit.is_favourite) {
          response = await this.$http.delete(`shitter/shits/${shit.uuid}/favourite`)
        }
        else {
          response = await this.$http.post(`shitter/shits/${shit.uuid}/favourite`)
        }

        if (response.status === 201 || response.status === 204) {
          this.fetchShits()
        }
      }
      catch (error) {
        console.log('error', error)
      }
    },
    doReshit(shit) {
      console.log('reshit', shit)
    }
  }
}
</script>
<style lang="scss" scoped>


</style>
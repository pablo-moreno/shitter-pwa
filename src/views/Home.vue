<template>
  <div class="home">
    <div class="shit-list-view">

      <list-view :items="shits" :loading="loading">

        <template #header>
          <shit-post @newshit="newShit"/>
        </template>

        <template #default="{ item }">
          <shit :shit="item" @favourite="markAsFavourite" />
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
    this.requestNotificationPermissions()
  },
  methods: {
    async newShit(data) {
      this.fetchShits()
      this.notify(data)
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
    async requestNotificationPermissions() {
      if ('Notification' in window) {
        await Notification.requestPermission()
      }
    },
    buildNotification(data) {
      const router = this.$router
      
      const options = {
        body: data.text,
        icon: '/img/icons/poop.svg'
      }
      const notification = new Notification('Shit created', options)

      notification.addEventListener('click', function() {
        router.push({
          name: 'shit-detail',
          params: {
            uuid: data.uuid,
          }
        })
      })
    },
    async notify(data) {
      if (!("Notification" in window)) {
        return
      }
      else if (Notification.permission === "granted") {
        this.buildNotification(data)
      }
      else if (Notification.permission !== 'denied') {
        const permission = await Notification.requestPermission()
        
        if (permission === "granted") {
          this.buildNotification(data)
        }
      }
    },
  }
}
</script>
<style lang="scss" scoped>


</style>
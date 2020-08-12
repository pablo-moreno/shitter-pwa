<template>

  <div class="users-list">
    <list-view :items="users">
      <template #default="{ item }">
        <user-card :user="item" @follow="getUsers" />
      </template>
    </list-view>
  </div>

</template>

<script>
import ListView from '@/components/ListView'
import UserCard from '@/components/UserCard'

export default {
  components: {
    ListView,
    UserCard,
  },
  data() {
    return {
      users: [],
    }
  },
  created() {
    this.getUsers()
  },
  methods: {
    async getUsers() {
      try {
        const { data } = await this.$http.get('shitter/users', this.$route.query)
        this.users = data.results
      } 
      catch (error) {
        console.log('error', error)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.users-list {
  display: flex;
  justify-content: center;

}
</style>
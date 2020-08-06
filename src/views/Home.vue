<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div>Iconos diseñados por <a href="https://www.flaticon.es/autores/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.es/" title="Flaticon">www.flaticon.es</a></div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {

  },
  created() {
    this.fetchShits()
  },
  methods: {
    async fetchShits() {
      const { data } = await this.$http.get('shitter/shits')
      console.info('shits', data)
    }
  }
}
</script>

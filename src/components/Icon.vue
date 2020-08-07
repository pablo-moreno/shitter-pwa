<template>
  <div>
    <img class="icon-wrapper" src="@/assets/poop.svg" :alt="alt">
  </div>
</template>
<script>
export default {
  props: {
    source: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: true
    }
  }
}
</script>
<style lang="scss" scoped>
.icon-wrapper {
  width: 128px;
  height: 128px;
  border-radius: 100%;
  border: solid 2px black;
  display: flex;
  justify-content: center;
}
</style>
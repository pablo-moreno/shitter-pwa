<template>
  <div class="snackbar" >
    <span>
      {{ text }}
    </span>
    <button class="snackbar-button">
      Accept
    </button>
  </div>
</template>

<script>
export default {
  props: {
    callback: {
      type: Function,
      default: () => {}
    },
    text: {
      type: String,
      required: true,
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/colors.scss';

.snackbar {
  position: fixed;
  bottom: 0;
  min-width: 300px;
  height: 48px;
  right: 0;
  background-color: $darkgold;
  margin: 1em;
  padding: 1em;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &-button {
    background-color: rgba($color: #000000, $alpha: 0.1);
    border: none;
    padding: 1em;
    border-radius: 8px;
    cursor: pointer;

    &:hover {
      background-color: rgba($color: #000000, $alpha: 0.2);
    }
    &:active {
      background-color: rgba($color: #000000, $alpha: 0.3);
    }
  }
}
</style>
<template>
  <div class="loading">
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/colors.scss';

.loading {
  border-radius: 50%;
  width: 64px;
  height: 64px;
  border: 16px solid darken($darkgold, 10%);
  border-top: 16px solid darken($darkgold, 20%);

  animation: spin 2s linear infinite;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
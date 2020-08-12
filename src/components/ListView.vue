<template>
  <div class="list-view">
    <header class="list-view-header">
      <slot name="header">
      </slot>
    </header>

    <ul class="list-view-itself">
      <li v-for="(item, index) in items" :key="`item-${index}`">
        <slot :item="item">
          
        </slot>
      </li>
    </ul>

    <div v-if="items.length === 0 && !loading">
      <slot name="empty">
        
      </slot>
    </div>

    <footer class="list-view-footer">
      <slot name="footer">
      </slot>
    </footer>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
    },
    loading: {
      type: Boolean,
      default: false,
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/colors.scss';

.list-view {
  box-shadow: rgba(0, 0, 0, 0.6) 0px 0px 10px;
  min-width: 780px;

  @media screen and (max-width: 1024px) {
    min-width: 640px;
  }

  @media screen and (max-width: 768px) {
    min-width: 0px;
  }
}

ul {
  list-style: none;
  margin: 0;
  padding: 1em;
  background-color: $darkgold;
}
</style>
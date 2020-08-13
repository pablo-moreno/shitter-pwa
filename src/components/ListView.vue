<template>
  <div class="list-view">
    <header class="list-view-header">
      <slot name="header">
      </slot>
    </header>

    <ul class="list-view-itself" :class="{'has-items': items.length > 0}">
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
        <div v-if="loading" class="loading-wrapper">
          <loading />
        </div>
      </slot>
    </footer>
  </div>
</template>

<script>
import Loading from './Loading'

export default {
  components: {
    Loading,
  },
  props: {
    items: {
      type: Array,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/colors.scss';

.list-view {
  box-shadow: rgba(0, 0, 0, 0.6) 0px 0px 10px;
  min-width: 780px;
  max-width: 1200px;

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
  background-color: $darkgold;

}
.has-items {
  padding: 1em;
}
</style>
<template>
  <div class="list-view">
    <header class="list-view-header">
      <slot name="header">
        This is the default header and will appear if we don't specify anything
      </slot>
    </header>

    <ul class="list-view-itself">
      <li v-for="(item, index) in items" :key="`item-${index}`">
        <slot :item="item">
          
        </slot>
      </li>
    </ul>

    <div v-if="items.length === 0">
      <slot name="empty">
        There aren't any items.
      </slot>
    </div>

    <footer class="list-view-footer">
      <slot name="footer">
        This is the default footer
      </slot>
    </footer>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
    }
  }
}
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
}
</style>
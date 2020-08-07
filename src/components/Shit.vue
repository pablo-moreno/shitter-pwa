<template>
  <article class="shit">
    <header class="shit-header">
      <img class="icon-wrapper icon-medium" :src="shit.user.profile.profile_picture" :alt="`@${shit.user.username}`">
      <div class="shit-user-info">
        <h4>{{ shit.user.username }}</h4>
      </div>
    </header>
    <div class="shit-content">

    </div>
  </article>
</template>
<script>
export default {
  props: {
    shit: {
      type: Object,
      required: true
    }
  }
}
</script>
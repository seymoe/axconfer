<template>
  <div>
    <section class="hero is-light is-fullheight">
      <div class="hero-head">
        <Header />
      </div>
      <div class="hero-body">
        <nuxt />
      </div>
    </section>
  </div>
</template>

<script>
import Header from '~/components/Header.vue'

export default {
  components: {
    Header
  }
}
</script>

<style scoped>
.hero.is-light{
  background-color: #212121;
}
</style>

<template>
  <div>
    <section class="hero is-light is-bold is-fullheight">
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
  background-image: url("~assets/trianglify.svg");
  background-size: 100% 100%;
}
</style>

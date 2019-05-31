<template>
  <div>
    <section class="hero is-light">
      <div class="hero-head">
        <Header />
      </div>
    </section>
    <section class="section">
      <nuxt />
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

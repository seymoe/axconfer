<template>
  <div>
    <section class="hero is-light is-medium">
      <div class="hero-head">
        <Header />
      </div>
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">
            {{ conferList[0]['title'] }}
          </h1>
          <h2 class="subtitle">
            {{ conferList[0]['subtitle'].split('----')[0] }}
            <br>
            {{ conferList[0]['subtitle'].split('----')[1] }}
          </h2>
        </div>
      </div>
    </section>
    <nuxt />
    <Footer />
  </div>
</template>

<script>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'

export default {
  components: {
    Header,
    Footer
  },
  computed: {
    conferList() {
      if (this.$store.state.conference.length) {
        return this.$store.state.conference
      }
      return []
    }
  }
}
</script>

<template>
  <div>
    <section class="hero is-light is-medium" :style="{backgroundImage: 'url('+ conferList[0]['headerImageUrl'] +')'}">
      <div class="hero-head">
        <Header theme="light" />
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

<style scoped>
.hero{
  position: relative;
  background-position: center center;
  background-size: cover;
}
.hero::before{
  display: block;
  position: absolute;
  content: '';
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.3);
}
.hero.is-light .title{
  color: #fff;
}
.hero.is-light .subtitle{
  color: #fff;
}
</style>

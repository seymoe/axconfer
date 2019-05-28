<template>
  <div>
    <section class="hero is-light is-medium">
      <div class="hero-head">
        <Header/>
      </div>
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">
          2019年工程热物理学会工程热力学与能源利用分会
          </h1>
          <h2 class="subtitle">
          The Engineering Thermodynamics and Energy Utilization Branch of the Engineering Thermophysics Society
          <br>
          2019.11.1-11.3 中国 桂林
          </h2>
        </div>
      </div>
    </section>
    <nuxt />
    <Footer/>
  </div>
</template>

<script>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'

export default {
  components: {
    Header,
    Footer
  }
}
</script>

<template>
  <div>
    <br>
    <section class="container">
      <div class="columns">
        <div class="column is-3">
          <Sidebar />
        </div>
        <div class="column is-8">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">
                组织结构 {{params.slug}}
              </p>
            </header>
            <div class="card-content">
              <div class="content">
                <p>Purus semper eget duis at tellus at urna condimentum mattis. Non blandit massa enim nec. Integer enim neque volutpat ac tincidunt vitae semper quis. Accumsan tortor posuere ac ut consequat semper viverra nam.</p>
                <p><a href="#">Learn more</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Sidebar from '~/components/Sidebar.vue'

export default {
  components: {
    Sidebar
  },
  asyncData({ params }) {
    return { params: params }
  }
}
</script>

<template>
  <div>
    <div class="box cta">
      <p class="has-text-centered">
        <span class="tag is-primary">New</span> Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
    </div>
    <section class="container">
      <div class="columns">
        <div class="column is-3">
          <Sidebar />
        </div>
        <div class="column is-8">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">
                重要通知
              </p>
            </header>
            <div class="card-content">
              <div class="content">
                <p>Purus semper eget duis at tellus at urna condimentum mattis. Non blandit massa enim nec. Integer enim neque volutpat ac tincidunt vitae semper quis. Accumsan tortor posuere ac ut consequat semper viverra nam.</p>
                <p><a href="#">Learn more</a></p>
              </div>
            </div>
          </div>
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">
                组委会欢迎致辞
              </p>
            </header>
            <div class="card-content">
              <div class="content">
                <p>Purus semper eget duis at tellus at urna condimentum mattis. Non blandit massa enim nec. Integer enim neque volutpat ac tincidunt vitae semper quis. Accumsan tortor posuere ac ut consequat semper viverra nam.</p>
                <p><a href="#">Learn more</a></p>
              </div>
            </div>
          </div>
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">
                中国工程热物理学会工程热物理分会
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
  }
}
</script>

<style>

</style>

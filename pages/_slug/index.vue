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
                {{ pageData.title }}
              </p>
            </header>
            <div class="card-content">
              <div class="content" v-html="pageData.content" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Sidebar from '~/components/Sidebar.vue'
import axios from '~/plugins/axios'
export default {
  components: {
    Sidebar
  },
  async asyncData(context) {
    const res = await axios.get('/pages?slug=' + context.params.slug)
    console.log(res.data)
    return { pageData: res.data.length ? res.data[0] : {} }
  }
}
</script>

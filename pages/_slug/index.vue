<template>
  <div>
    <br>
    <section class="container">
      <div class="columns">
        <div class="column is-3">
          <Sidebar />
        </div>
        <div class="column is-9">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">
                {{ pageData.title }}
              </p>
            </header>
            <div class="card-content">
              <div class="content" v-html="contentHtml" />
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
import { mdToHtml } from '~/plugins/utils'
export default {
  components: {
    Sidebar
  },
  computed: {
    contentHtml() {
      if (this.pageData.content) {
        return mdToHtml(this.pageData.content)
      } else {
        return ''
      }
    }
  },
  async asyncData(context) {
    const res = await axios.get('/pages?slug=' + context.params.slug)
    console.log(res.data)
    return { pageData: res.data.length ? res.data[0] : {} }
  }
}
</script>

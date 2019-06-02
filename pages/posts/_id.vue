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
                {{ post.title }}
              </p>
            </header>
            <div class="card-content">
              <p class="time">
                发布日期：<b>{{ post.createdAt }}</b>
              </p>
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
import dayjs from 'dayjs'
export default {
  components: {
    Sidebar
  },
  data() {
    return {
      post: {
        title: ''
      }
    }
  },
  computed: {
    contentHtml() {
      if (this.post.content) {
        return mdToHtml(this.post.content)
      } else {
        return ''
      }
    }
  },
  async asyncData({ req, params, store, redirect, error }) {
    try {
      const res = await axios.get('/posts/' + params.id)
      if (res.data) {
        const d = res.data
        d.createdAt = dayjs(d.createdAt).format('YYYY-MM-DD')
        return {
          post: d
        }
      }
    } catch (err) {
      error({ statusCode: err.statusCode, message: err.message })
    }
  }
}
</script>

<style scoped>
.time{
  margin-bottom: 14px;
  font-size: 12px;
  color: #666;
}
.content{
  color: #000;
}
</style>

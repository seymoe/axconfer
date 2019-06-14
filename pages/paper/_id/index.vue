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
                论文详情
              </p>
            </header>
            <div class="card-content">
              <p><b>标题：</b>{{ paper.title }}</p>
              <p>
                <b>作者：</b><b-tag v-for="(item, index) in author" :key="index" style="margin-right: 12px">
                  {{ item }}
                </b-tag>
              </p>
              <p>
                <b>单位：</b><b-tag v-for="(item, index) in department" :key="index" style="margin-right: 12px">
                  {{ item }}
                </b-tag>
              </p>
              <p>
                <b>关键词：</b><b-tag v-for="(item, index) in keywords" :key="index" style="margin-right: 12px">
                  {{ item }}
                </b-tag>
              </p>
              <p><b>邮编：</b>{{ paper.postcode }}</p>
              <p><b>电话：</b>{{ paper.phone }}</p>
              <p><b>邮箱：</b>{{ paper.email }}</p>
              <p><b>主题：</b>{{ paper.topic }}</p>
              <p v-if="paper.file && paper.file.url">
                <b>下载：</b>
                <a :href="paper.file.url" :download="paper.file.name" target="_blank">{{ paper.file.name }}</a>
              </p>
              <p v-else>
                论文未上传
              </p>
              <p>
                <b>评阅：</b>
                <b-table :data="paper.reviews" :columns="reviewColumns" />
              </p>
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
import { mapGetters } from 'vuex'

export default {
  middleware: 'auth',
  layout: 'nohero',
  components: {
    Sidebar
  },
  data() {
    return {
      paper: {
        pid: '',
        title: '',
        author: '',
        department: '',
        keywords: '',
        postcode: '',
        email: '',
        phone: '',
        topic: '',
        status: ''
      },
      reviewColumns: [
        { field: 'presentation', label: '推荐展示', width: 200 },
        { field: 'level', label: '推荐等级', width: 200 },
        { field: 'recommend', label: '推荐期刊', width: 200 },
        { field: 'content', label: '评阅意见', width: 500 }
      ]
    }
  },
  computed: {
    ...mapGetters({
      headerAuth: 'getAuthHeader'
    }),
    keywords() {
      if (this.paper && this.paper.keywords) {
        const arr = this.paper.keywords.split(',')
        return arr
      } else {
        return []
      }
    },
    author() {
      if (this.paper && this.paper.author) {
        const arr = this.paper.author.split(',')
        return arr
      } else {
        return []
      }
    },
    department() {
      if (this.paper && this.paper.department) {
        const arr = this.paper.department.split(',')
        return arr
      } else {
        return []
      }
    }
  },
  async asyncData({ req, params, store, redirect, error }) {
    try {
      const token = store.state.user.token
      if (token) {
        const { data: paper } = await axios.get(`/papers/${params.id}`, store.getters.getAuthHeader)
        if (paper) {
          const { data: reviews } = await axios.get(`/reviews?paperId=${paper.id}`, store.getters.getAuthHeader)
          paper.reviews = reviews
          if (!paper.user || paper.user.id !== store.state.user.userInfo.id) {
            // 防止看到其他用户的paper
            error({ statusCode: 403, message: '权限错误' })
          } else {
            return { paper: paper }
          }
        } else {
          error({ statusCode: 404, message: '页面走丢了' })
        }
      } else {
        redirect('/login')
      }
    } catch (err) {
      error({ statusCode: err.statusCode, message: err.message })
    }
  }
}
</script>

<style scoped>
.card-content p{
  margin-bottom: 15px;
}
</style>

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
              <p><b>作者：</b>{{ paper.author }}</p>
              <p><b>单位：</b>{{ paper.department }}</p>
              <p><b>关键词：</b>{{ paper.keywords }}</p>
              <p><b>邮编：</b>{{ paper.postcode }}</p>
              <p><b>电话：</b>{{ paper.phone }}</p>
              <p><b>邮箱：</b>{{ paper.email }}</p>
              <p><b>主题：</b>{{ paper.topic }}</p>
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
      }
    }
  },
  async asyncData({ req, params, store, redirect, error }) {
    try {
      const token = store.state.user.token
      if (token) {
        const res = await axios.get('/papers/' + params.id, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        console.log(res)
        if (res.status === 200) {
          return { paper: res.data }
        } else {
          error({ statusCode: 404, message: '页面走丢了' })
        }
      } else {
        redirect('/login')
      }
    } catch (err) {
      console.log(err)
      error({ statusCode: 404, message: '页面走丢了' })
    }
  }
}
</script>

<style scoped>
.card-content p{
  margin-bottom: 15px;
}
</style>

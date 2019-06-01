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
                编辑论文
              </p>
            </header>
            <div class="card-content">
              <b-field label="论文标题">
                <b-input v-model="paper.title" />
              </b-field>
              <b-field label="论文作者（请用分号隔开）">
                <b-input v-model="paper.author" />
              </b-field>
              <b-field label="关键词（请用分号隔开）">
                <b-input v-model="paper.keywords" />
              </b-field>
              <b-field label="投稿单位">
                <b-input v-model="paper.department" />
              </b-field>
              <b-field label="单位邮编">
                <b-input v-model="paper.postcode" />
              </b-field>
              <b-field label="联系人电话">
                <b-input v-model="paper.phone" />
              </b-field>
              <b-field label="联系人邮件">
                <b-input v-model="paper.email" />
              </b-field>
              <b-field label="论文主题">
                <b-select v-model="paper.topic" placeholder="选择主题" expanded>
                  <option v-for="topic in topics" :key="topic.id" :value="topic.label">
                    {{ topic.label }}
                  </option>
                </b-select>
              </b-field>
              <b-field
                label="上传论文"
              />
              <b-button type="is-primary">
                提交
              </b-button>
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
      },
      topics: [
        {
          label: '基础热力学',
          id: '1'
        },
        {
          label: '热力系统循环',
          id: '2'
        },
        {
          label: '热泵、制冷空调',
          id: '2'
        },
        {
          label: '材料热物性',
          id: '3'
        },
        {
          label: '可再生能源、脱碳、储能等',
          id: '4'
        },
        {
          label: '热力系统动态特性、诊断与控制',
          id: '5'
        }
      ]
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

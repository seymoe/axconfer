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
              <b-field label="作者">
                <b-taginput
                  v-model="paper.author"
                  icon="label"
                  placeholder="添加作者"
                />
              </b-field>
              <b-field label="单位">
                <b-taginput
                  v-model="paper.department"
                  icon="label"
                  placeholder="添加单位"
                />
              </b-field>
              <b-field label="关键词">
                <b-taginput
                  v-model="paper.keywords"
                  icon="label"
                  placeholder="添加关键词"
                />
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
              <b-button type="is-primary" @click="handleSubmit">
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
  middleware: 'auth',
  components: {
    Sidebar
  },
  data() {
    return {
      paper: {
        pid: '',
        title: '',
        author: [],
        department: [],
        keywords: [],
        postcode: '',
        email: '',
        phone: '',
        topic: ''
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
          id: '3'
        },
        {
          label: '材料热物性',
          id: '4'
        },
        {
          label: '可再生能源、脱碳、储能等',
          id: '5'
        },
        {
          label: '热力系统动态特性、诊断与控制',
          id: '6'
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
        if (res.data) {
          const _data = res.data
          _data.author = _data.author.split(',')
          _data.department = _data.department.split(',')
          _data.keywords = _data.keywords.split(',')
          return { paper: _data }
        }
      } else {
        redirect('/login')
      }
    } catch (err) {
      error({ statusCode: err.statusCode, message: err.message })
    }
  },
  methods: {
    async handleSubmit() {
      try {
        const data = {
          title: this.paper.title,
          postcode: this.paper.postcode,
          email: this.paper.email,
          phone: this.paper.phone,
          topic: this.paper.topic,
          user: this.paper.user.id,
          pid: this.paper.pid
        }
        data.author = this.paper.author.join(',')
        data.department = this.paper.department.join(',')
        data.keywords = this.paper.keywords.join(',')
        const res = await axios.put('/papers/' + this.paper.id, data)
        if (res.data) {
          this.$notification.open({
            message: '论文编辑成功',
            type: 'is-success',
            position: 'is-top'
          })
          this.$router.push('/paper/me')
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>
.card-content p{
  margin-bottom: 15px;
}
</style>

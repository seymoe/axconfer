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
                创建论文
              </p>
            </header>
            <div class="card-content">
              <b-field label="标题">
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
              <b-field label="主题">
                <b-select v-model="paper.topic" placeholder="请选择主题">
                  <option
                    v-for="topic in topics"
                    :key="topic.id"
                    :value="topic.label"
                  >
                    {{ topic.label }}
                  </option>
                </b-select>
              </b-field>
              <b-field label="邮箱Email">
                <b-input v-model="paper.email" type="email" />
              </b-field>
              <b-field label="邮编">
                <b-input v-model="paper.postcode" />
              </b-field>
              <b-field label="电话">
                <b-input v-model="paper.phone" />
              </b-field>
              <b-field label="论文初稿">
                <b-upload v-model="file">
                  <a class="button is-light">
                    <b-icon icon="upload" />
                    <span>Click to upload</span>
                  </a>
                </b-upload>
                <span v-if="file" class="file-name">
                  {{ file.name }}
                </span>
              </b-field>
              <b-field>
                <b-button type="is-primary" @click="handleSubmit">
                  提交
                </b-button>
              </b-field>
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
      ],
      paper: {
        title: '',
        author: [],
        department: [],
        keywords: [],
        email: '',
        phone: '',
        topic: '',
        postcode: '',
        user: ''
      },
      file: null,
      pid: ''
    }
  },
  computed: {
    currentYear() {
      if (this.$store.state.conference.length) {
        const obj = this.$store.state.conference[0]
        return obj.year
      }
      return ''
    },
    userInfo() {
      if (this.$store.state.user.userInfo) {
        return this.$store.state.user.userInfo
      } else {
        return {}
      }
    }
  },
  mounted() {
    this.getPidNumber()
  },
  methods: {
    async handleSubmit() {
      try {
        const data = Object.assign({}, this.paper)
        data.author = data.author.join(',')
        data.department = data.department.join(',')
        data.keywords = data.keywords.join(',')
        // pid
        if (this.pid) {
          data.pid = this.pid
        } else {
          await this.getPidNumber()
        }
        // user
        data.user = this.userInfo.id
        const res = await axios.post('/papers', data)
        if (res.data) {
          this.$notification.open({
            message: '论文创建成功',
            type: 'is-success',
            position: 'is-top'
          })
          this.$router.push('/paper/me')
        }
      } catch (err) {
        console.log(err)
      }
    },
    async getPidNumber() {
      if (!this.currentYear) return false
      try {
        const res = await axios.get('/papers/count?year=' + this.currentYear)
        if (this.currentYear && res.data) {
          const year = this.currentYear.slice(this.currentYear.length - 2)
          const num = +res.data
          this.pid = `${year}${1000 + num + 1}`
        } else {
          this.pid = ''
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

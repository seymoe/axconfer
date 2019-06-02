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
              <form>
                <b-field
                  label="标题"
                  :type="{'is-danger': errors.has('paper.title')}"
                  :message="errors.first('paper.title')"
                >
                  <b-input v-model="paper.title" v-validate="'required'" name="paper.title" />
                </b-field>
                <b-field
                  label="作者"
                  :type="{'is-danger': errors.has('paper.author')}"
                  :message="errors.first('paper.author')"
                >
                  <b-taginput
                    v-model="paper.author"
                    v-validate="'required'"
                    name="paper.author"
                    icon="label"
                    placeholder="添加作者"
                  />
                </b-field>
                <b-field
                  label="单位"
                  :type="{'is-danger': errors.has('paper.department')}"
                  :message="errors.first('paper.department')"
                >
                  <b-taginput
                    v-model="paper.department"
                    v-validate="'required'"
                    name="paper.department"
                    icon="label"
                    placeholder="添加单位"
                  />
                </b-field>
                <b-field
                  label="关键词"
                  :type="{'is-danger': errors.has('paper.keywords')}"
                  :message="errors.first('paper.keywords')"
                >
                  <b-taginput
                    v-model="paper.keywords"
                    v-validate="'required'"
                    name="paper.keywords"
                    icon="label"
                    placeholder="添加关键词"
                  />
                </b-field>
                <b-field
                  label="主题"
                  :type="{'is-danger': errors.has('paper.topic')}"
                  :message="errors.first('paper.topic')"
                >
                  <b-select
                    v-model="paper.topic"
                    v-validate="'required'"
                    name="paper.topic"
                    placeholder="请选择主题"
                  >
                    <option
                      v-for="topic in topics"
                      :key="topic.id"
                      :value="topic.label"
                    >
                      {{ topic.label }}
                    </option>
                  </b-select>
                </b-field>
                <b-field
                  label="邮箱Email"
                  :type="{'is-danger': errors.has('paper.email')}"
                  :message="errors.first('paper.email')"
                >
                  <b-input v-model="paper.email" v-validate="'required|email'" name="paper.email" type="email" />
                </b-field>
                <b-field
                  label="邮编"
                  :type="{'is-danger': errors.has('paper.postcode')}"
                  :message="errors.first('paper.postcode')"
                >
                  <b-input v-model="paper.postcode" v-validate="{required: true, regex: /\d{6}/}" name="paper.postcode" />
                </b-field>
                <b-field
                  label="电话"
                  :type="{'is-danger': errors.has('paper.phone')}"
                  :message="errors.first('paper.phone')"
                >
                  <b-input v-model="paper.phone" v-validate="{required: 'paper.phone', regex: /^1\d{10}$|^(0\d{2,3}-?|\(0\d{2,3}\))?[1-9]\d{4,7}(-\d{1,8})?$/}" name="paper.phone" />
                </b-field>
                <b-field
                  label="论文初稿"
                  :type="{'is-danger': errors.has('file')}"
                  :message="errors.first('file')"
                >
                  <div>
                    <b-upload
                      v-model="file"
                      v-validate="'required'"
                      name="file"
                    >
                      <a class="button is-light">
                        <b-icon icon="upload" />
                        <span>Click to upload</span>
                      </a>
                    </b-upload>
                    <span v-if="file" class="file-name">
                      {{ file.name }}
                    </span>
                  </div>
                </b-field>
                <b-field>
                  <b-button type="is-primary" @click="validateFields">
                    提交
                  </b-button>
                </b-field>
              </form>
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

const valiDict = {
  custom: {
    'paper.title': {
      required: '请输入论文标题'
    },
    'paper.author': {
      required: '请输入作者，按回车键确认'
    },
    'paper.department': {
      required: '请输入部门，按回车键确认'
    },
    'paper.keywords': {
      required: '请输入关键词，按回车键确认'
    },
    'paper.topic': {
      required: '请选择主题'
    },
    'paper.email': {
      required: '请输入邮箱',
      email: '邮箱格式不正确'
    },
    'paper.postcode': {
      required: '请输入邮编',
      regex: '邮编格式不正确'
    },
    'paper.phone': {
      required: '请输入电话号码',
      regex: '格式不正确'
    },
    'file': {
      required: '请选择论文上传'
    }
  }
}

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
  created() {
    this.$validator.localize('zh_CN', valiDict)
  },
  mounted() {
    this.getPidNumber()
  },
  methods: {
    validateFields() {
      console.log(this.$validator)
      this.$validator.validateAll().then((result) => {
        console.log(result)
        if (result) {
          this.handleSubmit()
        }
      })
    },
    async handleSubmit() {
      try {
        const data = Object.assign({}, this.paper)
        data.author = data.author.join(',')
        data.department = data.department.join(',')
        data.keywords = data.keywords.join(',')
        data.file = this.file
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

<style scoped>
.file-name{
  margin-top: 14px;
}
</style>

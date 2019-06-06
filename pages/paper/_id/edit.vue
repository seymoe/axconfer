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
                      v-for="(topic,index) in topics"
                      :key="index"
                      :value="topic"
                    >
                      {{ topic }}
                    </option>
                  </b-select>
                </b-field>
                <b-field
                  label="联系Email"
                  :type="{'is-danger': errors.has('paper.email')}"
                  :message="errors.first('paper.email')"
                >
                  <b-input v-model="paper.email" v-validate="'required|email'" name="paper.email" type="email" />
                </b-field>
                <b-field
                  label="联系邮编"
                  :type="{'is-danger': errors.has('paper.postcode')}"
                  :message="errors.first('paper.postcode')"
                >
                  <b-input v-model="paper.postcode" v-validate="{required: true, regex: /\d{6}/}" name="paper.postcode" />
                </b-field>
                <b-field
                  label="联系电话"
                  :type="{'is-danger': errors.has('paper.phone')}"
                  :message="errors.first('paper.phone')"
                >
                  <b-input v-model="paper.phone" v-validate="{required: 'paper.phone', regex: /^1\d{10}$|^(0\d{2,3}-?|\(0\d{2,3}\))?[1-9]\d{4,7}(-\d{1,8})?$/}" name="paper.phone" />
                </b-field>
                <b-field
                  label="上传论文"
                  :type="{'is-danger': errors.has('paper.file')}"
                  :message="errors.first('paper.file')"
                >
                  <div>
                    <b-upload
                      v-model="paper.file"
                      v-validate="'required'"
                      name="paper.file"
                    >
                      <a class="button is-light">
                        <b-icon icon="upload" />
                        <span>点击上传</span>
                      </a>
                    </b-upload>
                    <span v-if="paper.file" class="file-name">
                      {{ paper.file.name }}
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
import { mapGetters } from 'vuex'
import { TOPIC_ENUM } from '~/config'

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
    'paper.file': {
      required: '请选择论文上传'
    }
  }
}

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
        author: [],
        department: [],
        keywords: [],
        postcode: '',
        email: '',
        phone: '',
        topic: '',
        file: null
      },
      topics: TOPIC_ENUM
    }
  },
  computed: {
    ...mapGetters({
      headerAuth: 'getAuthHeader'
    })
  },
  async asyncData({ req, params, store, redirect, error }) {
    try {
      const token = store.state.user.token
      if (token) {
        const res = await axios.get('/papers/' + params.id, store.getters.getAuthHeader)
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
  created() {
    this.$validator.localize('zh_CN', valiDict)
  },
  methods: {
    validateFields() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.handleSubmit()
        }
      })
    },
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
          // file: this.paper.file
        }
        data.author = this.paper.author.join(',')
        data.department = this.paper.department.join(',')
        data.keywords = this.paper.keywords.join(',')

        // const formData = new FormData()
        // for (const key in data) {
        //   if (data.hasOwnProperty(key)) {
        //     formData.append(key, data[key])
        //   }
        // }

        const res = await axios.put('/papers/' + this.paper.id, data, this.headerAuth)
        if (res.data) {
          this.$notification.open({
            message: '论文编辑成功',
            type: 'is-success',
            position: 'is-top-right'
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

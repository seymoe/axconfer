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
                编辑个人资料
              </p>
            </header>
            <div class="card-content">
              <form>
                <b-field
                  label="用户名"
                  :type="{'is-danger': errors.has('userInfo.username')}"
                  :message="errors.first('userInfo.username')"
                >
                  <b-input v-model="userInfo.username" v-validate="'required'" name="userInfo.username" />
                </b-field>
                <b-field
                  label="单位"
                  :type="{'is-danger': errors.has('userInfo.department')}"
                  :message="errors.first('userInfo.department')"
                >
                  <b-input v-model="userInfo.department" v-validate="'required'" name="userInfo.department" />
                </b-field>

                <b-field
                  label="教授请选择主题"
                  :type="{'is-danger': errors.has('userInfo.topic')}"
                  :message="errors.first('userInfo.topic')"
                >
                  <b-select
                    v-model="userInfo.topic"
                    v-validate="'required'"
                    name="userInfo.topic"
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
    'userInfo.username': {
      required: '请输入用户名'
    },
    'userInfo.topic': {
      required: '请选择主题'
    },
    'userInfo.department': {
      required: '请输入单位'
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
      userInfo: {
        username: '',
        topic: '',
        department: []
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
        const res = await axios.get(`/users/me`, store.getters.getAuthHeader)
        console.log(res.data)
        if (res.data) {
          const _data = res.data
          // 此处department为string即可
          // _data.department = typeof (_data.department) === 'string' ? _data.department.split(',') : []
          if (!_data.id || _data.id !== store.state.user.userInfo.id) {
            // 防止看到其他用户的paper
            error({ statusCode: 403, message: '权限错误' })
          } else {
            return { userInfo: _data }
          }
        } else {
          error({ statusCode: 404, message: '页面走丢了' })
        }
      } else {
        redirect('/login')
      }
    } catch (err) {
      console.log(err)
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
          username: this.userInfo.username,
          topic: this.userInfo.topic,
          department: this.userInfo.department
        }
        data.department = data.department.join(',')

        const res = await axios.put(`/users/${this.userInfo.id}`, data, this.headerAuth)
        if (res.data) {
          this.$notification.open({
            message: '用户信息修改成功',
            type: 'is-success',
            position: 'is-top-right'
          })
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

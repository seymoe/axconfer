<template>
  <div class="container">
    <div class="columns">
      <div class="column is-4 table-wrap">
        <b-table
          :paginated="true"
          :data="userData"
          :per-page="10"
          :pagination-simple="true"
          :columns="userColumns"
          :checked-rows.sync="checkedUser"
          checkable
        >
          <template slot="bottom-left">
            <b>Total checked</b>: {{ checkedUser.length }}
          </template>
        </b-table>
      </div>
      <div class="column is-8">
        <form>
          <b-field
            label="收件人："
          >
            <b-input v-model="receiver" disabled />
          </b-field>
          <b-field
            label="邮件标题："
            :type="{'is-danger': errors.has('title')}"
            :message="errors.first('title')"
          >
            <b-input v-model="title" v-validate="'required'" name="title" />
          </b-field>
          <b-field
            label="邮件正文："
            :type="{'is-danger': errors.has('content')}"
            :message="errors.first('content')"
          >
            <b-input v-model="content" v-validate="'required'" name="content" type="textarea" />
          </b-field>
        </form>
        <button class="button btn-send is-primary" @click="handleSendMail">
          发送
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import { mapGetters } from 'vuex'

const valiDict = {
  custom: {
    title: {
      required: '请输入标题'
    },
    content: {
      required: '请输入邮件正文'
    }
  }
}
export default {
  middleware: 'auth',
  layout: 'nohero',
  data() {
    return {
      userData: [],
      checkedUser: [],
      userColumns: [
        { field: 'username', label: '用户名称' },
        { field: 'email', label: '邮箱' }
      ],
      title: '',
      content: '',

      // 用户列表分页相关
      current: 1
    }
  },
  computed: {
    ...mapGetters({
      headerAuth: 'getAuthHeader'
    }),
    receiver() {
      if (this.checkedUser.length) {
        const _c = this.checkedUser.map(u => u.email)
        return _c.join(' ; ')
      } else {
        return ''
      }
    }
  },
  async asyncData({ req, store, redirect, error }) {
    try {
      const user = store.state.user
      const userId = store.state.user.userInfo.id
      if (user.token && userId) {
        const returnData = {}
        // 总用户数
        // const count = await axios.get('/users/count', store.getters.getAuthHeader)
        // console.log('count', count)
        // 用户列表
        const res = await axios.get('/users', store.getters.getAuthHeader)
        if (res.data) {
          returnData.userData = res.data
        }
        return returnData
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
    async handleSendMail() {
      try {
        if (this.checkedUser.length <= 0) {
          this.$notification.open({
            message: '请先选择用户',
            type: 'is-info',
            position: 'is-top-right'
          })
          return false
        }

        for (let i = 0; i < this.checkedUser.length; i++) {
          const data = {
            html: this.content,
            to: this.checkedUser[i].email,
            subject: this.title
          }
          await axios.post('/email', data, this.headerAuth)
        }
        this.$notification.open({
          message: '发送成功',
          type: 'is-success',
          position: 'is-top-right'
        })
        this.checkedUser = []
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.btn-send{
  margin-top: 14px;
}
</style>

<template>
  <div class="container">
    <div class="columns">
      <div class="column is-4">
        <b-table
          :data="userData"
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
      content: ''
    }
  },
  async asyncData({ req, store, redirect, error }) {
    try {
      const user = store.state.user
      const userId = store.state.user.userInfo.id
      if (user.token && userId) {
        const returnData = {}
        const res = await axios.get('/users', {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        })
        if (res.data) {
          returnData.userData = res.data
        }
        return returnData
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
    async handleSendMail() {
      try {
        const data = {
          // content: '空',
          // presentation: '墙报',
          // level: '普通',
          // paper: this.checkedPapers[0].id,
          // user: this.checkedProfs[0].id
        }
        const res = await axios.post('/email', data)
        if (res.data) {
          this.$notification.open({
            message: '发送成功',
            type: 'is-success',
            position: 'is-top'
          })
        }
        this.checkedUser = []
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>
.btn-send{
  margin-top: 14px;
}
</style>

<template>
  <div class="container has-text-centered">
    <div class="column is-4 is-offset-4">
      <h3 class="title has-text-grey">
        注 册
      </h3>
      <p class="subtitle has-text-grey">
        请根据提示进行注册
      </p>
      <div class="box">
        <b-field
          :type="{'is-danger': errors.has('form.email')}"
          :message="errors.first('form.email')"
        >
          <b-input v-model="form.email" v-validate="'required|email'" name="form.email" placeholder="请输入邮箱" type="email" />
        </b-field>
        <b-field
          :type="{'is-danger': errors.has('form.username')}"
          :message="errors.first('form.username')"
        >
          <b-input
            v-model="form.username"
            v-validate="'required'"
            name="form.username"
            placeholder="请输入用户名"
          />
        </b-field>
        <b-field
          :type="{'is-danger': errors.has('form.password')}"
          :message="errors.first('form.password')"
        >
          <b-input
            v-model="form.password"
            v-validate="'required'"
            name="form.password"
            type="password"
            placeholder="请输入密码"
            password-reveal
          />
        </b-field>
        <button class="button is-block is-info is-fullwidth" @click="validateFields">
          注册
        </button>
      </div>
      <p class="has-text-grey">
        <a href="/login">登录</a> &nbsp;·&nbsp;
        <a href="/forgot-password">忘记密码</a> &nbsp;·&nbsp;
        <a href="/">需要帮助？</a>
      </p>
    </div>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
const Cookie = process.client ? require('js-cookie') : undefined
const valiDict = {
  custom: {
    'form.username': {
      required: '请输入用户名'
    },
    'form.email': {
      required: '请输入邮箱',
      email: '邮箱格式不正确'
    },
    'form.password': {
      required: '请输入密码'
    }
  }
}

export default {
  layout: 'inhero',
  data() {
    return {
      form: {
        username: '',
        email: '',
        password: ''
      },
      isSubmiting: false
    }
  },
  created() {
    this.$validator.localize('zh_CN', valiDict)
  },
  methods: {
    validateFields() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.handleRegist()
        }
      })
    },
    // TODO: fetchUserInfo Vuex的action中
    async fetchUserInfo(token) {
      try {
        return await axios.get('/users/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      } catch (err) {
        console.log(err)
        return false
      }
    },
    // 注册完成->有token->保存Vuex State 设置 Cookie，登录的时候如果Cookie中有token，获取全局的用户信息
    async handleRegist() {
      try {
        const { username, email, password } = this.form
        this.isSubmiting = true
        const res = await axios.post('/auth/local/register', {
          username,
          email,
          password
        }, {
          headers: {}
        })
        console.log(res)
        if (res.status === 200) {
          // 获取用户信息
          const userInfo = await this.fetchUserInfo(res.data.jwt)
          // 成功
          this.$notification.open({
            message: '注册成功',
            type: 'is-success',
            position: 'is-top'
          })
          setTimeout(() => {
            this.$store.commit('user/setToken', res.data.jwt)
            this.$store.commit('user/setUserInfo', userInfo.data)
            Cookie.set('token', res.data.jwt)
            Cookie.set('userInfo', JSON.stringify(userInfo.data))
            this.isSubmiting = false
            this.$router.push('/')
          }, 0)
        } else {
          this.$notification.open({
            message: '注册失败',
            type: 'is-warning',
            position: 'is-top'
          })
        }
        this.isSubmiting = false
      } catch (err) {
        console.log(err)
        this.$notification.open({
          message: '注册失败',
          type: 'is-warning',
          position: 'is-top'
        })
        this.isSubmiting = false
      }
    }
  }
}
</script>

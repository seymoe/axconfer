<template>
  <div class="container">
    <div class="column is-4 is-offset-4">
      <h3 class="title has-text-grey has-text-centered">
        登 录
      </h3>
      <p class="subtitle has-text-grey has-text-centered">
        请登录并继续
      </p>
      <div class="box">
        <div class="notification is-warning">
          会议网站整体升级，原网站注册用户已迁移至当前新网站，初始密码为123456，可通过找回密码功能重设新密码！
        </div>
        <form>
          <b-field
            label="Email"
            :type="{'is-danger': errors.has('form.identifier')}"
            :message="errors.first('form.identifier')"
          >
            <b-input v-model="form.identifier" v-validate="'required|email'" name="form.identifier" type="email" />
          </b-field>
          <b-field
            label="密码"
            :type="{'is-danger': errors.has('form.password')}"
            :message="errors.first('form.password')"
          >
            <b-input
              v-model="form.password"
              v-validate="'required'"
              name="form.password"
              type="password"
              password-reveal
            />
          </b-field>
          <b-button :disabled="isSubmiting" type="is-primary is-fullwidth" @click="validateFields">
            登录
          </b-button>
        </form>
        <br>
        <p class="has-text-grey">
          <nuxt-link to="/register">
            注册
          </nuxt-link> &nbsp;·&nbsp;
          <nuxt-link to="/forgot-password">
            忘记密码
          </nuxt-link> &nbsp;·&nbsp;
          <nuxt-link to="/help">
            需要帮助？
          </nuxt-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
const Cookie = process.client ? require('js-cookie') : undefined
const valiDict = {
  custom: {
    'form.identifier': {
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
        identifier: '',
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
          this.handleLogin()
        }
      })
    },
    async handleLogin() {
      try {
        const { identifier, password } = this.form
        this.isSubmiting = true
        const res = await axios.post('/auth/local', {
          identifier,
          password
        }, {
          headers: {}
        })
        console.log(res)
        if (res.status === 200) {
          // 成功
          this.$notification.open({
            message: '登录成功',
            type: 'is-success',
            position: 'is-top-right'
          })
          setTimeout(() => {
            // console.log('prof01的token为 ', res.data.jwt)
            this.$store.commit('user/setToken', res.data.jwt)
            this.$store.commit('user/setUserInfo', res.data.user)
            Cookie.set('token', res.data.jwt)
            Cookie.set('userInfo', JSON.stringify(res.data.user))
            this.$router.push('/')
          }, 0)
        } else {
          this.$notification.open({
            message: '登录失败',
            type: 'is-warning',
            position: 'is-top-right'
          })
          this.isSubmiting = false
        }
      } catch (err) {
        console.log(err)
        this.$notification.open({
          message: '登录失败',
          type: 'is-warning',
          position: 'is-top-right'
        })
        this.isSubmiting = false
      }
    }
  }
}
</script>

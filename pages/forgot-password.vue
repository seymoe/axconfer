<template>
  <div class="container">
    <div class="column is-4 is-offset-4">
      <h3 class="title has-text-grey has-text-centered">
        忘记密码
      </h3>
      <p class="subtitle has-text-grey has-text-centered">
        请输入邮箱并继续
      </p>
      <div class="box">
        <form>
          <b-field label="Email">
            <b-input v-model="form.email" type="email"></b-input>
          </b-field>
          <button :disabled="isSubmiting" class="button is-block is-info is-fullwidth" @click="handleSendEmail">
            继续
          </button>
        </form>
        <br>
        <p class="has-text-grey">
          <nuxt-link to="/login">登录</nuxt-link> &nbsp;·&nbsp;
          <nuxt-link to="/register">注册</nuxt-link> &nbsp;·&nbsp;
          <nuxt-link to="/help">需要帮助？</nuxt-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
// const Cookie = process.client ? require('js-cookie') : undefined

export default {
  layout: 'inhero',
  data() {
    return {
      form: {
        email: ''
      },
      isSubmiting: false
    }
  },
  methods: {
    async handleSendEmail() {
      try {
        const { email } = this.form
        if (!email) {
          return false
        }
        this.isSubmiting = true
        const res = await axios.post('/auth/forgot-password', {
          email,
          url: 'http://localhost:3000/reset-password'
        }, {
          headers: {}
        })
        console.log(res)
        if (res.status === 200) {
          this.$notification.open({
            message: '邮件发送成功，请查收！',
            type: 'is-success',
            position: 'is-top'
          })
          setTimeout(() => {
            this.$router.push('/')
          }, 2000)
        } else {
          this.$notification.open({
            message: '邮件发送失败，请重试！',
            type: 'is-warning',
            position: 'is-top'
          })
          this.isSubmiting = false
        }
      } catch (err) {
        console.log(err)
        this.$notification.open({
          message: '邮件发送失败，请重试！',
          type: 'is-warning',
          position: 'is-top'
        })
        this.isSubmiting = false
      }
    }
  }
}
</script>

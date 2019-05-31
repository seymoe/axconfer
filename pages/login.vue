<template>
  <div class="container has-text-centered">
    <div class="column is-4 is-offset-4">
      <h3 class="title has-text-grey">
        登 录
      </h3>
      <p class="subtitle has-text-grey">
        请登录并继续
      </p>
      <div class="box">
        <figure class="avatar">
          <img src="https://placehold.it/128x128">
        </figure>
        <form>
          <div class="field">
            <div class="control">
              <input v-model="form.identifier" class="input" type="email" placeholder="Your Email" autofocus="">
            </div>
          </div>
          <div class="field">
            <div class="control">
              <input v-model="form.password" class="input" type="password" placeholder="Your Password">
            </div>
          </div>
          <button :disabled="isSubmiting" class="button is-block is-info is-fullwidth" @click="handleLogin">
            登录
          </button>
        </form>
      </div>
      <p class="has-text-grey">
        <a href="/register">注册</a> &nbsp;·&nbsp;
        <a href="/">忘记密码</a> &nbsp;·&nbsp;
        <a href="/">需要帮助？</a>
      </p>
    </div>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  layout: 'inhero',
  data() {
    return {
      form: {
        identifier: 'user01@163.com',
        password: 'user01'
      },
      isSubmiting: false
    }
  },
  methods: {
    async handleLogin() {
      try {
        const { identifier, password } = this.form
        if (!identifier) {
          return false
        }
        if (!password) {
          return false
        }
        this.isSubmiting = true
        const res = await axios.post('/auth/local', {
          identifier,
          password
        })
        console.log(res)
        if (res.status === 200) {
          // 成功
          this.$notification.open({
            message: '登录成功',
            type: 'is-success',
            position: 'is-top'
          })
          setTimeout(() => {
            this.$store.commit('user/setToken', res.data.jwt)
            this.$store.commit('user/setUserInfo', res.data.user)
            Cookie.set('token', res.data.jwt)
            Cookie.set('userInfo', JSON.stringify(res.data.user))
            this.isSubmiting = false
            this.$router.push('/')
          }, 0)
        }
      } catch (err) {
        console.log(err)
        this.$notification.open({
          message: '登录失败',
          type: 'is-warning',
          position: 'is-top'
        })
        this.isSubmiting = false
      }
    }
  }
}
</script>

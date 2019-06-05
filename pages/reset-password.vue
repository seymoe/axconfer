<template>
  <div class="container">
    <div class="column is-4 is-offset-4">
      <h3 class="title has-text-grey has-text-centered">
        重设密码
      </h3>
      <p class="subtitle has-text-grey has-text-centered">
        请输入新密码来重设密码
      </p>
      <div class="box">
        <form>
          <div class="field">
            <div class="control">
              <input v-model="form.password" class="input" type="password" placeholder="请输入新密码">
            </div>
          </div>
          <div class="field">
            <div class="control">
              <input v-model="form.passwordConfirmation" class="input" type="password" placeholder="重复新密码">
            </div>
          </div>
          <button :disabled="isSubmiting" class="button is-block is-info is-fullwidth" @click="handleLogin">
            提交
          </button>
        </form>
      </div>
      <p class="has-text-grey">
        <nuxt-link to="/login">登录</nuxt-link> &nbsp;·&nbsp;
        <nuxt-link to="/register">注册</nuxt-link> &nbsp;·&nbsp;
        <nuxt-link to="/help">需要帮助？</nuxt-link>
      </p>
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
        password: '',
        passwordConfirmation: ''
      },
      isSubmiting: false
    }
  },
  asyncData({ query, redirect, error }) {
    try {
      const _code = query.code
      if (_code) {
        return {
          code: _code
        }
      } else {
        return {
          code: ''
        }
      }
    } catch (err) {
      return {
        code: ''
      }
    }
  },
  methods: {
    async handleLogin() {
      try {
        const { password, passwordConfirmation } = this.form
        if (!this.code) {
          return false
        }
        if (!password) {
          return false
        }
        if (!passwordConfirmation) {
          return false
        }
        this.isSubmiting = true
        const res = await axios.post('/auth/reset-password', {
          code: this.code,
          password,
          passwordConfirmation
        }, {
          headers: {}
        })
        console.log(res)
        this.$notification.open({
          message: '密码重置成功，请重新登录！',
          type: 'is-success',
          position: 'is-top'
        })
        setTimeout(() => {
          this.$router.push('/login')
        }, 1000)
      } catch (err) {
        this.$notification.open({
          message: err.message || '密码重置失败，请重试',
          type: 'is-warning',
          position: 'is-top'
        })
        setTimeout(() => {
          this.$router.push('/forgot-password')
        }, 1000)
      }
    }
  }
}
</script>

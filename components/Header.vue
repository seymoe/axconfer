<template>
  <nav class="navbar">
    <div class="container">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <!-- <img src="http://bulma.io/images/bulma-type-white.png" alt="Logo"> -->
          工程热物理
        </a>
        <span class="navbar-burger burger" data-target="navbarMenu">
          <span />
          <span />
          <span />
        </span>
      </div>
      <div id="navbarMenu" class="navbar-menu">
        <div class="navbar-end">
          <nuxt-link to="/" class="navbar-item">
            首页
          </nuxt-link>
          <nuxt-link to="/organization" class="navbar-item">
            组织结构
          </nuxt-link>
          <nuxt-link to="/date" class="navbar-item">
            重要日期
          </nuxt-link>
          <nuxt-link to="/attend" class="navbar-item">
            参会注册
          </nuxt-link>
          <nuxt-link to="/traffic" class="navbar-item">
            交通住宿
          </nuxt-link>
          <nuxt-link to="/contact" class="navbar-item">
            联系我们
          </nuxt-link>
          <template v-if="token && userInfo.role">
            <!-- auth -->
            <b-dropdown v-if="userInfo.role.name === 'Authenticated'" hoverable aria-role="list">
              <button slot="trigger" class="button is-info">
                <span>{{ userInfo.username }}</span>
                <b-icon icon="menu-down" />
              </button>

              <b-dropdown-item aria-role="listitem">
                我的论文
              </b-dropdown-item>
              <b-dropdown-item aria-role="listitem" @click="handleLogout">
                退出登录
              </b-dropdown-item>
            </b-dropdown>
            <!-- professor -->
            <b-dropdown v-else-if="userInfo.role.name === 'Professor'" hoverable aria-role="list">
              <button slot="trigger" class="button is-info">
                <span>{{ userInfo.username }}</span>
                <b-icon icon="menu-down" />
              </button>

              <b-dropdown-item aria-role="listitem">
                审阅论文
              </b-dropdown-item>
              <b-dropdown-item aria-role="listitem" @click="handleLogout">
                退出登录
              </b-dropdown-item>
            </b-dropdown>
            <!-- admin -->
            <b-dropdown v-else-if="userInfo.role.name === 'Administrator'" hoverable aria-role="list">
              <button slot="trigger" class="button is-info">
                <span>{{ userInfo.username }}</span>
                <b-icon icon="menu-down" />
              </button>

              <b-dropdown-item aria-role="listitem">
                管理论文
              </b-dropdown-item>
              <b-dropdown-item aria-role="listitem" @click="handleLogout">
                退出登录
              </b-dropdown-item>
            </b-dropdown>
          </template>
          <template v-else>
            <span class="navbar-item">
              <nuxt-link to="/login" class="button is-grey is-outlined">
                <span class="icon">
                  <i class="fa fa-github" />
                </span>
                <span>登录</span>
              </nuxt-link>
            </span>
            <span class="navbar-item">
              <nuxt-link to="/register" class="button is-grey is-outlined">
                <span class="icon">
                  <i class="fa fa-github" />
                </span>
                <span>注册</span>
              </nuxt-link>
            </span>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      token: 'user/getToken',
      userInfo: 'user/getUserInfo'
    })
  },
  methods: {
    handleLogout() {
      Cookie.set('token', '')
      Cookie.set('userInfo', {})
      this.$store.commit('user/logout')
      this.$notification.open({
        message: '退出成功',
        type: 'is-success',
        position: 'is-top'
      })
      window.location.href = '/'
    }
  }
}
</script>

<style scoped>
.dropdown .button{
  margin-top: 12px;
}
</style>

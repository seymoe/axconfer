<template>
  <nav class="navbar top-header">
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
            <b-dropdown hoverable aria-role="list">
              <a slot="trigger" class="navbar-item" role="button">
                <b-icon icon="account" />
                <span>{{ userInfo.username }}</span>
                <b-icon icon="menu-down" />
              </a>
              <b-dropdown-item v-if="userInfo.role.name === 'Authenticated'" aria-role="listitem">
                <b-icon icon="file" size="is-small" />
                <nuxt-link to="/paper/me">
                  我的论文
                </nuxt-link>
              </b-dropdown-item>
              <b-dropdown-item v-else-if="userInfo.role.name === 'Professor'" aria-role="listitem">
                <b-icon icon="file-find" size="is-small" />
                <nuxt-link to="/review/me">
                  审阅论文
                </nuxt-link>
              </b-dropdown-item>
              <b-dropdown-item v-else-if="userInfo.role.name === 'Administrator'" aria-role="listitem">
                <b-icon icon="animation" size="is-small" />
                <nuxt-link to="/admin/assign">
                  管理论文
                </nuxt-link>
              </b-dropdown-item>
              <b-dropdown-item aria-role="listitem" @click="handleLogout">
                <b-icon icon="logout" size="is-small" />
                退出登录
              </b-dropdown-item>
            </b-dropdown>
          </template>
          <template v-else>
            <span class="navbar-item">
              <nuxt-link to="/login" class="button is-grey is-outlined">
                <b-icon
                  icon="account"
                  size="is-small"
                />
                <span>登录</span>
              </nuxt-link>
            </span>
            <span class="navbar-item">
              <nuxt-link to="/register" class="button is-grey is-outlined">
                <b-icon
                  icon="account"
                  size="is-small"
                />
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
      this.$router.replace('/')
    }
  }
}
</script>

<style scoped>
.top-header{
  background-color: rgba(255,255,255,0.05);
  color: #fff;
  font-weight: bold;
}
.hero.is-light a.navbar-item:hover{
  background: transparent;
}
.navbar-end a.navbar-item{
  transition: all .3s;
}
.navbar-end a.navbar-item:hover{
  background-color: transparent;
  color: #f4645f !important;
}
.navbar-end a.navbar-item.is-active{
  background-color: transparent;
  color: #f4645f !important;
}
.dropdown .button{
  margin-top: 12px;
}
</style>

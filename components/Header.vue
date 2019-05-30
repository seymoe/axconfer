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
          <template v-if="token">
            <nuxt-link to="/paper" class="navbar-item">
              {{ userInfo.username }}
            </nuxt-link>
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
export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      token: 'user/getToken',
      userInfo: 'user/getUserInfo'
    })
  }
}
</script>

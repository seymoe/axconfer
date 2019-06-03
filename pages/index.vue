<template>
  <div>
    <div class="box cta">
      <p class="has-text-centered">
        <span class="tag is-primary">New</span> {{ confer.title }} -- {{ confer.address }}
      </p>
    </div>
    <section class="container">
      <div class="columns">
        <div class="column is-3">
          <Sidebar />
        </div>
        <div class="column is-8">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">
                重要通知
              </p>
            </header>
            <div class="card-content">
              <div class="content">
                <ul class="notice-list">
                  <li v-for="item in postList" :key="item.id">
                    <b-tag class="is-info">
                      {{ item.createdAt }}
                    </b-tag>
                    <nuxt-link :to="'/posts/' + item.id">
                      {{ item.title }}
                    </nuxt-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">
                组委会欢迎致辞
              </p>
            </header>
            <div class="card-content">
              <div class="content" v-html="welcomeHtml" />
            </div>
          </div>
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">
                中国工程热物理学会工程热物理分会
              </p>
            </header>
            <div class="card-content">
              <div class="content">
                <p><b>举办地址：</b>{{ confer.address }}</p>
                <p><b>联系电话：</b>{{ confer.phone }}</p>
                <p><b>官方邮箱：</b>{{ confer.email }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Sidebar from '~/components/Sidebar.vue'
import { mdToHtml } from '~/plugins/utils'
import axios from '~/plugins/axios'
import dayjs from 'dayjs'

export default {
  components: {
    Sidebar
  },
  data() {
    return {
      postList: []
    }
  },
  computed: {
    confer() {
      if (this.$store.state.conference.length) {
        return this.$store.state.conference[0]
      }
      return {}
    },
    welcomeHtml() {
      if (this.confer && this.confer.welcome) {
        return mdToHtml(this.confer.welcome)
      } else {
        return '暂无内容'
      }
    }
  },
  async asyncData({ req, store, redirect, error }) {
    try {
      const res = await axios.get('/posts?_limit=10')
      if (res.data) {
        const _l = res.data
        _l.forEach((item) => {
          item.createdAt = dayjs(item.createdAt).format('YYYY-MM-DD')
        })
        return { postList: res.data }
      }
    } catch (err) {
      error({ statusCode: err.statusCode, message: err.message })
    }
  }
}
</script>

<style scoped lang="scss">
.notice-list{
  margin-top: 0;
  margin-left: 0;
  list-style: none;
  li{
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .tag{
    margin-right: 10px;
  }
}
</style>

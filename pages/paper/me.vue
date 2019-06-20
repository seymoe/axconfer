<template>
  <div>
    <br>
    <section class="container">
      <div class="columns">
        <div class="column is-3">
          <Sidebar />
        </div>
        <div class="column is-9">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">
                我的论文
              </p>
            </header>
            <div class="card-content">
              <!-- <b-table :data="paperData" :columns="paperColumns"></b-table> -->
              <b-table
                :data="paperData"
                :hoverable="true"
              >
                <template slot-scope="props">
                  <b-table-column field="pid" label="论文编号">
                    {{ props.row.pid }}
                  </b-table-column>

                  <b-table-column field="title" label="标题">
                    {{ props.row.title }}
                  </b-table-column>

                  <b-table-column field="topic" label="主题">
                    {{ props.row.topic }}
                  </b-table-column>

                  <b-table-column field="action" label="操作" centered>
                    <nuxt-link class="button is-small" :to="'/paper/' + props.row.id">
                      查看
                    </nuxt-link>
                    <nuxt-link class="button is-small" :to="'/paper/' + props.row.id + '/edit'">
                      编辑
                    </nuxt-link>
                  </b-table-column>
                </template>

                <template slot="empty">
                  <section class="section">
                    <div class="content has-text-grey has-text-centered">
                      <p>
                        <b-icon
                          icon="emoticon-sad"
                          size="is-large"
                        />
                      </p>
                      <p>没有论文</p>
                    </div>
                  </section>
                </template>
              </b-table>
              <div class="foot">
                <nuxt-link v-if="conference.status === '开始'" class="button is-primary" :to="'/paper/create'">
                  创建论文
                </nuxt-link>
                <b-button v-else class="is-light" disabled>
                  评阅中
                  {{ conference.status }}
                </b-button>
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
import axios from '~/plugins/axios'
import { mapGetters } from 'vuex'

export default {
  middleware: 'auth',
  layout: 'nohero',
  components: {
    Sidebar
  },

  data() {
    return {
      isEmpty: false,
      paperData: []
    }
  },

  computed: {
    ...mapGetters({
      headerAuth: 'getAuthHeader'
    }),
    conference() {
      const l = this.$store.state.conference
      if (l && l.length) {
        return l[0]
      } else {
        return {}
      }
    }
  },

  async asyncData({ req, store, redirect, error }) {
    try {
      const token = store.state.user.token
      const userId = store.state.user.userInfo.id
      if (token && userId) {
        console.log(store.getters)
        const res = await axios.get(`/papers?user=${userId}`, store.getters.getAuthHeader)
        if (res.data) {
          return { paperData: res.data }
        }
      } else {
        // 返回登录页
        redirect('/login')
      }
    } catch (err) {
      error({ statusCode: err.statusCode, message: err.message })
    }
  }
}
</script>

<style scoped>
.foot{
  margin-top: 14px;
}
</style>

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
                我的论文评阅
              </p>
            </header>
            <div class="card-content">
              <b-table
                :data="paperData"
                :hoverable="true"
              >
                <template slot-scope="props">
                  <b-table-column field="pid" label="论文编号">
                    {{ props.row.paper.pid }}
                  </b-table-column>

                  <b-table-column field="title" label="论文标题">
                    {{ props.row.paper.title }}
                  </b-table-column>

                  <b-table-column field="topic" label="评阅状态">
                    {{ props.row.paper.status }}
                  </b-table-column>

                  <b-table-column field="action" label="操作" centered>
                    <nuxt-link class="button is-small" :to="'/review/' + props.row.id + '/create'">
                      评阅
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
      paperColumns: [
        { field: 'paper.pid', label: '论文编号', width: '100' },
        { field: 'paper.title', label: '论文标题', width: '300' },
        { field: 'paper.status', label: '评阅状态', width: '120' },
        { field: '', label: '操作', width: '120' }
      ],
      paperData: []
    }
  },
  computed: {
    ...mapGetters({
      headerAuth: 'getAuthHeader'
    })
  },
  async asyncData({ req, store }) {
    try {
      const token = store.state.user.token
      const userId = store.state.user.userInfo.id
      if (token && userId) {
        const res = await axios.get('/reviews?user=' + userId, store.getters.getAuthHeader)
        if (res.status === 200) {
          return { paperData: res.data }
        } else {
          // 返回首页登录
        }
      } else {
        // 返回首页登录
      }
    } catch (err) {
      console.log(err)
    }
  }
}
</script>

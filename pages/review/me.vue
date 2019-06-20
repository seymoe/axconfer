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
                :data="reviewData"
                :hoverable="true"
              >
                <template slot-scope="props">
                  <b-table-column field="review.id" label="ID">
                    {{ props.row.id }}
                  </b-table-column>

                  <b-table-column field="paper.pid" label="论文编号">
                    {{ props.row.paper.pid }}
                  </b-table-column>

                  <b-table-column field="title" label="论文标题">
                    {{ props.row.paper.title }}
                  </b-table-column>

                  <b-table-column field="topic" label="论文状态">
                    {{ props.row.paper.status }}
                  </b-table-column>

                  <b-table-column field="topic" label="评阅类型">
                    {{ props.row.type }}
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
        { field: 'review.id', label: '评阅ID', width: '100' },
        { field: 'paper.pid', label: '论文编号', width: '100' },
        { field: 'paper.title', label: '论文标题', width: '300' },
        { field: 'paper.status', label: '论文状态', width: '120' },
        { field: 'review.type', label: '评阅类型', width: '100' },
        { field: '', label: '操作', width: '100' }
      ],
      paperData: []
    }
  },
  computed: {
    ...mapGetters({
      headerAuth: 'getAuthHeader'
    })
  },
  async asyncData({ req, store, redirect, error }) {
    try {
      const token = store.state.user.token
      const userId = store.state.user.userInfo.id
      if (!token || !userId) {
        redirect('/login')
        return
      }
      const res = await axios.get(`/reviews?userId=${userId}`, store.getters.getAuthHeader)
      if (res.status !== 200) {
        // redirect('/login')
        return
      }
      const reviewData = res.data
      for (let i = 0; i < reviewData.length; i++) {
        const paperId = reviewData[i].paperId
        try {
          const { data: paper } = await axios.get(`/papers/${paperId}`, store.getters.getAuthHeader)
          reviewData[i].paper = {}
          reviewData[i].paper.title = paper.title
          reviewData[i].paper.pid = paper.pid
          reviewData[i].paper.status = paper.status
        } catch (err) {
          reviewData[i].paper = {}
          reviewData[i].paper.title = '论文未找到（已被用户删除，请联系管理员删除评阅）'
          reviewData[i].paper.pid = ''
          reviewData[i].paper.status = ''
        }
      }
      return { reviewData: reviewData }
    } catch (err) {
      console.log(err)
    }
  }
}
</script>

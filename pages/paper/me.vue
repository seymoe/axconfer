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
                  <b-table-column field="pid" label="论文ID" width="40">
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

export default {
  components: {
    Sidebar
  },

  data() {
    return {
      isEmpty: false,
      paperColumns: [
        { field: 'pid', label: '论文编号', width: '100' },
        { field: 'title', label: '论文标题', width: '300' },
        { field: 'topic', label: '领域', width: '120' },
        { field: 'keywords', label: '关键词', width: '120' },
        { field: 'author', label: '作者', width: '120' }
      ],
      paperData: []
    }
  },

  async asyncData({ req, store }) {
    try {
      const token = store.state.user.token
      const userId = store.state.user.userInfo.id
      if (token && userId) {
        const res = await axios.get('/papers?user=' + userId, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
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

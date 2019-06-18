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
                所有通知
              </p>
            </header>
            <div class="card-content">
              <b-table
                :data="list"
                :hoverable="true"
              >
                <template slot-scope="props">
                  <b-table-column label="发布日期" field="createdAt" width="120">
                    {{ props.row.createdAt }}
                  </b-table-column>

                  <b-table-column label="分类" field="category" width="80">
                    {{ props.row.category }}
                  </b-table-column>

                  <b-table-column label="通知标题">
                    <nuxt-link :to="'/posts/' + props.row.id">
                      {{ props.row.title }}
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
                      <p>没有通知</p>
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
import dayjs from 'dayjs'

export default {
  components: {
    Sidebar
  },
  data() {
    return {
      list: []
    }
  },
  async asyncData(context) {
    try {
      const res = await axios.get('/posts?_sort=created_at:DESC')
      console.log(res.data)
      const _l = res.data
      _l.forEach((item) => {
        item.createdAt = dayjs(item.createdAt).format('YYYY-MM-DD')
      })
      return { list: _l || [] }
    } catch (err) {
      console.log(err)
    }
  }
}
</script>

<template>
  <div>
    <section class="container">
      <div class="columns">
        <div class="column is-12">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">
                所有通知
              </p>
              <nuxt-link class="btn-new button is-primary" :to="'/admin/posts/new'">
                新增文章
              </nuxt-link>
            </header>
            <div class="card-content">
              <b-table
                :data="list"
                :hoverable="true"
              >
                <template slot-scope="props">
                  <b-table-column label="发布日期" field="createdAt" width="160">
                    {{ props.row.createdAt }}
                  </b-table-column>
                  <b-table-column label="标题">
                    {{ props.row.title }}
                  </b-table-column>
                  <b-table-column label="分类">
                    {{ props.row.category }}
                  </b-table-column>
                  <b-table-column field="action" label="操作" centered>
                    <nuxt-link class="button is-small" :to="'/admin/posts/' + props.row.id + '/edit'">
                      编辑
                    </nuxt-link>
                    <span class="button is-small">
                      删除
                    </span>
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
import axios from '~/plugins/axios'
import dayjs from 'dayjs'

export default {
  middleware: 'auth',
  layout: 'nohero',
  data() {
    return {
      list: []
    }
  },
  async asyncData(context) {
    try {
      const res = await axios.get('/posts?_sort=id:desc')
      console.log(res.data)
      const _l = res.data
      _l.forEach((item) => {
        item.createdAt = dayjs(item.created_at).format('YYYY-MM-DD')
      })
      return { list: _l || [] }
    } catch (err) {
      console.log(err)
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-new{
  margin-top: 5px;
  margin-right: 15px;
}
</style>

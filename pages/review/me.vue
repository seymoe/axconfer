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
              <b-table :data="paperData" :columns="paperColumns" />
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
      paperColumns: [
        { field: 'paper.pid', label: '论文编号', width: '100' },
        { field: 'paper.title', label: '论文标题', width: '300' },
        { field: 'status', label: '评阅状态', width: '120' },
        { field: '', label: '操作', width: '120' }
      ],
      paperData: []
    }
  },
  computed: {

  },
  async asyncData({ req, store }) {
    try {
      const token = store.state.user.token
      const userId = store.state.user.userInfo.id
      if (token && userId) {
        const res = await axios.get('/reviews?user=' + userId, {
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

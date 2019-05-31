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
              标题：{{ paper.title }}
              作者：{{ paper.author }}
              单位：{{ paper.department }}
              关键词：{{ paper.keywords }}
              邮编：{{ paper.postcode }}
              电话：{{ paper.phone }}
              邮箱：{{ paper.email }}
              主题：{{ paper.topic }}

            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Sidebar from '~/components/Sidebar.vue'
// import axios from '~/plugins/axios'
export default {
  components: {
    Sidebar
  },
  data() {
    return {
      paper: {
        pid: '',
        title: '论文1',
        author: '用户2,用户2',
        department: '123',
        keywords: '',
        postcode: '',
        email: '',
        phone: '',
        topic: '',
        status: ''
      }
    }
  },
  computed: {

  },
  async asyncData(context) {

  }
}
</script>

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
              <b-table :data="paperData" :columns="paperColumns">
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
// import axios from '~/plugins/axios'
export default {
  components: {
    Sidebar
  },
  data() {
    return {
      paperColumns: [
        { field: 'pid', label: '论文编号', width: '100' },
        { field: 'title', label: '论文标题', width: '300' },
        { field: 'topic', label: '领域', width: '120' },
        { field: 'author', label: '作者', width: '120' },
        { field: 'status', label: '状态', width: '120' }
      ],
      paperData: [
        { 'pid': '191001', 'title': '基于人工智能神经网络的分析研究数据挖掘', 'topic': '基础热力学', 'status': '未评阅', 'keywords': 'word1, word2', 'author': '作者' },
        { 'pid': '191002', 'title': 'John', 'topic': '可再生能源', 'status': '未评阅', 'keywords': 'word1, word2', 'author': '作者' },
        { 'pid': '191003', 'title': 'John', 'topic': '可再生能源', 'status': '未评阅', 'keywords': 'word1, word2', 'author': '作者' },
        { 'pid': '191001', 'title': 'Jesse', 'topic': '基础热力学', 'status': '评阅中', 'keywords': 'word1, word2', 'author': '作者' },
        { 'pid': '191002', 'title': 'John', 'topic': '可再生能源', 'status': '评阅中', 'keywords': 'word1, word2', 'author': '作者' },
        { 'pid': '191003', 'title': 'John', 'topic': '可再生能源', 'status': '已评阅', 'keywords': 'word1, word2', 'author': '作者' }
      ]
    }
  },
  computed: {

  },
  async asyncData(context) {

  }
}
</script>

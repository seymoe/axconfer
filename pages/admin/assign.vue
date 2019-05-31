<template>
  <div class="container">
    <div class="columns">
      <div class="column is-9">
        默认显示 status 为 未评阅的论文
        <b-table
          :data="paperFilterData"
          :columns="paperColumns"
          :checked-rows.sync="checkedPapers"
          checkable
        >
          <template slot="bottom-left">
            <b>Total checked</b>: {{ checkedPapers.length }}
          </template>
        </b-table>
      </div>

      <div class="column is-3">
        默认只选择1个教授
        <b-table
          :data="profData"
          :columns="profColumns"
          :checked-rows.sync="checkedProfs"
          checkable
        >
          <template slot="bottom-left">
            <b>Total checked</b>: {{ checkedProfs.length }}
          </template>
        </b-table>
        <button class="button">
          分配论文至教授
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'nohero',
  data() {
    return {
      paperColumns: [
        { field: 'pid', label: '论文编号', width: '100' },
        { field: 'title', label: '论文标题', width: '300' },
        { field: 'topic', label: '领域', width: '120' },
        { field: 'keywords', label: '关键词', width: '120' },
        { field: 'author', label: '作者', width: '120' }
      ],
      paperData: [
        { 'pid': '191001', 'title': '基于人工智能神经网络的分析研究数据挖掘', 'topic': '基础热力学', 'status': '未评阅', 'keywords': 'word1, word2', 'author': '作者' },
        { 'pid': '191002', 'title': 'John', 'topic': '可再生能源', 'status': '未评阅', 'keywords': 'word1, word2', 'author': '作者' },
        { 'pid': '191003', 'title': 'John', 'topic': '可再生能源', 'status': '未评阅', 'keywords': 'word1, word2', 'author': '作者' },
        { 'pid': '191001', 'title': 'Jesse', 'topic': '基础热力学', 'status': '评阅中', 'keywords': 'word1, word2', 'author': '作者' },
        { 'pid': '191002', 'title': 'John', 'topic': '可再生能源', 'status': '评阅中', 'keywords': 'word1, word2', 'author': '作者' },
        { 'pid': '191003', 'title': 'John', 'topic': '可再生能源', 'status': '已评阅', 'keywords': 'word1, word2', 'author': '作者' }
      ],
      checkedPapers: [],
      profColumns: [
        { field: 'username', label: '教授名称' },
        { field: 'topic', label: '教授领域' }
      ],
      profData: [
        { 'username': '教授1', 'topic': '基础热力学' },
        { 'username': '教授2', 'topic': '基础热力学' }
      ],
      checkedProfs: []
    }
  },
  computed: {
    paperFilterData() {
      return this.paperData.filter(paper => paper.status === '未评阅')
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="columns">
      <div class="column is-9">
        <b-field class="flex-row">
          <div style="display: flex;justify-content: start">
            <b-radio-button
              v-for="(item,index) in statusArr"
              :key="index"
              v-model="currentStatus"
              :native-value="item"
              type="is-info"
            >
              <span>{{ item }}</span>
            </b-radio-button>
          </div>
          <b-select v-model="year" placeholder="请选择">
            <option
              v-for="(y, idx) in years"
              :key="idx"
              :value="y"
            >
              {{ y }}
            </option>
          </b-select>
          <b-field>
            <b-button type="is-info" @click="handleExportCsv">
              导出论文列表
            </b-button>
          </b-field>
        </b-field>
        <b-table
          :narrowed="true"
          :data="paperFilterData"
          :checked-rows.sync="checkedPapers"
          checkable
        >
          <template slot-scope="props">
            <b-table-column field="pid" label="论文编号" width="90">
              {{ props.row.pid }}
            </b-table-column>
            <b-table-column field="title" label="论文标题" width="300">
              {{ props.row.title }}
            </b-table-column>
            <b-table-column field="topic" label="领域" width="120">
              {{ props.row.topic }}
            </b-table-column>
            <b-table-column field="keywords" label="关键词" width="150">
              {{ props.row.keywords }}
            </b-table-column>
            <b-table-column field="author" label="作者" width="150">
              {{ props.row.author }}
            </b-table-column>
            <b-table-column field="status" label="状态" width="90">
              {{ props.row.status }}
            </b-table-column>
            <b-table-column field="action" label="操作" width="60">
              <button @click="handleDownloadPaper(props.row)">
                下载
              </button>
            </b-table-column>
          </template>

          <!-- <template slot="bottom-left">
            <b>Total checked</b>: {{ checkedPapers.length }}
          </template> -->
        </b-table>
      </div>

      <div class="column is-3">
        <!-- 筛选话题 -->
        <b-select v-model="topic" placeholder="请选择">
          <option :value="null">
            全部
          </option>
          <option
            v-for="(option, idx) in topics"
            :key="idx"
            :value="option"
          >
            {{ option }}
          </option>
        </b-select>
        <b-table
          :narrowed="true"
          :data="profFiltrList"
          :columns="profColumns"
          :checked-rows.sync="checkedProfs"
          checkable
        >
          <template slot="bottom-left">
            <b>Total checked</b>: {{ checkedProfs.length }}
          </template>
        </b-table>
        <div class="block">
          <b-radio
            v-model="type"
            native-value="初审"
          >
            初审
          </b-radio>
          <b-radio
            v-model="type"
            native-value="终审"
          >
            终审
          </b-radio>
        </div>
        <br>
        <button class="button is-primary" @click="handleAssign">
          分配论文至教授
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import XLSX from 'xlsx'
import { mapGetters } from 'vuex'
import { TOPIC_ENUM, STATUS_ENUM, YEAR_ENUM } from '~/config'
import FileSaver from 'file-saver'

export default {
  middleware: 'auth',
  layout: 'nohero',
  data() {
    return {
      // 筛选论文的条件
      statusArr: STATUS_ENUM,
      years: YEAR_ENUM,
      currentStatus: '全部',
      paperColumns: [
        { field: 'pid', label: '论文编号', width: '100' },
        { field: 'title', label: '论文标题', width: '300' },
        { field: 'topic', label: '领域', width: '120' },
        { field: 'keywords', label: '关键词', width: '120' },
        { field: 'author', label: '作者', width: '120' },
        { field: 'status', label: '状态', width: '120' }
      ],
      paperData: [],
      paperFilterData: [],
      checkedPapers: [],
      profColumns: [
        { field: 'username', label: '教授姓名' },
        { field: 'department', label: '学校' }
      ],
      profData: [],
      checkedProfs: [],
      type: '初审',
      topics: TOPIC_ENUM,
      topic: null
    }
  },
  computed: {
    ...mapGetters({
      headerAuth: 'getAuthHeader'
    }),
    profFiltrList() {
      if (this.topic) {
        return this.profData.filter(prof => prof.topic === this.topic)
      } else {
        return this.profData
      }
    }
  },
  watch: {
    currentStatus(newVal, oldVal) {
      console.log(newVal, oldVal)
      this.checkedPapers = []
      this.checkedProfs = []
      if (newVal === this.statusArr[0]) {
        this.paperFilterData = this.paperData
      } else {
        this.paperFilterData = this.paperData.filter(paper => paper.status === newVal
        )
      }
    },
    year(newVal) {
      if (newVal) {
        this.fetchPaperList()
      }
    }
  },
  async asyncData({ req, store, redirect, error }) {
    try {
      const user = store.state.user
      const userId = store.state.user.userInfo.id
      if (user.token && userId) {
        const returnData = {}
        const cyear = new Date().getFullYear()
        const res = await axios.get(`/papers?year=${cyear}`, store.getters.getAuthHeader)
        if (res.data) {
          returnData.paperData = res.data
          returnData.paperFilterData = res.data
          returnData.year = cyear
        }

        // 拉取教授列表
        const profRes = await axios.get('/users?role.name=Professor', store.getters.getAuthHeader)
        if (profRes.data) {
          returnData.profData = profRes.data
        }
        return returnData
      } else {
        redirect('/login')
      }
    } catch (err) {
      error({ statusCode: err.statusCode, message: err.message })
    }
  },
  methods: {
    async handleAssign() {
      try {
        if (this.checkedPapers.length <= 0) {
          this.$notification.open({
            message: '请先选择论文',
            type: 'is-info',
            position: 'is-top-right'
          })
          return false
        }
        if (this.checkedProfs.length <= 0) {
          this.$notification.open({
            message: '请先选择教授',
            type: 'is-info',
            position: 'is-top-right'
          })
          return false
        }
        // 循环发送请求
        for (let i = 0; i < this.checkedPapers.length; i++) {
          const paperId = this.checkedPapers[i].id
          for (let j = 0; j < this.checkedProfs.length; j++) {
            const profId = this.checkedProfs[j].id
            const data = { paperId: paperId, userId: profId, type: this.type }
            await axios.post('/reviews', data, this.headerAuth)
          }
          // 分配评阅后论文状态是评阅中
          let status = ''
          if (this.type === '初审') {
            status = '初审评阅中'
          } else {
            status = '终审评阅中'
          }
          await axios.put(`/papers/${paperId}`, { status: status }, this.headerAuth)
        }

        this.$notification.open({
          message: '分配成功',
          type: 'is-success',
          position: 'is-top-right'
        })
        this.checkedPapers = []
        this.checkedProfs = []
        this.fetchPaperList()
      } catch (err) {
        console.log(err)
      }
    },
    // 客户端拉取paper列表
    async fetchPaperList() {
      try {
        const res = await axios.get(`/papers?year=${this.year}`, this.headerAuth)
        if (res.data) {
          this.paperData = res.data
          this.currentStatus = '全部'
        } else {
          this.paperData = []
          this.currentStatus = '全部'
        }
      } catch (err) {
        console.log(err)
      }
    },
    // 客户端拉取prof列表
    async fetchProfList() {
      try {
        const profRes = await axios.get('/users', this.headerAuth)
        this.profData = profRes.data
      } catch (err) {
        console.log(err)
      }
    },
    // 导出论文csv
    handleExportCsv() {
      const wb = XLSX.utils.book_new()
      const ws = XLSX.utils.json_to_sheet(this.paperData, { header: ['pid', 'title', 'topic', 'author', 'keywords', 'department', 'postcode', 'phone', 'email'] })
      XLSX.utils.book_append_sheet(wb, ws, 'paper')
      // console.log(wb)
      XLSX.writeFile(wb, 'papers.xlsx')
    },
    // 下载论文
    handleDownloadPaper(paper) {
      if (!paper.file) {
        alert('未上传论文')
        return
      }
      const url = paper.file.url
      const author = paper.author.split(',', 1)
      const filename = `${paper.pid}${author}` + paper.file.ext
      // const mime = paper.file.mime
      console.log(filename)
      FileSaver.saveAs(url, filename)
    }
  }
}
</script>

<style lang="scss" scoped>
.flex-row{
  display: flex;
  justify-content: space-between;
}
</style>

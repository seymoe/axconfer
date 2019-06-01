<template>
  <div class="container">
    <div class="columns">
      <div class="column is-9">
        <b-field>
          <b-radio-button
            v-for="item in statusArr"
            :key="item.value"
            v-model="currentStatus"
            :native-value="item.value"
            type="is-danger"
          >
            <span>{{ item.label }}</span>
          </b-radio-button>
        </b-field>
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
          :data="profFiltrData"
          :columns="profColumns"
          :checked-rows.sync="checkedProfs"
          checkable
        >
          <template slot="bottom-left">
            <b>Total checked</b>: {{ checkedProfs.length }}
          </template>
        </b-table>
        <button class="button" @click="handleAssign">
          分配论文至教授
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  middleware: 'auth',
  layout: 'nohero',
  data() {
    return {
      // 筛选论文的条件
      statusArr: [
        {
          label: '全部',
          value: '全部'
        },
        {
          label: '未评阅',
          value: '未评阅'
        },
        {
          label: '评阅中',
          value: '评阅中'
        },
        {
          label: '已评阅',
          value: '已评阅'
        }
      ],
      currentStatus: '全部',
      paperColumns: [
        { field: 'pid', label: '论文编号', width: '100' },
        { field: 'title', label: '论文标题', width: '300' },
        { field: 'topic', label: '领域', width: '120' },
        { field: 'keywords', label: '关键词', width: '120' },
        { field: 'author', label: '作者', width: '120' }
      ],
      paperData: [],
      paperFilterData: [],
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
    // paperFilterData() {
    //   return this.paperData.filter(paper => paper.status === '未评阅')
    // },
    profFiltrData() {
      return this.profData.filter(prof => prof.role.name === 'Professor')
    }
  },
  watch: {
    currentStatus(newVal, oldVal) {
      console.log(newVal, oldVal)
      if (newVal === this.statusArr[0].value) {
        this.paperFilterData = this.paperData
      } else {
        this.paperFilterData = this.paperData.filter(paper => paper.status === newVal
        )
      }
    }
  },
  async asyncData({ req, store, redirect, error }) {
    try {
      const user = store.state.user
      const userId = store.state.user.userInfo.id
      if (user.token && userId && user.userInfo.role.name === 'Administrator') {
        const returnData = {}
        const res = await axios.get('/papers', {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        })
        if (res.data) {
          returnData.paperData = res.data
          returnData.paperFilterData = res.data
        }

        // 拉取教授列表
        const profRes = await axios.get('/users', {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        })
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
        const data = {
          content: '空',
          presentation: '墙报',
          level: '普通',
          paper: this.checkedPapers[0].id,
          user: this.checkedProfs[0].id
        }
        const res = await axios.post('/reviews', data)
        if (res.data) {
          this.$notification.open({
            message: '分配成功',
            type: 'is-success',
            position: 'is-top'
          })
        }
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
        const res = await axios.get('/papers')
        if (res.data) {
          this.paperData = res.data
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

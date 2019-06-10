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
          <!-- <template slot="bottom-left">
            <b>Total checked</b>: {{ checkedPapers.length }}
          </template> -->
        </b-table>
      </div>

      <div class="column is-3">
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
        <button class="button is-primary" @click="handleAssign">
          分配论文至教授
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import { mapGetters } from 'vuex'

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
        { field: 'status', label: '状态', width: '120' },
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
      profData: [],
      checkedProfs: []
    }
  },
  computed: {
    ...mapGetters({
      headerAuth: 'getAuthHeader'
    }),
    profFiltrData() {
      return this.profData.filter(prof => prof.role.name === 'Professor')
    }
  },
  watch: {
    currentStatus(newVal, oldVal) {
      console.log(newVal, oldVal)
      this.checkedPapers = []
      this.checkedProfs = []
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
      if (user.token && userId) {
        const returnData = {}
        const res = await axios.get('/papers', store.getters.getAuthHeader)
        if (res.data) {
          returnData.paperData = res.data
          returnData.paperFilterData = res.data
        }

        // 拉取教授列表
        const profRes = await axios.get('/users', store.getters.getAuthHeader)
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
            const data = { paper: paperId, user: profId }
            await axios.post('/reviews', data, this.headerAuth)
          }
          // 分配评阅后论文状态是评阅中
          await axios.put('/papers/' + paperId, { status: '评阅中' }, this.headerAuth)
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
        const res = await axios.get('/papers', this.headerAuth)
        if (res.data) {
          this.paperData = res.data
          this.currentStatus = '全部'
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

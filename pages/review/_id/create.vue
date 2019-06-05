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
                评阅论文
              </p>
            </header>
            <div class="card-content">
              <b-field horizontal label="论文标题：">
                <p>{{ review.paper.title }}</p>
              </b-field>
              <b-field horizontal label="作者：">
                <p>{{ review.paper.author }}</p>
              </b-field>
              <b-field horizontal label="单位：">
                <p>论文单位</p>
              </b-field>
              <b-field horizontal label="关键词：">
                <p>
                  <b-tag v-for="item in keywords" :key="item" style="margin-right: 12px">
                    {{ item }}
                  </b-tag>
                </p>
              </b-field>
              <b-field horizontal label="主题：">
                <p>{{ review.paper.topic }}</p>
              </b-field>
              <b-field
                horizontal
                label="展示方式："
                :type="{'is-danger': errors.has('form.presentation')}"
                :message="errors.first('form.presentation')"
              >
                <b-select v-model="form.presentation" v-validate="'required'" name="form.presentation" placeholder="请选择">
                  <option value="口头">
                    口头
                  </option>
                  <option value="墙报">
                    墙报
                  </option>
                  <option value="未选择">
                    未选择
                  </option>
                </b-select>
              </b-field>
              <b-field
                horizontal
                label="推荐优秀："
                :type="{'is-danger': errors.has('form.level')}"
                :message="errors.first('form.level')"
              >
                <b-select v-model="form.level" v-validate="'required'" name="form.level" placeholder="请选择">
                  <option value="普通">
                    普通
                  </option>
                  <option value="优秀">
                    优秀
                  </option>
                  <option value="未选择">
                    未选择
                  </option>
                </b-select>
              </b-field>
              <b-field
                horizontal
                label="评阅意见："
                :type="{'is-danger': errors.has('form.content')}"
                :message="errors.first('form.content')"
              >
                <b-input v-model="form.content" v-validate="'required'" name="form.content" type="textarea" />
              </b-field>
              <b-field horizontal>
                <p class="control">
                  <button class="button is-primary" @click="validateFields">
                    保存
                  </button>
                </p>
              </b-field>
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
import { mapGetters } from 'vuex'

const valiDict = {
  custom: {
    'form.presentation': {
      required: '请选择展示方式'
    },
    'form.level': {
      required: '请选择评级'
    },
    'form.content': {
      required: '请输入评阅内容'
    }
  }
}
export default {
  layout: 'nohero',
  components: {
    Sidebar
  },
  data() {
    return {
      form: {
        content: '',
        presentation: '',
        level: '',
        paper: '',
        user: '',
        rid: ''
      },
      review: {}
    }
  },
  computed: {
    ...mapGetters({
      headerAuth: 'getAuthHeader'
    }),
    keywords() {
      if (this.review.paper && this.review.paper.keywords) {
        const arr = this.review.paper.keywords.split(',')
        return arr
      } else {
        return []
      }
    }
  },
  async asyncData({ req, params, store, redirect, error }) {
    try {
      const token = store.state.user.token
      if (token) {
        const res = await axios.get('/reviews/' + params.id, store.getters.getAuthHeader)
        if (res.data) {
          const _form = {
            content: res.data.content,
            presentation: res.data.presentation,
            level: res.data.level,
            paper: res.data.paper.id,
            user: res.data.user.id,
            rid: res.data.id
          }
          return {
            review: res.data,
            form: _form
          }
        }
      } else {
        redirect('/login')
      }
    } catch (err) {
      console.log(err)
      error({ statusCode: err.statusCode, message: err.message })
    }
  },
  created() {
    this.$validator.localize('zh_CN', valiDict)
  },
  methods: {
    validateFields() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.handleSubmit()
        }
      })
    },
    async handleSubmit() {
      try {
        const res = await axios.put('/reviews/' + this.review.id, this.form, this.headerAuth)
        if (res.data) {
          this.$notification.open({
            message: '评阅成功',
            type: 'is-success',
            position: 'is-top'
          })
          this.$router.push('/review/me')
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
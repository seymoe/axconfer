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
              <b-field horizontal label="下载链接：">
                <p><a :href="fileUrl">{{ review.paper.title }}</a></p>
              </b-field>
              <b-field horizontal label="论文PID：">
                <p>{{ review.paper.pid }}</p>
              </b-field>
              <b-field horizontal label="论文状态：">
                <p>{{ review.paper.status }}</p>
              </b-field>
              <b-field horizontal label="作者：">
                <p>{{ review.paper.author }}</p>
              </b-field>
              <b-field horizontal label="单位：">
                <p>{{ review.paper.department }}</p>
              </b-field>
              <b-field horizontal label="关键词：">
                <p>{{ review.paper.keywords }}</p>
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
                  <option
                    v-for="(pre, index) in pres"
                    :key="index"
                    :value="pre"
                  >
                    {{ pre }}
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
                  <option
                    v-for="(level, index) in levels"
                    :key="index"
                    :value="level"
                  >
                    {{ level }}
                  </option>
                </b-select>
              </b-field>
              <b-field
                horizontal
                label="推荐期刊："
                :type="{'is-danger': errors.has('form.recommend')}"
                :message="errors.first('form.recommend')"
              >
                <b-select v-model="form.recommend" v-validate="'required'" name="form.recommend" placeholder="请选择">
                  <option
                    v-for="(reco, index) in recos"
                    :key="index"
                    :value="reco"
                  >
                    {{ reco }}
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
import { PRESENTATION_ENUM, LEVEL_ENUM, RECOMMEND_ENUM } from '~/config'

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
      pres: PRESENTATION_ENUM,
      levels: LEVEL_ENUM,
      recos: RECOMMEND_ENUM,
      form: {
        content: '',
        presentation: '',
        level: '',
        recommend: '',
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
    })
  },
  async asyncData({ req, params, store, redirect, error }) {
    try {
      const token = store.state.user.token
      if (token) {
        const { data: review } = await axios.get(`/reviews/${params.id}`, store.getters.getAuthHeader)
        const paperId = review.paperId
        const { data: paper } = await axios.get(`/papers/${paperId}`, store.getters.getAuthHeader)
        review.paper = paper
        if (review) {
          if (Number(review.userId) !== store.state.user.userInfo.id) {
            error({ statusCode: 403, message: '权限错误' })
          } else {
            const _form = {
              content: review.content,
              presentation: review.presentation,
              recommend: review.recommend,
              level: review.level,
              paperId: review.paperId,
              userId: review.userId
            }
            let fileUrl = '#'
            if (review.paper.file) {
              fileUrl = review.paper.file.url
            }
            return {
              review: review,
              form: _form,
              fileUrl: fileUrl
            }
          }
        } else {
          error({ statusCode: 404, message: '页面走丢了' })
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
        const res = await axios.put(`/reviews/${this.review.id}`, this.form, this.headerAuth)
        if (res.data) {
          this.$notification.open({
            message: '评阅成功',
            type: 'is-success',
            position: 'is-top-right'
          })
          if (this.review.paper.status === '初审评阅中') {
            await axios.put(`/papers/${this.review.paperId}`, { status: '初审评阅完成' }, this.headerAuth)
          } else if (this.review.paper.status === '终审评阅中') {
            await axios.put(`/papers/${this.review.paperId}`, { status: '终审评阅完成' }, this.headerAuth)
          } else {
            console.log(this.review.paper.status)
          }
          this.$router.push('/review/me')
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

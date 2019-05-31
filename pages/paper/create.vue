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
                创建论文
              </p>
            </header>
            <div class="card-content">
              <b-field label="标题">
                <b-input value="" />
              </b-field>
              <b-field label="作者">
                <b-taginput
                  v-model="paper.author"
                  icon="label"
                  placeholder="添加作者"
                />
              </b-field>
              <b-field label="单位">
                <b-taginput
                  v-model="paper.department"
                  icon="label"
                  placeholder="添加单位"
                />
              </b-field>
              <b-field label="关键词">
                <b-taginput
                  v-model="paper.keywords"
                  icon="label"
                  placeholder="添加关键词"
                />
              </b-field>
              <b-field label="主题">
                <b-select placeholder="请选择主题">
                  <option
                    v-for="topic in topics"
                    :key="topic.id"
                    :value="topic.label"
                  >
                    {{ topic.label }}
                  </option>
                </b-select>
              </b-field>
              <b-field label="邮箱Email">
                <b-input value="" />
              </b-field>
              <b-field label="邮编">
                <b-input value="" />
              </b-field>
              <b-field label="电话">
                <b-input value="" />
              </b-field>
              <b-field label="论文初稿">
                <b-upload v-model="file">
                  <a class="button is-light">
                    <b-icon icon="upload" />
                    <span>Click to upload</span>
                  </a>
                </b-upload>
                <span v-if="file" class="file-name">
                  {{ file.name }}
                </span>
              </b-field>
              <b-field>
                <b-button type="is-primary">
                  提交
                </b-button>
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
// import axios from '~/plugins/axios'
export default {
  components: {
    Sidebar
  },
  data() {
    return {
      topics: [
        {
          label: '基础热力学',
          id: '1'
        },
        {
          label: '热力系统循环',
          id: '2'
        },
        {
          label: '热泵、制冷空调',
          id: '2'
        },
        {
          label: '材料热物性',
          id: '3'
        },
        {
          label: '可再生能源、脱碳、储能等',
          id: '4'
        },
        {
          label: '热力系统动态特性、诊断与控制',
          id: '5'
        }
      ],
      paper: {
        title: '',
        author: '',
        department: '',
        keywords: ''
      },
      file: null
    }
  },
  computed: {

  },
  async asyncData(context) {

  }
}
</script>

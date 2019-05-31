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
                <b-input value=""></b-input>
              </b-field>
              <b-field label="作者">
                <b-taginput
                  v-model="paper.author"
                  icon="label"
                  placeholder="添加作者">
                </b-taginput>
              </b-field>
              <b-field label="单位">
                <b-taginput
                  v-model="paper.department"
                  icon="label"
                  placeholder="添加单位">
                </b-taginput>
              </b-field>
              <b-field label="关键词">
                <b-taginput
                  v-model="paper.keywords"
                  icon="label"
                  placeholder="添加关键词">
                </b-taginput>
              </b-field>
              <b-field label="主题">
                <b-select placeholder="请选择主题">
                  <option
                    v-for="topic in topics"
                    :value="topic"
                    :key="topic">
                    {{ topic }}
                  </option>
                </b-select>
              </b-field>
              <b-field label="邮箱Email">
                <b-input value=""></b-input>
              </b-field>
              <b-field label="邮编">
                <b-input value=""></b-input>
              </b-field>
              <b-field label="电话">
                <b-input value=""></b-input>
              </b-field>
              <b-field label="论文初稿">
                <b-upload v-model="file">
                  <a class="button is-primary">
                    <b-icon icon="upload"></b-icon>
                    <span>Click to upload</span>
                  </a>
                </b-upload>
                <span class="file-name" v-if="file">
                  {{ file.name }}
                </span>
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
      topics: ['基础热力学', '热力系统循环', '热泵、制冷空调', '材料热物性'],
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

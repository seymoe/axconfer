<template>
  <div>
    <section class="container">
      <div class="columns">
        <div class="column is-9">
          <b-field
            label="标题"
            :type="{'is-danger': errors.has('post.title')}"
            :message="errors.first('post.title')"
          >
            <b-input v-model="post.title" v-validate="'required'" name="post.title" />
          </b-field>
          <b-field
            label="通知分类"
            :type="{'is-danger': errors.has('post.category')}"
            :message="errors.first('post.category')"
          >
            <b-select v-model="post.category" v-validate="'required'" name="post.category" placeholder="请选择">
              <option
                v-for="(cate, index) in categories"
                :key="index"
                :value="cate"
              >
                {{ cate }}
              </option>
            </b-select>
          </b-field>
          <b-field label="正文">
            <div
              v-quill:myQuillEditor="editorOption"
              class="quill-editor"
              :content="post.content"
              @change="onEditorChange($event)"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @ready="onEditorReady($event)"
            />
          </b-field>
          <b-field>
            <b-button type="is-primary" @click="validateFields">
              提交
            </b-button>
          </b-field>
        </div>
      </div>
    </section>
    <form id="uploadFormMulti" action="" method="post" enctype="multipart/form-data">
      <input
        id="uniqueId"
        style="display: none"
        type="file"
        name="files"
        accept="image/jpg,image/jpeg,image/png,image/gif"
        @change="uploadImg('uploadFormMulti')"
      >
    </form>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import { mapGetters } from 'vuex'
import { POST_CATEGORY } from '~/config'
const valiDict = {
  custom: {
    'post.title': {
      required: '请输入文章标题'
    }
  }
}
export default {
  middleware: 'auth',
  layout: 'nohero',
  data() {
    return {
      post: {
        title: '',
        content: ''
      },
      categories: POST_CATEGORY,
      editorOption: {
        // some quill options
        modules: {
          toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'], // toggled buttons
            ['blockquote', 'code-block'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }], // superscript/subscript
            [{ 'indent': '-1' }, { 'indent': '+1' }], // outdent/indent
            [{ 'direction': 'rtl' }], // text direction
            [{ 'color': [] }, { 'background': [] }], // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }],
            ['link', 'image']
          ]
        }
      },
      addImgRange: '',
      imageLoading: false
    }
  },
  computed: {
    ...mapGetters({
      headerAuth: 'getAuthHeader'
    })
  },
  async asyncData({ req, params, store, redirect, error }) {
    try {
      const res = await axios.get(`/posts/${params.id}`)
      if (res.data) {
        const d = res.data
        return {
          post: d
        }
      }
    } catch (err) {
      console.log(err)
      error({ statusCode: err.statusCode, message: err.message })
    }
  },
  created() {
    this.$validator.localize('zh_CN', valiDict)
  },
  mounted() {
    const vm = this
    const imgHandler = function (image) {
      vm.addImgRange = vm.myQuillEditor.getSelection()
      if (image) {
        const fileInput = document.getElementById('uniqueId') // 隐藏的file文本ID
        fileInput.click() // 加一个触发事件
      }
    }
    vm.myQuillEditor.getModule('toolbar').addHandler('image', imgHandler)
  },
  methods: {
    onEditorBlur(editor) {
      // console.log('editor blur!', editor)
    },
    onEditorFocus(editor) {
      // console.log('editor focus!', editor)
    },
    onEditorReady(editor) {
      // console.log('editor ready!', editor)
    },
    onEditorChange({ editor, html, text }) {
      console.log('editor change!', editor, html, text)
      this.post.content = html
    },
    validateFields() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.handleSubmit()
        }
      })
    },
    async handleSubmit() {
      try {
        const data = Object.assign({}, this.post)
        const res = await axios.put(`/posts/${this.post.id}`, data, this.headerAuth)
        console.log(res)
        if (res.data && res.data.id) {
          this.$notification.open({
            message: '文章编辑成功',
            type: 'is-success',
            position: 'is-top-right'
          })
          setTimeout(() => {
            this.$router.replace('/admin/posts')
          }, 1000)
        }
      } catch (err) {
        console.log(err)
      }
    },
    async uploadImg(id) {
      const vm = this
      vm.imageLoading = true
      const formData = new FormData(document.querySelector('#' + id))
      console.log(document.querySelector('#' + id), formData)
      try {
        const url = await vm.uploadImgReq(formData)// 自定义的图片上传函数
        console.log(url)
        // if (url != null && url.length > 0) {
        //   let value = url
        //   vm.addImgRange = vm.myQuillEditor.getSelection()
        //   value = value.indexOf('http') !== -1 ? value : 'http:' + value
        //   vm.myQuillEditor.insertEmbed(vm.addImgRange !== null ? vm.addImgRange.index : 0, 'image', value)
        // } else {
        //   this.$notification.open({
        //     message: '图片上传失败',
        //     type: 'is-warning',
        //     position: 'is-top-right'
        //   })
        // }
        document.getElementById('uniqueId').value = ''
      } catch ({ message: msg }) {
        document.getElementById('uniqueId').value = ''
        this.$notification.open({
          message: '图片上传失败',
          type: 'is-warning',
          position: 'is-top-right'
        })
      }
      vm.imageLoading = false
    },
    async uploadImgReq(formData) {
      try {
        // formData.append('field', 'file')
        // formData.append('refId', this.post.id)
        // formData.append('ref', 'post')
        const res = await axios.post('/upload', formData, Object.assign(this.headerAuth, {
          'Content-Type': 'multipart/form-data'
        }))
        console.log(res)
        if (res.data) {
          this.$notification.open({
            message: '图片上传成功',
            type: 'is-success',
            position: 'is-top-right'
          })
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.columns{
  justify-content: center;
}
.quill-editor{
  height: 400px;
}
</style>

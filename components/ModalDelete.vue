<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">
        确认删除论文？
      </p>
    </header>
    <section class="modal-card-body">
      <b-field label="论文ID">
        <b-input :value="id" disabled />
      </b-field>
      <b-field label="论文PID">
        <b-input
          type="text"
          :value="pid"
          placeholder="请输入当前论文pid"
          required
        />
      </b-field>
    </section>
    <footer class="modal-card-foot">
      <button class="button is-primary" @click="handleDelete">
        确认删除
      </button>
      <button class="button" type="button" @click="$parent.close()">
        取消
      </button>
    </footer>
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  props: {
    id: {
      type: Number,
      default: 0
    },
    pid: {
      type: String,
      default: ''
    },
    deleteFunc: {
      type: Function,
      default: () => {}
    }
  },
  methods: {
    handleDelete() {
      this.deleteFunc && this.deleteFunc()
    }
  }
}
</script>

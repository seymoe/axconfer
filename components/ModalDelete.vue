<template>
  <form action="">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">确认删除论文？</p>
      </header>
      <section class="modal-card-body">
        <b-field label="论文ID">
          <b-input :value="id" disabled></b-input>
        </b-field>
        <b-field label="论文PID">
          <b-input
            type="text"
            :value="pid"
            placeholder="请输入当前论文pid"
            required>
          </b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-primary" @click="handleDelete">确认删除</button>
        <button class="button" type="button" @click="$parent.close()">取消</button>  
      </footer>
    </div>
  </form>
</template>

<script>
// import axios from 'axios'

export default {
  props: ['id', 'pid'],
  methods: {
    handleDelete() {
      const token = this.$store.state.user.token
      console.log(token)
    }
  }
}
</script>

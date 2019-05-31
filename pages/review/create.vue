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
              <b-field label="Name">
                <b-input value="Kevin Garvey"></b-input>
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
  computed: {

  },
  async asyncData(context) {

  }
}
</script>

<template>
  <div>
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          {{ sbMenu.title }}
        </p>
      </header>
      <div class="card-content" v-html="sbMenu.content" />
    </div>
    <br>
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          {{ sbHost.title }}
        </p>
      </header>
      <div class="card-content">
        <div class="content" v-html="htmlSbHost" />
      </div>
    </div>
    <br>
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          {{ sbPartner.title }}
        </p>
      </header>
      <div class="card-content">
        <div class="content" v-html="htmlSbPartner" />
      </div>
    </div>
  </div>
</template>

<script>
import { mdToHtml } from '~/plugins/utils'
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      sbMenu: 'getSideBarMenu',
      sbHost: 'getsideBarHost',
      sbPartner: 'getsideBarPartner'
    }),
    htmlSbHost() {
      return mdToHtml(this.sbHost.content)
    },
    htmlSbPartner() {
      return mdToHtml(this.sbPartner.content)
    }
  }
}
</script>

<style scoped>
.content {
  text-align: center;
}
</style>

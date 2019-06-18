<template>
  <div>
    <footer class="footer footer-top">
      <div class="container">
        <div class="columns">
          <div class="column">
            <h2 class="title is-5">
              {{ footInstitute.title }}
            </h2>
            <div class="content" v-html="htmlFootInstitute" />
          </div>
          <div class="column">
            <h2 class="title is-5">
              {{ footSitemap.title }}
            </h2>
            <div class="content" v-html="htmlFootSitemap" />
          </div>
          <div class="column">
            <h2 class="title is-5">
              {{ footPartner.title }}
            </h2>
            <div class="content" v-html="htmlFootPartner" />
          </div>
        </div>
      </div>
    </footer>
    <footer class="footer copyright">
      <div class="container">
        <p>
          Copyright © <a href="http://www.cset.org.cn">中国工程热物理学会</a> | 
          <a href="http://beian.miit.gov.cn">京ICP备15011708号-5</a> | 
          <a href="http://www.thermophysics.cn">工程热力学与能源利用分会</a> |
          Designed by <a href="http://www.starsoul.com.cn">StarSoul</a>
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
import { mdToHtml } from '~/plugins/utils'
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      footInstitute: 'getFootInstitute',
      footSitemap: 'getFootSitemap',
      footPartner: 'getFootPartner'
    }),
    htmlFootPartner() {
      return mdToHtml(this.footPartner.content)
    },
    htmlFootSitemap() {
      return mdToHtml(this.footSitemap.content)
    },
    htmlFootInstitute() {
      return mdToHtml(this.footInstitute.content)
    }
  }
}
</script>

<style scoped>
.footer-top{
  margin-top: 20px;
  padding: 2rem 1.5rem;
  background-color: #202020;
  color: rgb(149, 149, 149);;
}
.title.is-5{
  padding-bottom: 14px;
  border-bottom: 1px solid #fff;
  color: #bfbfbf;
}
.title.is-6{
  margin-bottom: 6px;
}
.navlist a i{
  margin: 0 2px;
  display: inline-block;
  vertical-align: baseline;
  height: 12px;
  width: 1px;
  background-color: #959595;
}

.copyright{
  padding: 2rem 1.5rem;
  background-color: #111;
  font-size: 13px;
  text-align: center;
  color: #555;
}
</style>

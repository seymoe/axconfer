<template>
  <div>
    <footer class="footer footer-top">
      <div class="container">
        <div class="columns">
          <div class="column">
            <h2 class="title is-5">
              研究所链接
            </h2>
            <h4 class="title is-6">
              <a href="#">中国科学院工程热物理研究所</a>
            </h4>
            <h5 calss="subtitle">
              Institute of Engineering Thermophysics
            </h5>
            <h4 class="title is-6">
              <a href="#">中国工程热物理学会</a>
            </h4>
            <h5 calss="subtitle">
              CSET
            </h5>
          </div>
          <div class="column">
            <h2 class="title is-5">
              站内导航
            </h2>
            <div class="navlist">
              <a v-for="nav in siteNav" :key="nav.label" :href="nav.link">
                {{ nav.label }} <i />
              </a>
            </div>
          </div>
          <div class="column">
            <h2 class="title is-5">
              合作伙伴
            </h2>
            <div class="navlist">
              <a v-for="nav in partner" :key="nav.label" :href="nav.link">
                {{ nav.label }} <i />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
    <footer class="footer copyright">
      <div class="container">
        <p>
          Copyright © <a href="#">工程热物理</a> | <a href="#">京ICP备15011708号-5</a> | 中国工程热物理学术年会
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      siteNav: [
        {
          label: '所有通知',
          link: '/notice'
        },
        {
          label: '组织结构',
          link: '/notice'
        },
        {
          label: '重要日期',
          link: '/notice'
        },
        {
          label: '参会注册',
          link: '/notice'
        },
        {
          label: '交通住宿',
          link: '/notice'
        },
        {
          label: '联系我们',
          link: '/notice'
        },
        {
          label: '所有通知',
          link: '/notice'
        }
      ],
      partner: [
        {
          label: '中科院广州能源所',
          link: '/notice'
        },
        {
          label: '清华大学',
          link: '/notice'
        },
        {
          label: '海军工程大学',
          link: '/notice'
        },
        {
          label: '大连理工大学',
          link: '/notice'
        },
        {
          label: '哈尔滨工程大学',
          link: '/notice'
        },
        {
          label: '广东工业大学',
          link: '/notice'
        },
        {
          label: '华北电力大学',
          link: '/notice'
        }
      ]
    }
  }
}
</script>

<style scoped>
.footer-top{
  padding: 2rem 1.5rem;
  background-color: #202020;
  color: rgb(149, 149, 149);;
}
.title.is-5{
  padding-bottom: 14px;
  border-bottom: 1px solid #fff;
}
.title.is-6{
  margin-bottom: 6px;
}
/* .title.is-6 a, div.navlist a{
  color: #f4645f;
} */
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

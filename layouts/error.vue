<template>
  <section class="container">
    <!-- <img src="../assets/img/logo.png" alt="Nuxt.js Logo" class="logo"> -->
    <h1>工程热物理</h1>
    <h1 class="title">
      {{ error.statusCode }}
    </h1>
    <h2 class="info">
      {{ error.message }}
    </h2>
    <nuxt-link v-if="error.statusCode === 404" class="button" to="/">
      返回首页
    </nuxt-link>
  </section>
</template>
<script>
export default {
  layout: 'nohero',
  props: {
    error: {
      type: Object,
      default: () => {
        return {
          statusCode: 404,
          message: ''
        }
      }
    }
  }
}
</script>

<style scoped>
.title
{
  margin-top: 15px;
  font-size: 5em;
}
.info
{
  font-weight: 300;
  color: #9aabb1;
  margin: 0;
}
.button
{
  margin-top: 50px;
}
</style>

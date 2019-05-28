<template>
  <div class="container has-text-centered">
    <div class="column is-4 is-offset-4">
      <h3 class="title has-text-grey">注 册</h3>
      <p class="subtitle has-text-grey">请根据提示进行注册</p>
      <div class="box">
        <form>
          <div class="field">
            <div class="control">
                <input class="input" type="email" placeholder="邮箱" autofocus="">
            </div>
          </div>
          <div class="field">
            <div class="control">
                <input class="input" type="username" placeholder="用户名" autofocus="">
            </div>
          </div>
          <div class="field">
            <div class="control">
                <input class="input" type="password" placeholder="密码">
            </div>
          </div>
          <button class="button is-block is-info is-fullwidth">注册</button>
        </form>
      </div>
      <p class="has-text-grey">
        <a href="/">登录</a> &nbsp;·&nbsp;
        <a href="/">忘记密码</a> &nbsp;·&nbsp;
        <a href="/">需要帮助？</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'inhero'
}
</script>

<template>
  <div class="container has-text-centered">
    <div class="column is-4 is-offset-4">
      <h3 class="title has-text-grey">登 录</h3>
      <p class="subtitle has-text-grey">请登录并继续</p>
      <div class="box">
        <figure class="avatar">
            <img src="https://placehold.it/128x128">
        </figure>
        <form>
          <div class="field">
            <div class="control">
                <input class="input" type="email" placeholder="Your Email" autofocus="">
            </div>
          </div>
          <div class="field">
            <div class="control">
                <input class="input" type="password" placeholder="Your Password">
            </div>
          </div>
          <button class="button is-block is-info is-fullwidth">登录</button>
        </form>
      </div>
      <p class="has-text-grey">
        <a href="/">注册</a> &nbsp;·&nbsp;
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

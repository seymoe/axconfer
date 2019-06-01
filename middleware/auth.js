export default function ({ app, store, redirect }) {
  if (!store.state.user.token || !store.state.user.userInfo.id) {
    if (app.$notification) {
      app.$notification.open({
        message: '请先登录',
        type: 'is-info',
        position: 'is-top'
      })
    }
    return redirect('/login')
  }
}

export default function ({ app, store, redirect, req, error, route }) {
  try {
    console.log(store.state.user.token, store.state.user.userInfo._id)
    if (!store.state.user.token || !store.state.user.userInfo._id) {
      if (app.$notification) {
        app.$notification.open({
          message: '请先登录',
          type: 'is-info',
          position: 'is-top'
        })
      }
      return redirect('/login')
    } else {
      const role = store.state.user.userInfo.role.name
      const _path = route.path
      switch (role) {
        case 'Administrator':
          if (_path.indexOf('/paper') > -1 || _path.indexOf('/review') > -1) {
            error({ statusCode: 404, message: '页面走丢了' })
          }
          break
        case 'Authenticated':
          if (_path.indexOf('/review') > -1 || _path.indexOf('/admin') > -1) {
            error({ statusCode: 404, message: '页面走丢了' })
          }
          break
        case 'Profesor':
          if (_path.indexOf('/paper') > -1 || _path.indexOf('/admin') > -1) {
            error({ statusCode: 404, message: '页面走丢了' })
          }
          break
        default:
          break
      }
    }
  } catch (err) {
    console.log(err)
    return redirect('/')
  }
}

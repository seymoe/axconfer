import axios from 'axios'
// const Cookie = process.client ? require('js-cookie') : undefined

const instance = axios.create({
  baseURL: process.env.baseUrl
})

// instance.interceptors.request.use((config) => {
//   let token = ''
//   if (process.client) {
//     token = Cookie.get('token')
//   }
//   token && (config.headers.Authorization = 'Bearer ' + token)
//   return config
// },
// (error) => {
//   return Promise.error(error)
// })

instance.interceptors.response.use((response) => {
  return response
}, (error) => {
  if (error.response.status) {
    switch (error.response.status) {
      case 401:
        console.log('401了')
        break
      default:
        break
    }
  }
  return Promise.reject(error.response.data)
})

export default instance

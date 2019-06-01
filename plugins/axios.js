import axios from 'axios'
const Cookie = process.client ? require('js-cookie') : undefined
let token = ''
if (process.client) {
  token = Cookie.get('token')
}

console.log(token)

const instance = axios.create({
  baseURL: process.env.baseUrl,
  headers: token ? {
    'Authorization': 'Bearer ' + token
  } : {}
})

instance.interceptors.request.use((config) => {
  token && (config.headers.Authorization = 'Bearer ' + token)
  return config
},
(error) => {
  return Promise.error(error)
})

instance.interceptors.response.use((response) => {
  return response
}, (error) => {
  if (error.response.status) {
    switch (error.response.status) {
      case 401:
        break
      default:
        break
    }
  }
  return Promise.reject(error.response.data)
})

export default instance

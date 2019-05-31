import axios from 'axios'
const Cookie = process.client ? require('js-cookie') : undefined
let token = ''
if (process.client) {
  token = Cookie.get('token')
}

console.log(token)

export default axios.create({
  baseURL: process.env.baseUrl,
  headers: token ? {
    'Authorization': 'Bearer ' + token
  } : {}
})

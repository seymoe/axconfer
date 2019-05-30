import axios from '~/plugins/axios'

const cookieparser = process.server ? require('cookieparser') : undefined

export const state = () => ({
  conference: [],
  sidebarHost: [],
  sidebarPartner: [],
  footerInstitute: [],
  footerSiteMap: [],
  footerPartner: []
})

export const mutations = {
  setConference(state, payload) {
    state.conference = payload
  }
}

export const actions = {
  async nuxtServerInit({ commit }, context) {
    let token = ''
    let userInfo = {}
    if (context.req.headers.cookie) {
      try {
        const parsed = cookieparser.parse(context.req.headers.cookie)
        token = parsed.token
        userInfo = JSON.parse(parsed.userInfo) || {}
      } catch (err) {
        // No valid cookie found
      }
    }
    console.log(userInfo)
    commit('user/setToken', token)
    commit('user/setUserInfo', userInfo)

    // 顶部会议数据
    const resConfer = await axios.get('/conferences?_limit=1')
    commit('setConference', resConfer.data)
    // 左侧边栏数据
    // const resSidebar = await context.$axios.get('/cards?_slug=sidebar-host')
    // console.log(resSidebar)
  }
}

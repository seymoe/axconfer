import axios from '~/plugins/axios'

const cookieparser = process.server ? require('cookieparser') : undefined

export const state = () => ({
  conference: [],
  cards: {},
  headerAuth: {}
})

export const mutations = {
  setConference(state, payload) {
    state.conference = payload
  },
  setCards(state, payload) {
    state.cards = payload
  }
}

export const getters = {
  getSideBarMenu(state) {
    return state.cards['sidebar-menu'] || {}
  },
  getsideBarHost(state) {
    return state.cards['sidebar-host'] || {}
  },
  getsideBarPartner(state) {
    return state.cards['sidebar-partner'] || {}
  },
  getFootInstitute(state) {
    return state.cards['footer-institute'] || {}
  },
  getFootSitemap(state) {
    return state.cards['footer-sitemap'] || {}
  },
  getFootPartner(state) {
    return state.cards['footer-partner'] || {}
  },

  // 获取token auth header
  getAuthHeader(state) {
    return state.user.token ? {
      headers: {
        Authorization: `Bearer ${state.user.token}`
      }
    } : {}
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
    commit('user/setToken', token)
    commit('user/setUserInfo', userInfo)

    // 顶部会议数据
    const resConfer = await axios.get('/conferences?_limit=1')
    commit('setConference', resConfer.data || [])
    // 左侧边栏数据
    const resCards = await axios.get('/cards')
    if (resCards.data.length) {
      const obj = {}
      resCards.data.forEach((item) => {
        obj[item.slug] = item
      })
      commit('setCards', obj)
    }
  }
}

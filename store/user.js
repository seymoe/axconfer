export const state = () => ({
  userInfo: {},
  token: ''
})

export const mutations = {
  setUserInfo(state, payload) {
    state.userInfo = payload
  },
  setToken(state, payload) {
    state.token = payload
  },
  logout(state) {
    state.token = ''
    state.userInfo = {}
  }
}

export const getters = {
  getToken(state) {
    return state.token
  },
  getUserInfo(state) {
    return state.userInfo
  }
}

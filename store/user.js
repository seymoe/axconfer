export const state = () => ({
  username: '',
  token: ''
})

export const mutations = {
  setUsername(state, username) {
    state.username = username
  }
}

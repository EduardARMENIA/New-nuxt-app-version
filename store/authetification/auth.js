export const state = () => ({
  token: null

})

export const mutations = {
  setToken (state, token) {
    state.token = token
  },
  clearToken (state) {
    state.token = null
  }
}

export const actions = {
  async login ({ commit }, data) {
    const post = await this.$axios.$post('/api/login', { email: data.email, password: data.password })
    const myPath = window.location.pathname
    if (post.message === 'success') {
      this.$cookiz.set('jwt', post.token,  {
  path: myPath,
   Domain: 'http://localhost:3000/',
  maxAge: 60 * 60 * 24 * 7
})
      commit('setToken', 'truetoken')
      this.$router.push('/home')
    }
  },
  async register ({}, data) {
    const post = await this.$axios.$post('/api/register', { name: data.name, email: data.email, password: data.password })
    if (post.message === 'success') {
      this.$router.push('/')
    }
  },
  logout ({ commit }) {
    commit('clearToken')
  }
}

export const getters = {
  hasToken: s => !!s.token
}

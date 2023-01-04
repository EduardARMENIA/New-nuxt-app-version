export const state = () => ({
  users: []
})

export const mutations = {
  setUsers (state, users) {
    state.users = users
  }
}

export const actions = {
  async Users ({ commit }) {
    try {
      const cookieValue = this.$cookiz.get('jwt')
      const response = await this.$axios.$get('/api/users', {
        headers: {
          Authorization: `${cookieValue}`
        }
      })
      const todos = await response

      for (let i = 0; i < todos.length; i++) {
        if (todos[i].img[0] === undefined) {
          todos[i].img = ('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png')
        } else {
          const response = await this.$axios.$get(`/api/${todos[i].img[0]}/profile_image`, { responseType: 'blob' })
          const imageObjectURL = URL.createObjectURL(response)
          todos[i].img = (imageObjectURL)
        }
      }
      commit('setUsers', todos)
    } catch (e) {
      return (e)
    }
  }
}

export const getters = {
  getUsers: (state) => {
    return state.users
  }
}

export const state = () => ({
  user: {},
  messages: [],
  users: []
})

export const mutations = {
  setUser(state, user) {
    state.user = user
  },

  removeUser(state, user) {
    const d =  [state.user]
    const newArr = d.filter(object => {
       return object.name !== user.name;
    });
  },

  clearUsers(state, user) {
      state.users = []
  },
  clearData(state) {
    state.messages = []
  },
  SOCKET_newMessage(state, message) { 
    console.log(message)
    state.messages.push(message)
  },
  SOCKET_updateUsers(state, users) {
    state.users = users
  }
}

export const actions = {
  async pushMessage ({ commit }, data) {
    const cookieValue = this.$cookiz.get('jwt')
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `${cookieValue}`
    }
    const messages = await this.$axios.$post('/api/messages', { id: data.id, name: data.name, text: data.text}, {
      headers
    })
  },
  async getMessage ({ commit }) {
      const cookieValue = this.$cookiz.get('jwt')
      const response = await this.$axios.$get('/api/messages', {
        headers: {
          Authorization: `${cookieValue}`
        }
      })
      const message = await response
      console.log('es getna')
      console.log(message)
      for (let i = 0; i < message.length; i++) {
              commit('SOCKET_newMessage', {name:message[i].name, text:message[i].text, id:message[i].id})
      }
  },

}


export const getters = {
  getByRoom: (state) => {
    console.log(111)
    return state
  }
}
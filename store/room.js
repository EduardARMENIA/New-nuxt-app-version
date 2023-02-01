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
  SOCKET__newMessage(state, message) { 
    console.log('ekav namak@ ed jan')
    state.messages.push(message)
  },
  SOCKET__updateUsers(state, users) {
    console.log('room exav edik jan')
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
    const messages = await this.$axios.$post('/api/messages-create', {room: data.room, id: data.id, name: data.name, text: data.text}, {
      headers
    })
  },
  async getMessage ({ commit }, data) {
      const cookieValue = this.$cookiz.get('jwt')
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `${cookieValue}`
      }
      const response = await this.$axios.$post('/api/messages-show', {room1: data.room1, room2: data.room2},{
        headers
      })
      const message = await response
      for (let i = 0; i < message.length; i++) {
              commit('SOCKET__newMessage', {name:message[i].name, text:message[i].text, id:message[i].id})
      }
  },

}


export const getters = {
  getByRoom: (state) => {
    console.log(111)
    return state
  }
}
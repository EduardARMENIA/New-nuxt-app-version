export const state = () => ({
  user: [],
  post: []
})

export const mutations = {
  setUsers (state, user) {
    console.log('done2')
    state.user = user
  },
  setPosts (state, post) {
    state.post = post
  },
   clearPost (state) {
    state.post = null
  },
   clearUser (state) {
    state.user = null
  }
}

export const actions = {
  async Profile ({ commit, dispatch }) {
    const cookieValue = this.$cookiz.get('jwt')
    const todos = await this.$axios.$get('/api/usersid', {
      headers: {
        Authorization: `${cookieValue}`
      }
    })

    const posts = await this.$axios.$get(`/api/${todos[0].name}/porfile_post`)
    console.log(typeof(posts[0]))
    if (typeof(posts[0]) === undefined){
        console.log('undefinedeeeeeeeeeeeeeeeeeeeee')
    }else{


       for (let i = 0; i < posts.length; i++) {
         const response = await this.$axios.$get(`/api/${posts[i].img[0]}/post_image`, { responseType: 'blob' })
         const imageObjectURL = URL.createObjectURL(response)

         posts[i].img = (imageObjectURL)
         const likesCount = this.$axios.$get(`/api/${posts[i]._id}/like`)
         posts[i].likes[0] = likesCount     
    
    }
    await commit('clearPost')
    await commit('setPosts', posts)
    } 
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].img[0] === undefined) {
        todos[i].img = ('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png')
      } else {
        const response = await this.$axios.$get(`/api/${todos[i].img[0]}/profile_image`, { responseType: 'blob' })
        const imageObjectURL = URL.createObjectURL(response)
        todos[i].img = (imageObjectURL)
      }
    }
    await commit('clearUser')
    await commit('setUsers', todos)
  },
  async ChangePassword ({ }, data) {
    const cookieValue = this.$cookiz.get('jwt')
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `${cookieValue}`
    }
    await this.$axios.$post('/api/change-password', { content: data.content }, {
      headers
    })
  },

   async delatePosts ({commit,dispatch}, data) {
    const cookieValue = this.$cookiz.get('jwt')
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `${cookieValue}`
    }
    this.$axios.$post(`/api/${data.id}/post_delate`, {}, {
      headers
    })
    await commit('clearPost')
    dispatch("Profile");
  },

   async changeDescription ({commit,dispatch}, data) {
    const cookieValue = this.$cookiz.get('jwt')
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `${cookieValue}`
    }
    this.$axios.$post(`/api/${data.id}/description_change`, { content: data.content }, {
      headers
    })
     commit('clearPost')
     dispatch("Profile");
  },

  async changeTitle ({commit,dispatch}, data) {
    const cookieValue = this.$cookiz.get('jwt')
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `${cookieValue}`
    }
    this.$axios.$post(`/api/${data.id}/title_change`, { title: data.content }, {
      headers
    })
     commit('clearPost')
     dispatch("Profile");
  },
}

export const getters = {
  getPosts: (state) => {
    return state.post
  },
  getUsers: (state) => {
    console.log(state.user)
    return state.user
  }
}

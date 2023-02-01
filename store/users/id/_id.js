export const state = () => ({
  user: [],
  post: []
})

export const mutations = {
  setUsers (state, user) {
    state.user = user
  },
  setPosts (state, post) {
    state.post = post
  },
   clearPost (state) {
    state.post = null
  },
  updateLikesCount (state, id, data) {
    const index = state.post.findIndex((el) => el._id === id)
    state.post[index] = {
       likes: [data],
    }
  },
  updateComments (state, id, data) {
    const index = state.post.findIndex((el) => el._id === id)
    state.post[index] = {
       comments: [data],
    }
  }
}

export const actions = {
  async ProfileById ({ commit }, data) {
    const id = data.id
    const todos = await this.$axios.$get(`/api/${id}/user`)
    const posts = await this.$axios.$get(`/api/${todos[0].name}/porfile_post`)

    for (let i = 0; i < posts.length; i++) {
      const response = await this.$axios.$get(`/api/${posts[i].img[0]}/post_image`, { responseType: 'blob' })
      const imageObjectURL = URL.createObjectURL(response)
     
      posts[i].img = (imageObjectURL)
      const likesCount = await this.$axios.$get(`/api/${posts[i]._id}/like`)
      posts[i].likes[0] = likesCount
    }
    await commit('setPosts', posts)
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].img[0] === undefined) {
        todos[i].img = ('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png')
      } else {
        const response = await this.$axios.$get(`/api/${todos[i].img[0]}/profile_image`, { responseType: 'blob' })
        const imageObjectURL = URL.createObjectURL(response)
        todos[i].img = (imageObjectURL)
      }
      await commit('setUsers', todos)
    }
  },

  async addComment ({dispatch, commit}, data) {
     console.log(data.post)
     console.log(data.post)
     console.log(data.post)
     console.log(data.post)
     console.log(data.post)
     const cookieValue = this.$cookiz.get('jwt')
     const headers = {
      'Content-Type': 'application/json',
      Authorization: `${cookieValue}`
    }
    let com = await this.$axios.$post(`/api/${data.post}/comment`, { content: data.content }, {
      headers
    })
    commit('updateComments', data.post, com)
    dispatch("ProfileById", data);

  },


   async addLike ({commit,dispatch}, data) {
    const cookieValue = this.$cookiz.get('jwt')
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `${cookieValue}`
    }
    let tiv2 = await this.$axios.$post(`/api/${data.post}/like`, {}, {
      headers
    })
    commit('updateLikesCount', data.post, tiv2)
    dispatch("ProfileById", data);
  }
}

export const getters = {
  getPosts: (state) => {
    return state.post
  },
  getUsers: (state) => {
    return state.user
  }
}

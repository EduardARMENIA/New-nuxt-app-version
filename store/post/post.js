export const state = () => ({
  Post: []

})

export const mutations = {
  setPost (state, Post) {
    state.Post = Post
  },
  clearPost (state) {
    state.Post = null
  }
}

export const actions = {
  async getPosts ({ commit }) {
    const Post = await this.$axios.$get('/api/post')
    for (let i = 0; i < Post.length; i++) {
      const response = await this.$axios.$get(`/api/${Post[i].img[0]}/post_image`, { responseType: 'blob' })
      const imageObjectURL = URL.createObjectURL(response)
      Post[i].img = (imageObjectURL)
      const likesCount = await this.$axios.$get(`/api/${Post[i]._id}/like`)
      Post[i].likes[0] = likesCount
    }
    commit('setPost', Post)
  },
  async addPosts ({}, data) {
    const cookieValue = this.$cookiz.get('jwt')
    const formData = new FormData()
    formData.append('image', data.file)
    formData.append('title', data.title)
    formData.append('content', data.content)
    await this.$axios.$post('/api/post_image',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `${cookieValue}`
        }
      })
     this.$router.push('/home') 
  },
  async addComment ({}, data) {
     const cookieValue = this.$cookiz.get('jwt')
     const headers = {
      'Content-Type': 'application/json',
      Authorization: `${cookieValue}`
    }
    await this.$axios.$post(`/api/${data.id}/comment`, { content: data.content }, {
      headers
    })
    window.location.reload()
  },


   async addLike ({commit,dispatch}, data) {
    const cookieValue = this.$cookiz.get('jwt')
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `${cookieValue}`
    }
    await this.$axios.$post(`/api/${data.id}/like`, {}, {
      headers
    })
      commit('clearPost')
      dispatch("getPosts");
  },
  

  async delatePosts ({}, data) {
    const cookieValue = this.$cookiz.get('jwt')
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `${cookieValue}`
    }
    await this.$axios.$post(`/api/${data.id}/post_delate`, {}, {
      headers
    })
  },
  async changeDescription ({}, data) {
    const cookieValue = this.$cookiz.get('jwt')
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `${cookieValue}`
    }
    await this.$axios.$post(`/api/${data.id}/description_change`, { content: data.content }, {
      headers
    })
  },

  async changeTitle ({}, data) {
    const cookieValue = this.$cookiz.get('jwt')
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `${cookieValue}`
    }
    await this.$axios.$post(`/api/${data.id}/title_change`, { title: data.content }, {
      headers
    })
  },


  async searchPosts ({commit, dispatch }, data) {
    if(data.search.length === 0){
      commit('clearPost')
      dispatch("getPosts");
    }
    else {
     const a = await this.$axios.$get(`/api/${data.search}/search`)
     for (let i = 0; i < a.length; i++) {
      const response = await this.$axios.$get(`/api/${a[i].img[0]}/post_image`, { responseType: 'blob' })
      const imageObjectURL = URL.createObjectURL(response)
      a[i].img = (imageObjectURL)
        const likesCount = await this.$axios.$get(`/api/${a[i]._id}/like`)
      a[i].likes[0] = likesCount
     }
     commit('clearPost')
     commit('setPost', a)
  }
  }

}

export const getters = {
  getUsersNames: (state) => {
    return state.Post
  }
}


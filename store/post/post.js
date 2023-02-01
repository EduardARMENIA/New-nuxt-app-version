export const state = () => ({
  Post: []

})

export const mutations = {
  setPost (state, Post) {
    state.Post = Post
  },
  clearPost (state) {
    state.Post = null
  },
  updateLikesCount (state, id, data) {
    const index = state.Post.findIndex((el) => el._id === id)
    state.Post[index] = {
       likes: [data],
    }
  },
  updateComments (state, id, data) {
    const index = state.Post.findIndex((el) => el._id === id)
    state.Post[index] = {
       comments: [data],
    }
  }
}

export const actions = {
  async getPosts ({ commit, dispatch }) {
    const Post = await this.$axios.$get('/api/post')
    for (let i = 0; i < Post.length; i++) {
      const response = await this.$axios.$get(`/api/${Post[i].img[0]}/post_image`, { responseType: 'blob' })
      const imageObjectURL = URL.createObjectURL(response)
      Post[i].img = (imageObjectURL)
       if (Post[i].profile_img[0] === undefined) {
        Post[i].profile_img = ('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png')
      }else{
          const response2 = await this.$axios.$get(`/api/${Post[i].profile_img[0]}/post_image`, { responseType: 'blob' })
          const imageObjectURL2 = URL.createObjectURL(response2)
          Post[i].profile_img = (imageObjectURL2)
      }
     
       
  
        for (let s = 0; s < Post[i].comments.length; s++) {
         if (Post[i].comments[s].author_img[0] === undefined) {
          Post[i].comments[s].author_img[0] = ('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png')
         }else{
          const response3 = await this.$axios.$get(`/api/${Post[i].comments[s].author_img[0]}/post_image`, { responseType: 'blob' })
          const imageObjectURL3 = URL.createObjectURL(response3)
          Post[i].comments[s].author_img[0] = (imageObjectURL3)
         }
        }
      
      const likesCount = await this.$axios.$get(`/api/${Post[i]._id}/like`)
      Post[i].likes[0] = likesCount
    }
    commit('clearPost')
    let post2 = []
    Post.slice().reverse()
    .forEach(function(item) {
            post2.push(item);
            console.log(item)
        });
     commit('setPost', post2)
    
  },
  async addPosts ({commit,dispatch}, data) {
    const cookieValue = this.$cookiz.get('jwt')
    const formData = new FormData()
    formData.append('image', data.file)
    formData.append('title', data.title)
    formData.append('content', data.content)
    let post =  await this.$axios.$post('/api/post_image',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `${cookieValue}`
        }
      })
     this.$router.push('/home') 
  },
  async addComment ({dispatch, commit}, data) {
     const cookieValue = this.$cookiz.get('jwt')
     const headers = {
      'Content-Type': 'application/json',
      Authorization: `${cookieValue}`
    }
    let com = await this.$axios.$post(`/api/${data.id}/comment`, { content: data.content }, {
      headers
    })
    commit('updateComments', data.id, com)
    dispatch("getPosts");

  },


   async addLike ({commit,dispatch}, data) {
    const cookieValue = this.$cookiz.get('jwt')
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `${cookieValue}`
    }
    let tiv2 = await this.$axios.$post(`/api/${data.id}/like`, {}, {
      headers
    })
    commit('updateLikesCount', data.id, tiv2)
    dispatch("getPosts");
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


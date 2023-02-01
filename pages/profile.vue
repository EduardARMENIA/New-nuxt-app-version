<template>
  <div>
    <div>
      <Profile
        v-for="todo in users()"
        :id="todo.id"
        :key="todo.id"
        :name="todo.name"
        :img="todo.img"
        :email="todo.email"
        @password="password"
      />
    </div>
    <div>
      <UserPost
        v-for="post in posts()"
        :id="post._id"
        :key="post.id"
        :author="post.author"
        :description="post.content"
        :title="post.title"
        :likes="post.likes"
        :profile_img="post.profile_img"
        :comments="post.comments"
        :img="post.img"
        @success="submitForm"
        @delate="delatePost"
        @changeDescription="changeDescription"
        @changeTitle="changeTitle"
      />
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Profile from '@/components/UserSettings/Profile'
import UserPost from '@/components/UserSettings/UserPost'
export default {
  components: { UserPost, Profile },
  middleware: ['auth'],
  data () {
    return {
      todos: [],
      item: {
        image: null,
        imageUrl: null
      },
      content: '',
      img: ''
    }
  },

  mounted () {
    this.created()
  },
  methods: {
    ...mapGetters({
      posts: 'profile/profile/getPosts',
      users: 'profile/profile/getUsers'
    }),
    created () {
      this.$store.dispatch('profile/profile/Profile')
    },

    submitForm (post, content) {
      this.$store.dispatch('profile/profile/addComment', { post, content})
    },

    password (content) {
      this.$store.dispatch('profile/profile/ChangePassword', { content })
    },
    delatePost (id) {
      this.$store.dispatch('profile/profile/delatePosts', { id })
   
    },

    changeDescription (id, content) {
      this.$store.dispatch('profile/profile/changeDescription', { id, content })
    },

    changeTitle (id, content) {
      this.$store.dispatch('profile/profile/changeTitle', { id, content })
    }

  }
}
</script>

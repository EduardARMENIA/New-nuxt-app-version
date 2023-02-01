
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
      />
    </div>
    <div>
      <UserPost
        v-for="post in posts()"
        :id="post._id"
        :key="post.id"
        :likes="post.likes"
        :author="post.author"
        :description="post.content"
        :title="post.title"
        :comments="post.comments"
        :img="post.img"
        @success="submitForm"
      />
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Profile from '@/components/ProfileById/Profile'
import UserPost from '@/components/ProfileById/UserPost'
export default {
  components: { UserPost, Profile },
  middleware: ['auth'],
  data () {
    return {
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
      posts: 'users/id/_id/getPosts',
      users: 'users/id/_id/getUsers'
    }),
    created () {
      const id = this.$route.params.id
      this.$store.dispatch('users/id/_id/ProfileById', { id })
    },
   submitForm (post, content) {
      const id = this.$route.params.id
      this.$store.dispatch('users/id/_id/addComment', { post, id, content })
    }
  }
}
</script>

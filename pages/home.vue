<template>
  <div>
    <div>
     <search/>
      <div>
        <post
          v-for="todo in companies()"
          :id="todo._id"
          :key="todo.id"
          :author="todo.author"
          :author_id="todo.author_id"
          :description="todo.content"
          :title="todo.title"
          :comments="todo.comments"
          :img="todo.img"
          :profile_img="todo.profile_img"
          :likes="todo.likes"
          @success="submitForm"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Post from '@/components/Post'
import search from '@/components/search/search'
export default {
  components: { Post, search },
  middleware: ['auth'],
  mounted () {
    this.created()
  },
  data() {
          return {
            inputs: '',
          };
  },
  methods: {
    ...mapGetters({
      companies: 'post/post/getUsersNames'
    }),
    created () {
      this.$store.dispatch('post/post/getPosts')
    },


    submitForm (id, content) {
      this.$store.dispatch('post/post/addComment', { id, content })
    }
  }
}
</script>

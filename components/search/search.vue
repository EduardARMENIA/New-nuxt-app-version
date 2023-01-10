<template>
  <div class="relative">
    <input
      v-model="searchInput"
      @input="onInputChange"
      @blur="onInputBlur"
      placeholder="Search..."
      class="w-full flex justify-center
      items-center bg-white text-gray-700 rounded border-2 border-transparent outline-none focus:border-purple-500 px-4 py-1"
      id="input"
    />
    <div class="relative">
      <div
        class="absolute z-30 bg-white top-0 inset-x-0 rounded shadow-lg mt-1"
      >
        
      </div>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'

export default {
  data: () => ({
    searchInput: '',
    suggestions: [],
  }),
  methods: {
    onInputChange: debounce(async function () {
      this.$store.dispatch('post/post/searchPosts', {search: this.searchInput})
    }, 300),
    onInputBlur() {
      setTimeout(() => (this.suggestions = []), 300)
    },
  },
}
</script>
<style>
.relative{
  width:100%;
  margin-top:40px;
}
#input{
  display:flex;
  justify-content:center;
  align-items:center;
  margin:0 auto;
}
@media (max-width:900px){
  .relative{
  width:100%;
  }
}
@media (min-width:1200px){
  .relative{
  width:80% !important;
  }
}
</style>
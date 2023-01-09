<template>
  <div>
    <Navbar />
    <main>
      <div class="container">
        <nuxt />
      </div>
    </main>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import Navbar from '@/components/Navbar'
export default {
  components: {
    Navbar
  },
}
</script>

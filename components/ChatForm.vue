<template>
  <div>
    <input  v-model="text" @keydown.enter="send"/>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data: () => ({
    text: ""
  }),
  computed: mapState('room',["user"]),
  methods: {

    
    send() {
      this.$socket.emit(
        "createMessage",
        {
          text: this.text,
          id: this.user.id
        },
        data => {
          if (typeof data === "string") {
            console.error(data);
          } else {
            this.text = "";
          }
        }
      );
    }
  }
};
</script>


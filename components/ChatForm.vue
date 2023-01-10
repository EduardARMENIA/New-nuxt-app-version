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
      const name = this.$store.getters['profile/profile/getUsers']
      let x = this.user.room[0, 1]
      this.$store.dispatch('room/pushMessage', { text: this.text,  name: name[0].name, id: this.user.id, room: x})
      this.$socket.emit(
        "createMessage",
        {
          text: this.text,
          id: this.user.id,
          room: x
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


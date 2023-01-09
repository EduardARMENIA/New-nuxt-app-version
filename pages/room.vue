<template>
  <v-layout column justify-center align-center>
    <div>


            <button :disabled="!valid" color="primary" @click="submit">Войти</button>
         
    </div>
  </v-layout>
</template>


<script>
import { mapMutations } from "vuex";
export default {
  layout: "empty",
  head: {
    title: "Добро пожаловать в Nuxt чат"
  },
  sockets: {
    connect: function() {
      console.log("socket connected");
    }
  },
  data: () => ({
    valid: true,
    snackbar: false,
    message: "",
    name: "",
    nameRules: [
      v => !!v || "Введите имя",
      v => (v && v.length <= 16) || "Имя не должно превышать 16 символов"
    ],
    room: "",
    roomRules: [v => !!v || "Введите комнату"]
  }),
  mounted() {
    const { message } = this.$route.query;
    if (message === "noUser") {
      this.message = "Введите данные";
    } else if (message === "leftChat") {
      this.message = "Вы вышли из чата";
    }

    this.snackbar = !!this.message;
  },
  methods: {
    ...mapMutations('room',["setUser"]),
    submit() {
        const user = {
          name: 1,
          room: 'room'
        };

        this.$socket.emit("userJoined", user, data => {
          if (typeof data === "string") {
            console.error(data);
          } else {
            user.id = data.userId;
            this.setUser(user);
            this.$router.push("/chat");
          }
        });
    }
  }
};
</script>


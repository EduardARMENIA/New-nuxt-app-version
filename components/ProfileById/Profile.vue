 <template>
    <div class="card">
    <h4>User Information</h4>
  <img  :src="`${img}`"style="width:100%">
  <div class="container">
    <h4><b>{{ name }}</b></h4>
    <p>{{ email }}</p>
      <button color="primary" @click="submit">Message</button>
  </div>
</div>
</template>        



<script>
import { mapMutations } from "vuex";
import { mapGetters } from 'vuex'
import { mapState } from "vuex";
export default {
  props: {
      img: { required: false },
      id: { required: true },
      name: { type: String, required: true },
      email: { type: String, required: true },
  },
   data() {
          return {
            name: this.name
          };
  },
  layout: "empty",
  head: {
    title: "Добро пожаловать в Nuxt чат"
  },
  sockets: {
    connect: function() {
      console.log("socket connected");
    }
  },
  
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
    ...mapMutations("room",["setUser", "removeUser"]),
     ...mapGetters({
      users: 'profile/profile/getUsers'
    }),

    async submit() {
        const names = this.name
        await this.$store.dispatch('profile/profile/Profile')
        const name = this.$store.getters['profile/profile/getUsers']
        const mixname = `${name[0].name} - ${names}`
        const mixname2 = `${names} - ${name[0].name}`

        const user = {
          name: name[0].name,
          room: [mixname, mixname2]
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
<style scoped>
.card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  border-radius: 5px; /* 5px rounded corners */
  width: 40%;
  margin-left:5%;
}

/* Add rounded corners to the top left and the top right corner of the image */
img {
  border-radius: 5px 5px 0 0;
}
@media (max-width:700px){
  .card{
  width:100%;
  margin-left:0%;
  }
}
</style>

<script>
import { mapMutations } from "vuex";
import { mapGetters } from 'vuex'
import { mapState } from "vuex";
export default {
   props: {
      img: { required: false },
      id: { required: true },
      name: { type: String, required: true },
      email: { type: String, required: true },
  },
   data() {
          return {
            name: this.name
          };
  },
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
    ...mapMutations("room",["setUser"]),
     ...mapGetters({
      users: 'profile/profile/getUsers'
    }),

    

 async submit() {
        const names = this.name
        await this.$store.dispatch('profile/profile/Profile')
        const name = this.$store.getters['profile/profile/getUsers']
        const mixname = `${name[0].name} - ${names}`
        const mixname2 = `${names} - ${name[0].name}`


        const user = {
          name: name[0].name,
          room: [mixname, mixname2]
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



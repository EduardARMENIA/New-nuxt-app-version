<template>
  <div class="c-wrap">
    <button @click="exit">
        <h6>exit room</h6>
      </button>
    <div class="c-chat" ref="block">
      <Message
        v-for="m in messages"
        :key="m.text"
        :name="m.name"
        :text="m.text"
        :owner="m.name === user.name"
        :room="m.room"
      />
    </div>
    <div class="c-form">
      <ChatForm/>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import Message from "@/components/Message";
import ChatForm from "@/components/ChatForm";
export default {
 middleware: ['chat'],
  head() {
    return {
      title: `Комната ${this.user.room}`
    };
  },

  components: { Message, ChatForm },
  computed: {
     myValue() { 
        let result = this.$store.state.room.messages 
        return result 

     }

  },
   computed: mapState('room',["user", "messages", "users"]),  
   watch: {
     ...mapMutations('room',["clearData"]),
    messages() {
      console.log(this.messages)
      console.log('edulik')
      alert(this.messages[0])
      console.log('end')
      setTimeout(() => {
        this.$refs.block.scrollTop = this.$refs.block.scrollHeight;
      });
    },
  }, 
  mounted () {
    this.$store.dispatch('room/getMessage',  {room1:this.user.room[0], room2:this.user.room[1]})
    this.clear()
  },


  methods: {
    ...mapMutations('room',["clearData", "removeUser"]),
    exit() {
      const user = this.user
      this.$socket.emit("userLeft", user, () => {
        this.$router.push("/?message=leftChat");
      });
      this.clearData();
      this.$socket.emit("disconnect")
      location.reload()

    },
    clear(){
        this.clearData();
    }
  }
};
</script>




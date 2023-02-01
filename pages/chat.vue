<template>
  <div class="c-wrap">
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
    <button class="btn" @click="exit">
        <h6>exit room</h6>
      </button>
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



<style scoped>
.btn{
  box-shadow:0px 0px 2px 2px grey;
  border:none !important;
  outline:none;
  border-radius:10px;
  background-color:#F6AF46;
  display:flex;
  justify-content:center;
  align-items:center;
  margin:auto;
  margin-top:10px;
}
</style>
<template>
  <div class="c-wrap">
    <div class="c-chat" ref="block">
      <Message
        v-for="m in messages"
        :key="m.text"
        :name="m.name"
        :text="m.text"
        :owner="m.id === user.id"
      />
    </div>
    <div class="c-form">
      <ChatForm/>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Message from "@/components/Message";
import ChatForm from "@/components/ChatForm";
export default {
  head() {
    return {
      title: `Комната ${this.user.room}`
    };
  },
  components: { Message, ChatForm },
  computed: mapState('room',["user", "messages"]),
  watch: {
    messages() {
      setTimeout(() => {
        this.$refs.block.scrollTop = this.$refs.block.scrollHeight;
      });
    }
  }
};
</script>



